<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Esecuzione passo passo di prodotto(n, m) = m + prodotto(n - 1, m), con la pila delle chiamate.
// Tutti gli stati sono calcolati in anticipo: così "Indietro" è banale.
// Con n negativo il caso base non arriva mai: la pila cresce fino al crash (stack overflow).

const N_MIN = -2
const N_MAX = 5
const M_MIN = -9
const M_MAX = 9
// chiamate mostrate prima di dichiarare lo stack overflow
const LIMITE = 5

const n = ref(3)
const m = ref(4)

interface Frame {
  titolo: string
  corpo: string
  attesa?: boolean // aspetta il risultato di una chiamata più in alto
}

interface Stato {
  riga: number // riga del codice evidenziata (1-based, 0 = nessuna)
  pila: Frame[] // pila[0] = main, l'ultima è la chiamata in esecuzione
  messaggio: string
  output: string
  tipo?: 'ok' | 'allarme'
}

const codice = computed(() => [
  'int prodotto(int n, int m)',
  '{',
  '    if (n == 0)',
  '    {',
  '        return 0;',
  '    }',
  '    return m + prodotto(n - 1, m);',
  '}',
  '',
  'int main()',
  '{',
  `    cout << prodotto(${n.value}, ${m.value}) << endl;`,
  '    return 0;',
  '}',
])

const chiamata = (k: number) => `prodotto(${k}, ${m.value})`

const stati = computed<Stato[]>(() => {
  const N = n.value
  const M = m.value
  const lista: Stato[] = []
  const pila: Frame[] = []

  // fotografa la pila: tutte le chiamate tranne l'ultima sono in attesa
  const salva = (riga: number, messaggio: string, extra: Partial<Stato> = {}) => {
    lista.push({
      riga,
      pila: pila.map((f, i) => ({ ...f, attesa: i < pila.length - 1 })),
      messaggio,
      output: '',
      ...extra,
    })
  }

  pila.push({ titolo: 'main', corpo: `cout << ${chiamata(N)}` })
  salva(12, `Il main chiama ${chiamata(N)}: prima di stampare deve aspettare il risultato`)

  // andata
  let k = N
  while (true) {
    pila.push({ titolo: chiamata(k), corpo: `n = ${k}, m = ${M}` })
    salva(1, `Parte la chiamata ${chiamata(k)}: ha le sue variabili, n = ${k} e m = ${M}`)

    if (k === 0) {
      salva(3, 'n vale 0: siamo nel caso base!')
      pila[pila.length - 1].corpo = 'return 0'
      salva(5, `${chiamata(0)} restituisce 0 senza fare altre chiamate: la ricorsione si ferma qui e si torna indietro`)
      break
    }

    salva(3, `n vale ${k}, non è 0: non siamo nel caso base`)
    pila[pila.length - 1].corpo = `return ${M} + ${chiamata(k - 1)}`
    salva(7, `Per calcolare ${M} + ${chiamata(k - 1)} serve prima il risultato di ${chiamata(k - 1)}: questa chiamata resta in attesa e ne parte una nuova`)

    if (pila.length - 1 >= LIMITE && k < 0) {
      pila.push({ titolo: '⋮', corpo: `${chiamata(k - 1)}, ${chiamata(k - 2)}, …` })
      salva(7, `n continua a scendere (${k}, ${k - 1}, ${k - 2}, …) e non arriverà mai a 0: le chiamate non finiscono più. La pila si riempie e il programma va in crash (stack overflow)`, { tipo: 'allarme' })
      return lista
    }
    k--
  }

  // ritorno
  let risultato = 0
  for (k = 1; k <= N; k++) {
    pila.pop()
    const prima = risultato
    risultato = M + prima
    pila[pila.length - 1].corpo = `return ${M} + ${prima} = ${risultato}`
    salva(7, `${chiamata(k - 1)} ha restituito ${prima} ed è finita (tolta dalla pila). Ora ${chiamata(k)} può completare il calcolo: ${M} + ${prima} = ${risultato}`)
  }

  pila.pop()
  pila[0].corpo = `cout << ${risultato}`
  salva(12, `${chiamata(N)} restituisce ${risultato} al main, che lo stampa. ${N} × ${M} = ${risultato}, con ${N + 1} chiamate di prodotto`, { output: String(risultato), tipo: 'ok' })

  return lista
})

const indice = ref(-1) // -1 = non ancora partito
watch([n, m], () => (indice.value = -1))

const stato = computed<Stato>(() => indice.value >= 0
  ? stati.value[indice.value]
  : { riga: 0, pila: [], messaggio: 'Scegli n e m, poi premi "Passo" per avviare il programma', output: '' })
const finito = computed(() => indice.value === stati.value.length - 1)
// la pila si disegna con l'ultima chiamata in cima
const pilaDisegnata = computed(() => [...stato.value.pila].reverse())

const cambiaN = (delta: number) => (n.value = Math.min(N_MAX, Math.max(N_MIN, n.value + delta)))
const cambiaM = (delta: number) => (m.value = Math.min(M_MAX, Math.max(M_MIN, m.value + delta)))
const indietro = () => indice.value--
const avanti = () => indice.value++
const ricomincia = () => (indice.value = -1)

