<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

// Piano cartesiano con due punti trascinabili (coordinate intere):
// mostra le struct a, b, m in memoria e i calcoli di distanza e puntoMedio.

const X_MIN = -2
const X_MAX = 8
const Y_MIN = -2
const Y_MAX = 6
const U = 30 // pixel per unità
const MARGINE = 14

const larghezza = (X_MAX - X_MIN) * U + 2 * MARGINE
const altezza = (Y_MAX - Y_MIN) * U + 2 * MARGINE
const sx = (x: number) => MARGINE + (x - X_MIN) * U
const sy = (y: number) => MARGINE + (Y_MAX - y) * U

const a = reactive({ x: 1, y: 1 })
const b = reactive({ x: 4, y: 5 })
const trascinato = ref<typeof a | null>(null)
const piano = ref<SVGSVGElement>()

const dx = computed(() => b.x - a.x)
const dy = computed(() => b.y - a.y)
const d = computed(() => Math.sqrt(dx.value ** 2 + dy.value ** 2))
const m = computed(() => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }))

const punti = [{ p: a, nome: 'A' }, { p: b, nome: 'B' }]
const memoria = computed(() => [{ nome: 'a', p: a }, { nome: 'b', p: b }, { nome: 'm', p: m.value }])

// numeri come li stamperebbe cout (al massimo 2 decimali); "≈" se arrotondati
const fmt = (x: number) => String(Number(x.toFixed(2)))
const circa = (x: number) => Number(x.toFixed(2)) === x ? '=' : '≈'
// i negativi tra parentesi quando compaiono in un'espressione
const par = (x: number) => x < 0 ? `(${fmt(x)})` : fmt(x)

const righeX = Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => X_MIN + i)
const righeY = Array.from({ length: Y_MAX - Y_MIN + 1 }, (_, i) => Y_MIN + i)

function inizia(p: typeof a, e: PointerEvent) {
  trascinato.value = p
  piano.value?.setPointerCapture(e.pointerId)
}

function muovi(e: PointerEvent) {
  const p = trascinato.value
  const svg = piano.value
  if (!p || !svg)
    return
  // da coordinate dello schermo a coordinate dell'SVG (la slide è scalata)
  const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM()!.inverse())
  const x = Math.round(X_MIN + (pt.x - MARGINE) / U)
  const y = Math.round(Y_MAX - (pt.y - MARGINE) / U)
  p.x = Math.min(X_MAX, Math.max(X_MIN, x))
  p.y = Math.min(Y_MAX, Math.max(Y_MIN, y))
}

function finisci() {
  trascinato.value = null
}
</script>

