<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

// Il main legge a_utente, b_utente, c_utente e li passa ai setter dell'oggetto p:
// si vede l'oggetto in memoria (attributi private), il calcolo di calcolaVertice
// e la parabola con il suo vertice. Con a_utente = 0 il do-while non chiama setA.

const MIN = -6
const MAX = 6
const U = 20 // pixel per unità
const MARGINE = 14
const lato = (MAX - MIN) * U + 2 * MARGINE
const sx = (x: number) => MARGINE + (x - MIN) * U
const sy = (y: number) => MARGINE + (MAX - y) * U
const righe = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i)

type Coeff = 'a' | 'b' | 'c'

// variabili del main
const utente = reactive({ a: 1, b: -4, c: 3 })
// attributi private dell'oggetto p
const p = reactive({ a: 1, b: -4, c: 3 })

const passo: Record<Coeff, number> = { a: 0.5, b: 1, c: 1 }
const limite: Record<Coeff, number> = { a: 3, b: 6, c: 6 }

const ultimaChiamata = ref<{ coeff: Coeff, valore: number } | null>(null)
const rifiutato = ref(false)
const lampeggio = ref(0) // cambia a ogni chiamata, per far ripartire l'animazione

const setter = { a: 'setA', b: 'setB', c: 'setC' }

function cambia(coeff: Coeff, verso: 1 | -1) {
  const nuovo = utente[coeff] + verso * passo[coeff]
  if (Math.abs(nuovo) > limite[coeff])
    return
  utente[coeff] = nuovo
  if (coeff === 'a' && nuovo === 0) {
    // il do-while chiede di nuovo il valore: setA non viene chiamato
    rifiutato.value = true
    ultimaChiamata.value = null
    return
  }
  if (coeff === 'a')
    rifiutato.value = false
  p[coeff] = nuovo
  ultimaChiamata.value = { coeff, valore: nuovo }
  lampeggio.value++
}

const delta = computed(() => p.b * p.b - 4 * p.a * p.c)
const vertice = computed(() => ({ x: -p.b / (2 * p.a), y: -delta.value / (4 * p.a) }))
const dentro = computed(() =>
  vertice.value.x >= MIN && vertice.value.x <= MAX && vertice.value.y >= MIN && vertice.value.y <= MAX)

const curva = computed(() => {
  const punti: string[] = []
  for (let i = 0; i <= 480; i++) {
    const x = MIN + (MAX - MIN) * i / 480
    const y = p.a * x * x + p.b * x + p.c
    // i punti molto fuori dal grafico vengono comunque tagliati dal clipPath
    punti.push(`${sx(x).toFixed(1)},${sy(Math.max(-100, Math.min(100, y))).toFixed(1)}`)
  }
  return punti.join(' ')
})

// numeri come li stamperebbe cout (al massimo 2 decimali)
const fmt = (x: number) => String(Number(x.toFixed(2)) || 0)
// i negativi tra parentesi quando compaiono in un'espressione
const par = (x: number) => x < 0 ? `(${fmt(x)})` : fmt(x)

// l'equazione come la scriveremmo a mano: y = x² − 4x + 3
const equazione = computed(() => {
  const termine = (k: number, lettera: string, primo: boolean) => {
    if (k === 0)
      return ''
    const segno = k < 0 ? (primo ? '−' : ' − ') : (primo ? '' : ' + ')
    const valore = Math.abs(k) === 1 && lettera ? '' : fmt(Math.abs(k))
    return segno + valore + lettera
  }
  return `y = ${termine(p.a, 'x²', true)}${termine(p.b, 'x', false)}${termine(p.c, '', false)}`
})
</script>

