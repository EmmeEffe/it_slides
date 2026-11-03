<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

// Esecuzione passo passo del main del rettangolo.
// versione "public": attributi public, cin scrive direttamente in r.base / r.altezza
// versione "setter": attributi private, i valori passano da setBase / setAltezza (default 1 se non validi)

const props = defineProps<{ versione: 'public' | 'setter' }>()

type Valore = number | null

interface Passo {
  id?: string
  riga: number // 1-based
  input?: string // nome della variabile letta da cin
  esegui?: () => string | void // restituisce l'id del passo da cui ripartire
  messaggio: () => string
}

interface Programma {
  codice: string[]
  voci: { nome: string, privato?: boolean }[]
  passi: Passo[]
  fine: () => string
  allarme: () => boolean
}

const mem = ref<Record<string, Valore>>({})
const console_ = ref<string[]>([])
const indice = ref(-1) // -1 = non ancora partito
const salto = ref<string | null>(null)
const inputFatto = ref(false)
const valoreInput = ref('')
const erroreInput = ref(false)
// il campo sta dentro un v-for: Vue mette i ref in un array
const campoInput = ref<HTMLInputElement[]>([])

function fmt(x: Valore | undefined) {
  if (x === null || x === undefined)
    return '?'
  return String(Number(x.toPrecision(6)))
}

function scrivi(testo: string, aCapo = false) {
  if (console_.value.length === 0)
    console_.value.push('')
  console_.value[console_.value.length - 1] += testo
  if (aCapo)
    console_.value.push('')
}

const v = (nome: string) => mem.value[nome] ?? null
const nonValido = (nome: string) => v(nome) !== null && v(nome)! <= 0

const calcoli: Passo[] = [
  {
    riga: 0,
    esegui: () => { mem.value.area = v('r.base')! * v('r.altezza')! },
    messaggio: () => `calcolaArea() calcola base * altezza = ${fmt(v('r.base'))} * ${fmt(v('r.altezza'))} = ${fmt(v('area'))}`,
  },
  {
    riga: 0,
    esegui: () => { mem.value.perimetro = 2 * (v('r.base')! + v('r.altezza')!) },
    messaggio: () => `calcolaPerimetro() calcola 2 * (base + altezza) = 2 * (${fmt(v('r.base'))} + ${fmt(v('r.altezza'))}) = ${fmt(v('perimetro'))}`,
  },
  { riga: 0, esegui: () => scrivi(`Area: ${fmt(v('area'))}`, true), messaggio: () => 'Stampa l\'area' },
  { riga: 0, esegui: () => scrivi(`Perimetro: ${fmt(v('perimetro'))}`, true), messaggio: () => 'Stampa il perimetro' },
]

// assegna i numeri di riga ai passi comuni (calcoli e stampe), che cambiano posizione tra le versioni
const conRighe = (righe: number[]) => calcoli.map((p, i) => ({ ...p, riga: righe[i] }))