// I bottoni con il focus bloccano le scorciatoie di Slidev: togliamo il focus dopo il click
function clic(e: MouseEvent, azione: () => void) {
  (e.currentTarget as HTMLElement).blur()
  azione()
}
</script>

<template>
  <div class="demo">
    <div class="sinistra">
      <div class="scelte">
        <span class="scelta">
          <span class="nome">n =</span>
          <button :disabled="n <= N_MIN" @click="clic($event, () => cambiaN(-1))">−</button>
          <span class="numero" :class="{ negativo: n < 0 }">{{ n }}</span>
          <button :disabled="n >= N_MAX" @click="clic($event, () => cambiaN(1))">+</button>
        </span>
        <span class="scelta">
          <span class="nome">m =</span>
          <button :disabled="m <= M_MIN" @click="clic($event, () => cambiaM(-1))">−</button>
          <span class="numero">{{ m }}</span>
          <button :disabled="m >= M_MAX" @click="clic($event, () => cambiaM(1))">+</button>
        </span>
      </div>

      <pre class="codice"><div
        v-for="(l, i) in codice"
        :key="i"
        class="riga"
        :class="{ attiva: stato.riga === i + 1 }"
      ><span class="num">{{ i + 1 }}</span>{{ l || ' ' }}</div></pre>

      <div class="bottoni">
        <button :disabled="indice < 0" @click="clic($event, indietro)">
          ◀ Indietro
        </button>
        <button :disabled="finito" @click="clic($event, avanti)">
          Passo ▶
        </button>
        <button @click="clic($event, ricomincia)">
          ↺ Ricomincia
        </button>
      </div>
    </div>

    <div class="destra">
      <div class="pannello pila">
        <div class="titolo">Pila delle chiamate (l'ultima è in cima)</div>
        <TransitionGroup name="frame">
          <div
            v-for="(f, i) in pilaDisegnata"
            :key="stato.pila.length - i"
            class="frame"
            :class="{ attesa: f.attesa, main: f.titolo === 'main', overflow: f.titolo === '⋮' }"
          >
            <span class="frame-titolo">{{ f.titolo }}</span>
            <span class="frame-corpo">{{ f.corpo }}</span>
            <span v-if="f.attesa" class="frame-stato">⏳</span>
          </div>
        </TransitionGroup>
      </div>

      <div class="pannello console">
        <div class="titolo">Console</div>
        <div class="console-riga">{{ stato.output || ' ' }}</div>
      </div>

      <div class="messaggio" :class="stato.tipo">
        {{ stato.messaggio }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  font-variant-ligatures: none;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 1rem;
  font-size: 0.75rem;
}
.sinistra,
.destra {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.scelte {
  display: flex;
  gap: 1.5rem;
  font-family: var(--slidev-code-font-family, monospace);
}
.scelta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.scelta button {
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid rgba(127, 127, 127, 0.5);
  border-radius: 0.4rem;
}
.numero {
  min-width: 1.6rem;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}
.numero.negativo {
  color: #ef4444;
}
.codice {
  margin: 0;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  background: var(--slidev-code-background, rgba(127, 127, 127, 0.08));
  font-family: var(--slidev-code-font-family, monospace);
  line-height: 1.4;
}
.riga {
  padding: 0 0.8rem 0 0;
  border-left: 3px solid transparent;
  opacity: 0.55;
  transition: background 0.2s, opacity 0.2s;
}
.riga.attiva {
  opacity: 1;
  background: rgba(59, 130, 246, 0.2);
  border-left-color: rgb(59, 130, 246);
}
.num {
  display: inline-block;
  width: 2rem;
  text-align: right;
  margin-right: 0.8rem;
  opacity: 0.5;
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
.pila {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 15.5rem;
}
.frame {
  display: grid;
  grid-template-columns: 7.5rem 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.2rem 0.6rem;
  border: 2px solid rgb(59, 130, 246);
  border-radius: 0.4rem;
  background: rgba(59, 130, 246, 0.15);
  font-family: var(--slidev-code-font-family, monospace);
}
.frame.attesa {
  border-color: rgba(127, 127, 127, 0.5);
  background: transparent;
  opacity: 0.75;
}
.frame.overflow {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.18);
}
.frame.main {
  border-style: dashed;
}
.frame-titolo {
  font-weight: bold;
}
.frame-enter-active,
.frame-leave-active {
  transition: all 0.25s;
}
.frame-enter-from,
.frame-leave-to {
  opacity: 0;
  transform: translateY(-0.6rem);
}
.console {
  background: #111;
  color: #4ade80;
  font-family: var(--slidev-code-font-family, monospace);
}
.console .titolo {
  color: #aaa;
}
.console-riga {
  white-space: pre;
  min-height: 1.2em;
}
.messaggio {
  min-height: 3.6rem;
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  background: rgba(59, 130, 246, 0.12);
}
.messaggio.ok {
  background: rgba(34, 197, 94, 0.18);
  font-weight: bold;
}
.messaggio.allarme {
  background: rgba(239, 68, 68, 0.18);
  font-weight: bold;
}
.bottoni {
  display: flex;
  gap: 0.5rem;
}
.bottoni button {
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(127, 127, 127, 0.5);
  border-radius: 0.4rem;
}
.bottoni button:hover:not(:disabled),
.scelta button:hover:not(:disabled) {
  background: rgba(127, 127, 127, 0.2);
}
.bottoni button:disabled,
.scelta button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