<template>
  <div class="demo">
    <div>
      <svg :viewBox="`0 0 ${lato} ${lato}`" class="piano">
        <defs>
          <clipPath id="ritaglio-parabola">
            <rect :x="sx(MIN)" :y="sy(MAX)" :width="(MAX - MIN) * U" :height="(MAX - MIN) * U" />
          </clipPath>
        </defs>
        <line v-for="x in righe" :key="`x${x}`" :x1="sx(x)" :x2="sx(x)" :y1="sy(MIN)" :y2="sy(MAX)" class="griglia" />
        <line v-for="y in righe" :key="`y${y}`" :x1="sx(MIN)" :x2="sx(MAX)" :y1="sy(y)" :y2="sy(y)" class="griglia" />
        <line :x1="sx(MIN)" :x2="sx(MAX)" :y1="sy(0)" :y2="sy(0)" class="asse" />
        <line :x1="sx(0)" :x2="sx(0)" :y1="sy(MIN)" :y2="sy(MAX)" class="asse" />
        <text :x="sx(MAX) - 4" :y="sy(0) - 5" text-anchor="end" class="etichetta-asse">x</text>
        <text :x="sx(0) + 6" :y="sy(MAX) + 12" class="etichetta-asse">y</text>

        <g clip-path="url(#ritaglio-parabola)">
          <polyline :points="curva" class="curva" />
          <template v-if="dentro">
            <line :x1="sx(vertice.x)" :y1="sy(vertice.y)" :x2="sx(vertice.x)" :y2="sy(0)" class="tratteggio" />
            <line :x1="sx(vertice.x)" :y1="sy(vertice.y)" :x2="sx(0)" :y2="sy(vertice.y)" class="tratteggio" />
            <circle :cx="sx(vertice.x)" :cy="sy(vertice.y)" r="6" class="vertice" />
            <text :x="sx(vertice.x) + 9" :y="sy(vertice.y) + (p.a > 0 ? 16 : -8)" class="etichetta-v">V</text>
          </template>
        </g>
      </svg>
      <div class="suggerimento">
        {{ equazione }}
        <template v-if="!dentro">
          · il vertice è <b>fuori</b> dal grafico
        </template>
      </div>
    </div>

    <div class="destra">
      <div class="pannello">
        <div class="titolo"><code>main</code> · usa i pulsanti per cambiare i valori</div>
        <div class="variabili">
          <template v-for="coeff in (['a', 'b', 'c'] as Coeff[])" :key="coeff">
            <span class="codice">{{ coeff }}_utente</span>
            <button :disabled="utente[coeff] - passo[coeff] < -limite[coeff]" @click="cambia(coeff, -1)">−</button>
            <span class="codice valore-utente" :class="{ zero: coeff === 'a' && rifiutato }">{{ fmt(utente[coeff]) }}</span>
            <button :disabled="utente[coeff] + passo[coeff] > limite[coeff]" @click="cambia(coeff, 1)">+</button>
          </template>
        </div>
        <div class="chiamata">
          <div v-if="rifiutato" class="rifiuto">
            <code>a_utente == 0</code>: il <code>do-while</code> chiede di nuovo il valore,
            <code>setA</code> <b>non</b> viene chiamato
          </div>
          <div v-else-if="ultimaChiamata" :key="lampeggio" class="codice lampeggia">
            p.{{ setter[ultimaChiamata.coeff] }}({{ fmt(ultimaChiamata.valore) }});
            <span class="commento">// {{ ultimaChiamata.coeff }} = val_{{ ultimaChiamata.coeff }};</span>
          </div>
          <div v-else class="commento">
            Ogni valore valido passa dal <b>setter</b>
          </div>
        </div>
      </div>

      <div class="pannello oggetto">
        <div class="titolo"><code>Parabola p</code> · 🔒 private</div>
        <div class="attributi codice">
          <div v-for="coeff in (['a', 'b', 'c'] as Coeff[])" :key="coeff" class="attributo">
            <span>{{ coeff }}</span>
            <b :key="ultimaChiamata?.coeff === coeff ? lampeggio : 0" :class="{ lampeggia: ultimaChiamata?.coeff === coeff }">{{ fmt(p[coeff]) }}</b>
          </div>
          <div class="attributo calcolato"><span>delta</span><b>{{ fmt(delta) }}</b></div>
          <div class="attributo calcolato vertice-box">
            <span>vertice</span><b>x {{ fmt(vertice.x) }} · y {{ fmt(vertice.y) }}</b>
          </div>
        </div>
      </div>

      <div class="pannello calcoli">
        <div class="titolo"><code>p.calcolaVertice()</code></div>
        <div>vertice.x = -b/(2*a) = -{{ par(p.b) }}/(2*{{ par(p.a) }}) = <b>{{ fmt(vertice.x) }}</b></div>
        <div>delta = b*b-4*a*c = {{ par(p.b) }}*{{ par(p.b) }}-4*{{ par(p.a) }}*{{ par(p.c) }} = <b>{{ fmt(delta) }}</b></div>
        <div>vertice.y = -delta/(4*a) = -{{ par(delta) }}/(4*{{ par(p.a) }}) = <b>{{ fmt(vertice.y) }}</b></div>
        <div class="stampa">Il vertice è al punto <b class="risultato">({{ fmt(vertice.x) }};{{ fmt(vertice.y) }})</b></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 1.2rem;
  font-size: 0.72rem;
  font-variant-ligatures: none;
}
.piano {
  width: 100%;
  user-select: none;
}
.griglia {
  stroke: currentColor;
  stroke-opacity: 0.12;
}
.asse {
  stroke: currentColor;
  stroke-opacity: 0.6;
  stroke-width: 1.5;
}
.etichetta-asse {
  fill: currentColor;
  opacity: 0.6;
  font-size: 11px;
  font-style: italic;
}
.curva {
  fill: none;
  stroke: rgb(59, 130, 246);
  stroke-width: 2.5;
}
.tratteggio {
  stroke: rgb(234, 179, 8);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
}
.vertice {
  fill: rgb(34, 197, 94);
  stroke: white;
  stroke-width: 2;
}
.etichetta-v {
  fill: rgb(22, 163, 74);
  font-weight: bold;
  font-size: 13px;
}
.suggerimento {
  text-align: center;
  opacity: 0.75;
  margin-top: 0.2rem;
  font-family: var(--slidev-code-font-family, monospace);
}
.destra {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.pannello {
  border: 1px solid rgba(127, 127, 127, 0.4);
  border-radius: 0.5rem;
  padding: 0.4rem 0.7rem;
}
.titolo code {
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.7rem;
  background: none;
  padding: 0;
}
.titolo {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
  margin-bottom: 0.3rem;
}
.codice,
.calcoli {
  font-family: var(--slidev-code-font-family, monospace);
}
.variabili {
  display: grid;
  grid-template-columns: auto auto 3.2rem auto;
  justify-content: start;
  align-items: center;
  gap: 0.25rem 0.5rem;
}
.variabili button {
  width: 1.6rem;
  height: 1.4rem;
  border-radius: 0.3rem;
  border: 1px solid rgba(127, 127, 127, 0.6);
  font-weight: bold;
  line-height: 1;
}
.variabili button:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.2);
}
.variabili button:disabled {
  opacity: 0.3;
}
.valore-utente {
  text-align: center;
  font-weight: bold;
}
.valore-utente.zero {
  color: rgb(239, 68, 68);
}
.chiamata {
  margin-top: 0.4rem;
  min-height: 2.2em;
}
.rifiuto {
  color: rgb(220, 38, 38);
}
.commento {
  opacity: 0.6;
}
.oggetto {
  border: 2px solid rgb(168, 85, 247);
}
.attributi {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.attributo {
  border: 1px solid rgba(127, 127, 127, 0.5);
  border-radius: 0.3rem;
  padding: 0.1rem 0.45rem;
  display: flex;
  gap: 0.45rem;
}
.attributo span {
  opacity: 0.7;
}
.attributo.calcolato {
  border-style: dashed;
}
.calcoli {
  line-height: 1.6;
}
.stampa {
  margin-top: 0.2rem;
  font-family: var(--slidev-font-family, sans-serif);
}
.risultato {
  color: rgb(22, 163, 74);
}
.lampeggia {
  animation: lampeggio 0.9s ease-out;
  border-radius: 0.2rem;
}
@keyframes lampeggio {
  from {
    background: rgba(234, 179, 8, 0.6);
  }
  to {
    background: transparent;
  }
}
</style>