const programmi: Record<'public' | 'setter', Programma> = {
  public: {
    codice: [
      'int main()',
      '{',
      '    Rettangolo r;',
      '    float area, perimetro;',
      '',
      '    cout << "Inserisci la base del rettangolo: ";',
      '    cin >> r.base;',
      '    cout << "Inserisci l\'altezza del rettangolo: ";',
      '    cin >> r.altezza;',
      '',
      '    area = r.calcolaArea();',
      '    perimetro = r.calcolaPerimetro();',
      '',
      '    cout << "Area: " << area << endl;',
      '    cout << "Perimetro: " << perimetro << endl;',
      '',
      '    return 0;',
      '}',
    ],
    voci: [{ nome: 'r.base' }, { nome: 'r.altezza' }, { nome: 'area' }, { nome: 'perimetro' }],
    passi: [
      { riga: 3, messaggio: () => 'Viene creato l\'oggetto r: base e altezza non hanno ancora un valore' },
      { riga: 4, messaggio: () => 'Dichiariamo le variabili area e perimetro' },
      { riga: 6, esegui: () => scrivi('Inserisci la base del rettangolo: '), messaggio: () => 'Il programma chiede la base' },
      { riga: 7, input: 'r.base', messaggio: () => `r.base ora vale ${fmt(v('r.base'))}` },
      { riga: 8, esegui: () => scrivi('Inserisci l\'altezza del rettangolo: '), messaggio: () => 'Il programma chiede l\'altezza' },
      { riga: 9, input: 'r.altezza', messaggio: () => `r.altezza ora vale ${fmt(v('r.altezza'))}` },
      ...conRighe([11, 12, 14, 15]),
    ],
    allarme: () => nonValido('r.base') || nonValido('r.altezza'),
    fine: () => programmi.public.allarme()
      ? '⚠️ Il programma ha accettato un valore non valido e ha calcolato un risultato senza senso: nessuno ha controllato i dati!'
      : 'Fine del programma',
  },
  setter: {
    codice: [
      'int main()',
      '{',
      '    Rettangolo r;',
      '    float b, h;',
      '    float area, perimetro;',
      '',
      '    cout << "Inserisci la base del rettangolo: ";',
      '    cin >> b;',
      '    r.setBase(b);',
      '    cout << "Inserisci l\'altezza del rettangolo: ";',
      '    cin >> h;',
      '    r.setAltezza(h);',
      '',
      '    area = r.calcolaArea();',
      '    perimetro = r.calcolaPerimetro();',
      '',
      '    cout << "Area: " << area << endl;',
      '    cout << "Perimetro: " << perimetro << endl;',
      '',
      '    return 0;',
      '}',
    ],
    voci: [
      { nome: 'b' },
      { nome: 'h' },
      { nome: 'r.base', privato: true },
      { nome: 'r.altezza', privato: true },
      { nome: 'area' },
      { nome: 'perimetro' },
    ],
    passi: [
      { riga: 3, messaggio: () => 'Viene creato l\'oggetto r: base e altezza sono private e non hanno ancora un valore' },
      { riga: 4, messaggio: () => 'Dichiariamo b e h: qui leggeremo i valori scritti dall\'utente' },
      { riga: 5, messaggio: () => 'Dichiariamo le variabili area e perimetro' },
      { riga: 7, esegui: () => scrivi('Inserisci la base del rettangolo: '), messaggio: () => 'Il programma chiede la base' },
      { riga: 8, input: 'b', messaggio: () => `b ora vale ${fmt(v('b'))}: r.base non è ancora cambiata` },
      {
        riga: 9,
        esegui: () => {
          if (nonValido('b')) {
            mem.value['r.base'] = 1
            scrivi('Hai inserito una base negativa', true)
          }
          else {
            mem.value['r.base'] = v('b')
          }
        },
        messaggio: () => nonValido('b')
          ? `❌ setBase(${fmt(v('b'))}): valore non valido, la classe avvisa e mette il valore di default r.base = 1`
          : `✅ setBase(${fmt(v('b'))}): valore valido, r.base = ${fmt(v('r.base'))}`,
      },
      { riga: 10, esegui: () => scrivi('Inserisci l\'altezza del rettangolo: '), messaggio: () => 'Il programma chiede l\'altezza' },
      { riga: 11, input: 'h', messaggio: () => `h ora vale ${fmt(v('h'))}: r.altezza non è ancora cambiata` },
      {
        riga: 12,
        esegui: () => {
          if (nonValido('h')) {
            mem.value['r.altezza'] = 1
            scrivi('Hai inserito un\'altezza negativa', true)
          }
          else {
            mem.value['r.altezza'] = v('h')
          }
        },
        messaggio: () => nonValido('h')
          ? `❌ setAltezza(${fmt(v('h'))}): valore non valido, la classe avvisa e mette il valore di default r.altezza = 1`
          : `✅ setAltezza(${fmt(v('h'))}): valore valido, r.altezza = ${fmt(v('r.altezza'))}`,
      },
      ...conRighe([14, 15, 17, 18]),
    ],
    allarme: () => false,
    fine: () => '✅ Fine del programma: i valori non validi sono stati sostituiti dalla classe, r.base e r.altezza sono sempre positivi',
  },
}

const prog = computed(() => {
  const p = programmi[props.versione]
  const ultimo: Passo = { riga: p.codice.length - 1, messaggio: p.fine }
  return { ...p, passi: [...p.passi, ultimo] }
})