<template>
  <div class="demo">
    <div>
      <svg
        ref="piano"
        :viewBox="`0 0 ${larghezza} ${altezza}`"
        class="piano"
        @pointermove="muovi"
        @pointerup="finisci"
        @pointercancel="finisci"
      >
        <!-- griglia e assi -->
        <line v-for="x in righeX" :key="`x${x}`" :x1="sx(x)" :x2="sx(x)" :y1="sy(Y_MIN)" :y2="sy(Y_MAX)" class="griglia" />
        <line v-for="y in righeY" :key="`y${y}`" :x1="sx(X_MIN)" :x2="sx(X_MAX)" :y1="sy(y)" :y2="sy(y)" class="griglia" />
        <line :x1="sx(X_MIN)" :x2="sx(X_MAX)" :y1="sy(0)" :y2="sy(0)" class="asse" />
        <line :x1="sx(0)" :x2="sx(0)" :y1="sy(Y_MIN)" :y2="sy(Y_MAX)" class="asse" />
        <text :x="sx(X_MAX) - 4" :y="sy(0) - 5" text-anchor="end" class="etichetta-asse">x</text>
        <text :x="sx(0) + 6" :y="sy(Y_MAX) + 12" class="etichetta-asse">y</text>

        <!-- cateti dx e dy -->
        <line :x1="sx(a.x)" :y1="sy(a.y)" :x2="sx(b.x)" :y2="sy(a.y)" class="cateto" />
        <line :x1="sx(b.x)" :y1="sy(a.y)" :x2="sx(b.x)" :y2="sy(b.y)" class="cateto" />
        <text v-if="dx !== 0" :x="(sx(a.x) + sx(b.x)) / 2" :y="sy(a.y) + (dy >= 0 ? 15 : -7)" text-anchor="middle" class="etichetta-cateto">dx = {{ dx }}</text>
        <text v-if="dy !== 0" :x="sx(b.x) + (dx >= 0 ? 6 : -6)" :y="(sy(a.y) + sy(b.y)) / 2 + 4" :text-anchor="dx >= 0 ? 'start' : 'end'" class="etichetta-cateto">dy = {{ dy }}</text>

        <!-- segmento AB -->
        <line :x1="sx(a.x)" :y1="sy(a.y)" :x2="sx(b.x)" :y2="sy(b.y)" class="segmento" />

        <!-- punto medio -->
        <circle :cx="sx(m.x)" :cy="sy(m.y)" r="5" class="punto-m" />
        <text :x="sx(m.x) - 9" :y="sy(m.y) - 7" text-anchor="end" class="etichetta-m">M</text>

        <!-- punti trascinabili -->
        <g v-for="{ p, nome } in punti" :key="nome" class="trascinabile" @pointerdown.prevent="inizia(p, $event)">
          <circle :cx="sx(p.x)" :cy="sy(p.y)" r="14" class="alone" />
          <circle :cx="sx(p.x)" :cy="sy(p.y)" r="7" class="punto" :class="{ attivo: trascinato === p }" />
          <text :x="sx(p.x) + 9" :y="sy(p.y) - 8" class="etichetta">{{ nome }}</text>
        </g>
      </svg>
      <div class="suggerimento">
        Trascina i punti <b>A</b> e <b>B</b>
      </div>
    </div>

    <div class="destra">
      <div class="pannello">
        <div class="titolo">Memoria</div>
        <div class="memoria">
          <div v-for="{ nome, p } in memoria" :key="nome" class="struct" :class="{ medio: nome === 'm' }">
            <div class="struct-nome">Punto {{ nome }}</div>
            <div class="campi">
              <span>x</span><span class="valore">{{ fmt(p.x) }}</span>
              <span>y</span><span class="valore">{{ fmt(p.y) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pannello calcoli">
        <div class="titolo">distanza(a, b)</div>
        <div>dx = b.x - a.x = {{ fmt(b.x) }} - {{ par(a.x) }} = <b>{{ fmt(dx) }}</b></div>
        <div>dy = b.y - a.y = {{ fmt(b.y) }} - {{ par(a.y) }} = <b>{{ fmt(dy) }}</b></div>
        <div>sqrt(dx * dx + dy * dy) = sqrt({{ fmt(dx * dx) }} + {{ fmt(dy * dy) }}) {{ circa(d) }} <b class="risultato">{{ fmt(d) }}</b></div>
      </div>

      <div class="pannello calcoli">
        <div class="titolo">puntoMedio(a, b)</div>
        <div>m.x = (a.x + b.x) / 2 = ({{ fmt(a.x) }} + {{ par(b.x) }}) / 2 = <b>{{ fmt(m.x) }}</b></div>
        <div>m.y = (a.y + b.y) / 2 = ({{ fmt(a.y) }} + {{ par(b.y) }}) / 2 = <b>{{ fmt(m.y) }}</b></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 1.2rem;
  font-size: 0.75rem;
  font-variant-ligatures: none;
}
.piano {
  width: 100%;
  touch-action: none;
  user-select: none;
  overflow: visible;
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
.cateto {
  stroke: rgb(234, 179, 8);
  stroke-width: 2;
  stroke-dasharray: 5 4;
}
.etichetta-cateto {
  fill: rgb(202, 138, 4);
  font-size: 11px;
  font-family: var(--slidev-code-font-family, monospace);
}
.segmento {
  stroke: currentColor;
  stroke-width: 2.5;
}
.punto-m {
  fill: rgb(34, 197, 94);
}
.etichetta-m {
  fill: rgb(22, 163, 74);
  font-weight: bold;
  font-size: 13px;
}
.trascinabile {
  cursor: grab;
}
.alone {
  fill: rgb(59, 130, 246);
  fill-opacity: 0;
  transition: fill-opacity 0.15s;
}
.trascinabile:hover .alone {
  fill-opacity: 0.15;
}
.punto {
  fill: rgb(59, 130, 246);
  stroke: white;
  stroke-width: 2;
}
.punto.attivo {
  fill: rgb(37, 99, 235);
}
.etichetta {
  fill: rgb(59, 130, 246);
  font-weight: bold;
  font-size: 14px;
}
.suggerimento {
  text-align: center;
  opacity: 0.7;
  margin-top: 0.2rem;
}
.destra {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.pannello {
  border: 1px solid rgba(127, 127, 127, 0.4);
  border-radius: 0.5rem;
  padding: 0.5rem 0.7rem;
}
.titolo {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
  margin-bottom: 0.3rem;
}
.memoria {
  display: flex;
  gap: 0.6rem;
}
.struct {
  flex: 1;
  border: 2px solid rgb(59, 130, 246);
  border-radius: 0.4rem;
  padding: 0.3rem 0.5rem;
  font-family: var(--slidev-code-font-family, monospace);
}
.struct.medio {
  border-color: rgb(34, 197, 94);
}
.struct-nome {
  font-weight: bold;
  margin-bottom: 0.2rem;
}
.campi {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 0.6rem;
}
.campi .valore {
  text-align: right;
}
.calcoli {
  font-family: var(--slidev-code-font-family, monospace);
  line-height: 1.6;
}
.risultato {
  color: rgb(22, 163, 74);
}
</style>