const passo = computed(() => indice.value >= 0 ? prog.value.passi[indice.value] : undefined)
const rigaCorrente = computed(() => passo.value?.riga ?? 0)
const attendeInput = computed(() => !!passo.value?.input && !inputFatto.value)
const finito = computed(() => indice.value === prog.value.passi.length - 1)
const allarme = computed(() => finito.value && prog.value.allarme())
const messaggio = computed(() => {
  if (!passo.value)
    return 'Premi "Passo" per avviare il programma'
  if (attendeInput.value)
    return 'Scrivi il valore nella console e premi Invio'
  return passo.value.messaggio()
})

function avanti() {
  if (attendeInput.value || finito.value)
    return
  indice.value = salto.value
    ? prog.value.passi.findIndex(p => p.id === salto.value)
    : indice.value + 1
  salto.value = null
  inputFatto.value = false
  salto.value = passo.value!.esegui?.() ?? null
  if (attendeInput.value)
    nextTick(() => campoInput.value[0]?.focus())
}

function confermaInput() {
  const x = Number(valoreInput.value.replace(',', '.'))
  if (valoreInput.value.trim() === '' || Number.isNaN(x)) {
    erroreInput.value = true
    setTimeout(() => (erroreInput.value = false), 400)
    return
  }
  mem.value[passo.value!.input!] = x
  scrivi(valoreInput.value.trim(), true)
  valoreInput.value = ''
  inputFatto.value = true
  campoInput.value[0]?.blur()
}

function ricomincia() {
  mem.value = {}
  console_.value = []
  indice.value = -1
  salto.value = null
  inputFatto.value = false
  valoreInput.value = ''
}

// I bottoni con il focus bloccano le scorciatoie di Slidev: togliamo il focus dopo il click
function clic(e: MouseEvent, azione: () => void) {
  (e.currentTarget as HTMLElement).blur()
  azione()
}
</script>

<template>
  <div class="demo">
    <pre class="codice"><div
      v-for="(l, i) in prog.codice"
      :key="i"
      class="riga"
      :class="{ attiva: rigaCorrente === i + 1 }"
    ><span class="num">{{ i + 1 }}</span>{{ l || ' ' }}</div></pre>

    <div class="destra">
      <div class="pannello console">
        <div class="titolo">Console</div>
        <div v-for="(l, i) in console_" :key="i" class="console-riga">
          {{ l }}<input
            v-if="attendeInput && i === console_.length - 1"
            ref="campoInput"
            v-model="valoreInput"
            class="campo"
            :class="{ errore: erroreInput }"
            @keydown.enter.stop="confermaInput"
          >
        </div>
      </div>

      <div class="pannello">
        <div class="titolo">Memoria</div>
        <div class="memoria">
          <template v-for="voce in prog.voci" :key="voce.nome">
            <span class="nome">{{ voce.nome }}<span v-if="voce.privato" class="lucchetto" title="private">🔒</span></span>
            <span class="valore" :class="{ negativo: nonValido(voce.nome) }">{{ fmt(v(voce.nome)) }}</span>
          </template>
        </div>
      </div>

      <div class="messaggio" :class="{ allarme }">
        {{ messaggio }}
      </div>

      <div class="bottoni">
        <button :disabled="attendeInput || finito" @click="clic($event, avanti)">
          ▶ Passo
        </button>
        <button @click="clic($event, ricomincia)">
          ↺ Ricomincia
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1rem;
  font-size: 0.75rem;
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
.console {
  background: #111;
  color: #d4d4d4;
  font-family: var(--slidev-code-font-family, monospace);
  min-height: 6.5rem;
}
.console .titolo {
  color: #aaa;
}
.console-riga {
  white-space: pre-wrap;
  min-height: 1.2em;
}
.campo {
  width: 5rem;
  background: transparent;
  color: #4ade80;
  border: none;
  border-bottom: 1px solid #4ade80;
  outline: none;
  font: inherit;
}
.campo.errore {
  border-bottom-color: #f87171;
  animation: scuoti 0.3s;
}
@keyframes scuoti {
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
.memoria {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 1rem;
  font-family: var(--slidev-code-font-family, monospace);
}
.lucchetto {
  margin-left: 0.3rem;
  font-size: 0.7em;
}
.valore.negativo {
  color: #ef4444;
  font-weight: bold;
}
.messaggio {
  min-height: 3rem;
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  background: rgba(59, 130, 246, 0.12);
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
.bottoni button:hover:not(:disabled) {
  background: rgba(127, 127, 127, 0.2);
}
.bottoni button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
