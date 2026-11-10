---
theme: default
routerMode: hash
title: Ripasso per il compito
transition: slide-left
mdc: true
---

# Ripasso per il compito

Esercizi svolti, un passo alla volta

---

# Come usare questa presentazione

<div class="grid grid-cols-3 gap-6 mt-10">

<div class="border-2 border-gray-400 rounded-lg p-4">
  <div class="text-3xl mb-2">📖</div>
  <div class="font-bold mb-1">1. Leggi l'esercizio</div>
  <div class="text-sm">Ogni esercizio comincia con il testo, come lo troveresti nel compito</div>
</div>

<div class="border-2 border-yellow-500 rounded-lg p-4">
  <div class="text-3xl mb-2">✍️</div>
  <div class="font-bold mb-1">2. Prova da solo</div>
  <div class="text-sm">Prima di andare avanti scrivi la tua soluzione, su carta o al computer. Anche se non è completa!</div>
</div>

<div class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-3xl mb-2">🔍</div>
  <div class="font-bold mb-1">3. Confronta</div>
  <div class="text-sm">Le slide successive costruiscono la soluzione passo passo e spiegano il perché di ogni scelta</div>
</div>

</div>

<div class="mt-10 text-center opacity-80">

Per andare avanti usa le frecce <kbd>→</kbd> o la barra spaziatrice · Nelle demo usa i pulsanti

</div>

---
layout: section
---

# Esercizio 1

La ricorsione: il prodotto come somme ripetute

---

# Esercizio 1

<div class="text-2xl leading-relaxed mt-10 border-l-4 border-blue-500 pl-6">

Considerando che il prodotto non è altro che l'iterazione di una serie di somme, scrivi una **funzione ricorsiva** che calcoli, tramite somme iterate, il prodotto $n \times m$.

</div>

<div class="mt-14 text-center text-xl border-2 border-yellow-500 rounded-lg p-4 bg-yellow-500/10">

✋ Fermati qui e prova a scriverla da solo prima di andare avanti

</div>

---

# L'idea: il prodotto come somme ripetute

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

Moltiplicare $n \times m$ vuol dire sommare $m$ per $n$ volte:

$$
3 \times 4 = \underbrace{4 + 4 + 4}_{3 \text{ volte}} = 12
$$

<div class="flex gap-3 justify-center mt-6">
  <div v-for="i in 3" :key="i" class="grid grid-cols-2 gap-1 border-2 border-blue-400 rounded p-1">
    <div v-for="j in 4" :key="j" class="w-5 h-5 rounded-full bg-blue-400"></div>
  </div>
</div>

<div v-click="1" class="mt-6">

Con un ciclo `for` sapremmo già farlo: è la versione **iterativa**.

</div>

</div>
<div v-click="1">

```cpp {all|3|4-7|8|all} {at:2}
int prodotto(int n, int m)
{
    int risultato = 0;
    for (int i = 0; i < n; i++)
    {
        risultato = risultato + m;
    }
    return risultato;
}
```

<v-clicks :at="2">

- Si parte da **0**
- Si aggiunge **m** per **n** volte
- Si restituisce il totale

</v-clicks>

<div v-click="5" class="mt-4 p-3 rounded-lg bg-yellow-500/15 border-2 border-yellow-500 text-sm">

L'esercizio però chiede una funzione **ricorsiva**: niente cicli, la funzione deve **chiamare sé stessa**

</div>

</div>
</div>

<!--
La versione iterativa serve come punto di partenza: gli studenti la sanno scrivere e mostra bene l'idea delle somme ripetute.
-->

---

# Pensare in modo ricorsivo

Proviamo a scrivere $3 \times 4$ usando un prodotto **più piccolo**:

<div class="grid grid-cols-[1fr_auto] gap-x-10 gap-y-3 mt-6 text-xl font-mono items-center">

<div v-click="1">3 × 4 = 4 + <span class="text-blue-500">2 × 4</span></div>
<div v-click="1" class="text-sm font-sans opacity-80">tolgo un 4: me ne restano 2</div>

<div v-click="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-500">2 × 4</span> = 4 + <span class="text-blue-500">1 × 4</span></div>
<div v-click="2" class="text-sm font-sans opacity-80">stesso ragionamento, numeri più piccoli</div>

<div v-click="3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-blue-500">1 × 4</span> = 4 + <span class="text-blue-500">0 × 4</span></div>
<div v-click="3" class="text-sm font-sans opacity-80">ancora una volta...</div>

<div v-click="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-green-500 font-bold">0 × 4 = 0</span></div>
<div v-click="4" class="text-sm font-sans opacity-80">questo lo sappiamo <b>senza calcoli</b>: ci fermiamo!</div>

</div>

<div v-click="5" class="mt-8 text-center text-2xl">

$$
n \times m = m + (n-1) \times m \qquad\qquad 0 \times m = 0
$$

</div>

<div v-click="5" class="text-center opacity-80">

Per calcolare il prodotto ci serve... **un prodotto più piccolo**. È questa l'idea della ricorsione.

</div>

---

# I due ingredienti della ricorsione

<div class="grid grid-cols-2 gap-8 mt-6">

<div v-click="1" class="border-2 border-green-500 rounded-lg p-5">
  <div class="text-xs uppercase opacity-60">Caso base</div>
  <div class="text-xl font-bold mb-3">Quando ci fermiamo</div>

$$
\text{se } n = 0 \quad\Rightarrow\quad n \times m = 0
$$

  <div class="text-sm mt-3">Il risultato si conosce <b>subito</b>, senza chiamare di nuovo la funzione. Senza caso base la funzione si chiamerebbe <b>all'infinito</b>.</div>
</div>

<div v-click="2" class="border-2 border-blue-500 rounded-lg p-5">
  <div class="text-xs uppercase opacity-60">Passo ricorsivo</div>
  <div class="text-xl font-bold mb-3">Come ci avviciniamo</div>

$$
\text{altrimenti} \quad n \times m = m + (n-1) \times m
$$

  <div class="text-sm mt-3">La funzione chiama <b>sé stessa</b> su un problema <b>più piccolo</b>: a ogni chiamata <i>n</i> scende di 1, quindi prima o poi arriva a 0.</div>
</div>

</div>

<div v-click="3" class="mt-8 text-center text-lg">

Ogni funzione ricorsiva ha bisogno di **entrambi**: un caso base, e un passo che **si avvicina** al caso base

**TIENILO BENE A MENTE** perchè questa è la struttura generale di ogni funzione ricorsiva

</div>

---

# Scriviamo la funzione

<div class="grid grid-cols-2 gap-8">
<div>

````md magic-move
```cpp
int prodotto(int n, int m)
{

}
```

```cpp
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
}
```

```cpp
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-4">

<div class="border-l-4 border-gray-400 pl-4">

**L'intestazione**: riceve i due numeri `n` e `m` e restituisce un `int`, il prodotto

</div>

<div v-click="1" class="border-l-4 border-green-500 pl-4">

**Il caso base**: se `n` vale 0, il prodotto è 0. Lo restituiamo subito e la funzione **non** chiama sé stessa

</div>

<div v-click="2" class="border-l-4 border-blue-500 pl-4">

**Il passo ricorsivo**: altrimenti restituiamo `m` più il prodotto **con un `n` più piccolo di 1**, calcolato dalla funzione stessa

</div>

<div v-click="3" class="border-l-4 border-yellow-500 pl-4 text-sm">

Non serve l'`else`: se `n == 0` la funzione è già uscita con il primo `return`, quindi l'ultima riga si esegue solo quando `n` non è 0

</div>

</div>
</div>

---

# Il programma completo

<div class="grid grid-cols-2 gap-6">
<div>

```cpp {all|4-11|all|all|10} {at:1}
#include <iostream>
using namespace std;

int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```

</div>
<div>

```cpp {all|all|3-8|10-11|all} {at:1}
int main()
{
    int n, m;

    cout << "Inserisci n: ";
    cin >> n;
    cout << "Inserisci m: ";
    cin >> m;

    cout << n << " x " << m << " = "
         << prodotto(n, m) << endl;

    return 0;
}
```

</div>
</div>

<div class="mt-2">
<div v-if="$clicks === 1">La funzione ricorsiva va scritta <b>prima</b> del <code>main</code>, che la usa</div>
<div v-if="$clicks === 2">Il <code>main</code> legge i due numeri da tastiera...</div>
<div v-if="$clicks === 3">...e chiama la funzione <b>una sola volta</b>, come una funzione qualsiasi: tutte le altre chiamate le fa <code>prodotto</code> da sola</div>
<div v-if="$clicks === 4">Ogni chiamata usa un <code>n</code> più piccolo di 1, finché non si arriva al caso base</div>
</div>

---

# Guarda la ricorsione al lavoro

<DemoRicorsione />

<!--
Provare prima con n = 3, m = 4, poi con n = 0 (solo il caso base) e con n negativo (stack overflow).
-->

---

# Andata e ritorno

Cosa succede quando il `main` chiama `prodotto(3, 4)`:

<div class="grid grid-cols-[auto_1fr_auto_1fr] gap-x-4 gap-y-2 mt-6 font-mono items-center">

<div class="text-xs uppercase opacity-60 font-sans">Andata ↓</div>
<div class="text-xs uppercase opacity-60 font-sans">la chiamata deve calcolare...</div>
<div></div>
<div class="text-xs uppercase opacity-60 font-sans">Ritorno ↑ restituisce</div>

<div v-click="1" class="border-2 border-blue-500 rounded px-3 py-1">prodotto(3, 4)</div>
<div v-click="1">4 + prodotto(2, 4)</div>
<div v-click="8">→</div>
<div v-click="8" class="text-green-500 font-bold">4 + 8 = 12</div>

<div v-click="2" class="border-2 border-blue-500 rounded px-3 py-1 ml-6">prodotto(2, 4)</div>
<div v-click="2">4 + prodotto(1, 4)</div>
<div v-click="7">→</div>
<div v-click="7" class="text-green-500 font-bold">4 + 4 = 8</div>

<div v-click="3" class="border-2 border-blue-500 rounded px-3 py-1 ml-12">prodotto(1, 4)</div>
<div v-click="3">4 + prodotto(0, 4)</div>
<div v-click="6">→</div>
<div v-click="6" class="text-green-500 font-bold">4 + 0 = 4</div>

<div v-click="4" class="border-2 border-green-500 rounded px-3 py-1 ml-18">prodotto(0, 4)</div>
<div v-click="4" class="font-sans">caso base, nessuna nuova chiamata</div>
<div v-click="5">→</div>
<div v-click="5" class="text-green-500 font-bold">0</div>

</div>

<v-clicks :at="9">

- **Andata**: ogni chiamata si ferma ad aspettare il risultato della successiva
- **Ritorno**: dal caso base i risultati risalgono, e ogni chiamata aggiunge il suo `4`
- In tutto **4 chiamate** per $3 \times 4$: in generale $n + 1$

</v-clicks>

---

# 🔍 Trova l'errore

<div class="text-lg mt-6">

Nelle prossime slide ci sono **6 versioni** della funzione `prodotto`. Dovrebbero tutte calcolare $n \times m$, ma ognuna contiene **un errore**.

</div>

<div class="grid grid-cols-3 gap-6 mt-10">

<div class="border-2 border-gray-400 rounded-lg p-4">
  <div class="text-3xl mb-2">🕵️</div>
  <div class="font-bold mb-1">1. Leggi l'indizio</div>
  <div class="text-sm">Ti dice cosa succede quando si esegue il programma</div>
</div>

<div class="border-2 border-yellow-500 rounded-lg p-4">
  <div class="text-3xl mb-2">👉</div>
  <div class="font-bold mb-1">2. Trova la riga</div>
  <div class="text-sm">Cerca la riga sbagliata e prova a spiegare <b>perché</b> causa quel problema</div>
</div>

<div class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-3xl mb-2">✅</div>
  <div class="font-bold mb-1">3. Vai avanti</div>
  <div class="text-sm">Al primo passo si evidenzia l'errore, al secondo compare la correzione</div>
</div>

</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">1 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|5}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 1;
    }
    return m + prodotto(n - 1, m);
}
```

```cpp {5}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

`prodotto(3, 4)` restituisce **13** invece di 12

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Il caso base restituisce **1**, ma $0 \times m = 0$. Quell'1 viene sommato a tutti i 4: $4 + 4 + 4 + 1 = 13$

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Il caso base deve restituire il risultato **giusto** per quel caso: `return 0;`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">2 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|3}
int prodotto(int n, int m)
{
    if (n = 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```

```cpp {3}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il compilatore dà solo un **avviso** (warning), ma il programma va in **crash**

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`n = 0` non confronta: **assegna** 0 a `n`. La condizione vale 0, cioè falso, quindi il caso base non scatta mai e si chiama `prodotto(-1, m)`, poi di nuovo... all'infinito

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Per confrontare servono **due** uguali: `if (n == 0)`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">3 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return prodotto(n - 1, m);
}
```

```cpp {7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma non va in crash, ma restituisce **sempre 0**, con qualsiasi `n` e `m`

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Ogni chiamata restituisce **esattamente** quello che riceve dalla successiva, senza aggiungere niente. Così lo 0 del caso base risale fino al `main` così com'è

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Ogni chiamata deve fare la **sua parte**, cioè sommare un `m`: `return m + prodotto(n - 1, m);`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">4 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n--, m);
}
```

```cpp {7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

C'è il caso base, `n` sembra scendere... eppure il programma va in **crash**

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`n--` passa alla chiamata il valore **attuale** di `n` e lo diminuisce solo **dopo**. `prodotto(3, 4)` chiama di nuovo `prodotto(3, 4)`, all'infinito

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Alla chiamata serve solo il valore più piccolo, non serve modificare `n`: `prodotto(n - 1, m)`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">5 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|1}
void prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```

```cpp {1}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: return-statement with a value, in function returning 'void'</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Una funzione `void` **non restituisce niente**, ma questa deve restituire il prodotto, e la chiamata ricorsiva ha bisogno di quel valore per fare `m + ...`

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Il tipo restituito è quello del risultato, un intero: `int prodotto(int n, int m)`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">6 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|3,7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n, m - 1);
}
```

```cpp {7}
int prodotto(int n, int m)
{
    if (n == 0)
    {
        return 0;
    }
    return m + prodotto(n - 1, m);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

`prodotto(0, 4)` funziona, ma `prodotto(3, 4)` va in **crash**

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Il caso base controlla `n`, ma la chiamata fa scendere `m`: `n` resta 3 per sempre e il caso base non arriva mai

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Deve scendere la **stessa** variabile che controlla il caso base: `prodotto(n - 1, m)`

</div>

</div>
</div>

---

# Prima di consegnare: la checklist

<div class="text-lg mt-2 opacity-80">Quando scrivi una funzione ricorsiva nel compito, controlla:</div>

<v-clicks>

- ✅ C'è il **caso base**, e restituisce il valore **giusto** ($0 \times m = 0$)
- ✅ Nel confronto ci sono **due** uguali: `if (n == 0)`
- ✅ Scende la **stessa** variabile controllata dal caso base
- ✅ La chiamata ricorsiva usa `n - 1`, **non** `n--`
- ✅ Ogni chiamata **fa la sua parte** e restituisce il risultato: `return m + prodotto(n - 1, m);`
- ✅ Il tipo restituito è `int`, non `void`
- ✅ Il `main` non passa un `n` **negativo**, altrimenti il caso base non arriva mai

</v-clicks>

---

# Riepilogo: come si scrive una funzione ricorsiva

<div class="grid grid-cols-3 gap-4 mt-6">

<div v-click class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passo 1</div>
  <div class="font-bold text-lg mb-2">Trova il caso base</div>
  <div class="text-sm">Il caso più semplice, dove il risultato si sa subito</div>
  <div class="font-mono text-sm mt-3">0 × m = 0</div>
</div>

<div v-click class="border-2 border-blue-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passo 2</div>
  <div class="font-bold text-lg mb-2">Riduci il problema</div>
  <div class="text-sm">Esprimi il problema usando lo <b>stesso</b> problema, ma più piccolo</div>
  <div class="font-mono text-sm mt-3">n × m = m + (n−1) × m</div>
</div>

<div v-click class="border-2 border-purple-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passo 3</div>
  <div class="font-bold text-lg mb-2">Traduci in C++</div>
  <div class="text-sm">Un <code>if</code> per il caso base, un <code>return</code> che chiama la funzione stessa</div>
  <div class="font-mono text-sm mt-3">return m + prodotto(n - 1, m);</div>
</div>

</div>

<div v-click class="mt-8 p-4 rounded-lg border-2 border-gray-400 text-sm">

💡 **Va bene anche al contrario**: si può far scendere `m` invece di `n`, scrivendo `if (m == 0) return 0;` e `return n + prodotto(n, m - 1);`. L'importante è che a ogni chiamata il problema si **avvicini** al caso base.

</div>

---
layout: section
---

# Esercizio 2

Le struct: punti nel piano cartesiano

---

# Esercizio 2

<div class="text-xl leading-relaxed mt-6 border-l-4 border-blue-500 pl-6">

Definisci una `struct` **Punto** che rappresenti un punto del piano cartesiano. Scrivi poi due funzioni:

- `distanza`, che riceve due punti e restituisce la loro **distanza**
- `puntoMedio`, che riceve due punti e restituisce il loro **punto medio**

Nel `main` leggi da tastiera le coordinate di due punti e stampa la distanza e il punto medio.

</div>

<div class="mt-8 text-center text-xl border-2 border-yellow-500 rounded-lg p-4 bg-yellow-500/10">

✋ Fermati qui e prova a scriverlo da solo prima di andare avanti

</div>

---

# L'idea: un punto sono due numeri che stanno insieme

<div class="grid grid-cols-[2fr_3fr] gap-8 mt-2">
<div>

<svg viewBox="0 0 220 190" class="w-full">
  <line x1="10" y1="170" x2="210" y2="170" stroke="currentColor" stroke-opacity="0.6" />
  <line x1="30" y1="185" x2="30" y2="5" stroke="currentColor" stroke-opacity="0.6" />
  <line x1="60" y1="140" x2="150" y2="140" stroke="#eab308" stroke-width="2" stroke-dasharray="5 4" />
  <line x1="150" y1="140" x2="150" y2="20" stroke="#eab308" stroke-width="2" stroke-dasharray="5 4" />
  <text x="118" y="133" text-anchor="middle" fill="#ca8a04" style="font-size: 11px">dx = 3</text>
  <text x="156" y="84" fill="#ca8a04" style="font-size: 11px">dy = 4</text>
  <line x1="60" y1="140" x2="150" y2="20" stroke="currentColor" stroke-width="2.5" />
  <text x="88" y="70" fill="currentColor" style="font-size: 12px" text-anchor="end">d = 5</text>
  <circle cx="105" cy="80" r="5" fill="#22c55e" />
  <text x="114" y="84" fill="#16a34a" style="font-size: 13px; font-weight: bold">M</text>
  <circle cx="60" cy="140" r="6" fill="#3b82f6" />
  <text x="46" y="160" fill="#3b82f6" style="font-size: 13px; font-weight: bold">A (1, 1)</text>
  <circle cx="150" cy="20" r="6" fill="#3b82f6" />
  <text x="160" y="24" fill="#3b82f6" style="font-size: 13px; font-weight: bold">B (4, 5)</text>
</svg>

</div>
<div>

<div v-click="1">

**Distanza** (teorema di Pitagora) e **punto medio**:

$$
d = \sqrt{dx^2 + dy^2} \qquad M = \left( \frac{x_A + x_B}{2},\ \frac{y_A + y_B}{2} \right)
$$

</div>

<div v-click="2" class="mt-4">

Senza struct, ogni punto sono **due variabili sciolte**:

```cpp
float distanza(float x1, float y1, float x2, float y2)
```

4 parametri, facili da scambiare. E il punto medio? Una funzione restituisce **un solo** valore...

</div>

<div v-click="3" class="mt-4">

Con la struct, `x` e `y` viaggiano **insieme**:

```cpp
float distanza(Punto a, Punto b)
Punto puntoMedio(Punto a, Punto b)
```

</div>

</div>
</div>

<!--
È lo stesso ragionamento della lezione sulle classi: base e altezza viaggiavano separate, la struct Rettangolo le ha messe insieme.
-->

---

# Definire e usare la struct

<div class="grid grid-cols-2 gap-8">
<div>

```cpp {all|1|3-4|5} {at:1}
struct Punto
{
    float x;
    float y;
};
```

<div v-click="4" class="mt-6">

```cpp
Punto a;     // una variabile di tipo Punto
a.x = 1;     // con il punto si accede ai campi
a.y = 1;
```

<div class="flex justify-center mt-4">
  <div class="border-2 border-blue-500 rounded-lg px-4 py-2 font-mono">
    <div class="text-xs uppercase opacity-60 font-sans">Punto <span class="normal-case font-mono">a</span></div>
    <div class="flex gap-6"><span>x = 1</span><span>y = 1</span></div>
  </div>
</div>

</div>

</div>
<div class="flex flex-col gap-4">

<div v-click="1" class="border-l-4 border-gray-400 pl-4">

`struct` e il **nome** del nuovo tipo, con la maiuscola (come `Rettangolo`)

</div>

<div v-click="2" class="border-l-4 border-blue-500 pl-4">

I **campi**: le variabili che ogni `Punto` contiene

</div>

<div v-click="3" class="border-l-4 border-red-500 pl-4">

Il **`;`** dopo la graffa: senza, il programma non compila!

</div>

<div v-click="5" class="border-l-4 border-yellow-500 pl-4">

`Punto` è il **tipo**, `a` è la **variabile**, come `float` e un numero. I campi si usano sulla variabile: `a.x`, mai `Punto.x`

</div>

</div>
</div>

---

# La funzione `distanza`

<div class="grid grid-cols-2 gap-8">
<div>

````md magic-move
```cpp
float distanza(Punto a, Punto b)
{

}
```

```cpp
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
}
```

```cpp
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx * dx + dy * dy);
}
```
````

</div>
<div class="flex flex-col gap-4">

<div class="border-l-4 border-gray-400 pl-4">

**L'intestazione**: riceve due `Punto` come parametri e restituisce un `float`, perché la distanza è un numero

</div>

<div v-click="1" class="border-l-4 border-yellow-500 pl-4">

**`dx` e `dy`**: di quanto si sposta B rispetto ad A, in orizzontale e in verticale. Leggiamo i campi con il punto: `b.x`, `a.x`, ...

</div>

<div v-click="2" class="border-l-4 border-green-500 pl-4">

**Pitagora**: $d = \sqrt{dx^2 + dy^2}$

- `sqrt` è la radice quadrata: serve `#include <cmath>`
- il quadrato si scrive `dx * dx`

</div>

</div>
</div>

---

# La funzione `puntoMedio`

<div class="grid grid-cols-2 gap-8">
<div>

````md magic-move
```cpp
Punto puntoMedio(Punto a, Punto b)
{

}
```

```cpp
Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
}
```

```cpp
Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
    m.x = (a.x + b.x) / 2;
    m.y = (a.y + b.y) / 2;
}
```

```cpp
Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
    m.x = (a.x + b.x) / 2;
    m.y = (a.y + b.y) / 2;
    return m;
}
```
````

</div>
<div class="flex flex-col gap-4">

<div class="border-l-4 border-gray-400 pl-4">

**Il tipo restituito è `Punto`**: la funzione non restituisce un numero, ma un punto intero

</div>

<div v-click="1" class="border-l-4 border-blue-500 pl-4">

Creiamo una variabile **locale** `m`: il punto da costruire

</div>

<div v-click="2" class="border-l-4 border-yellow-500 pl-4">

Riempiamo i campi con la **media** delle coordinate. Le parentesi sono indispensabili: prima la somma, poi la divisione

</div>

<div v-click="3" class="border-l-4 border-green-500 pl-4">

Restituiamo `m`: `x` e `y` tornano al `main` **insieme**. Senza struct una funzione non potrebbe restituire due valori

</div>

</div>
</div>

---

# Il programma completo

<div class="grid grid-cols-2 gap-6" style="--slidev-code-font-size: 11px; --slidev-code-line-height: 16px">
<div>

```cpp {all|2|5-9|11-24|all|all|all|all} {at:1}
#include <iostream>
#include <cmath>
using namespace std;

struct Punto
{
    float x;
    float y;
};

float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx * dx + dy * dy);
}

Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
    m.x = (a.x + b.x) / 2;
    m.y = (a.y + b.y) / 2;
    return m;
}
```

</div>
<div>

```cpp {all|all|all|all|3|5-8|10|12-15} {at:1}
int main()
{
    Punto a, b, m;

    cout << "Coordinate di A (x y): ";
    cin >> a.x >> a.y;
    cout << "Coordinate di B (x y): ";
    cin >> b.x >> b.y;

    m = puntoMedio(a, b);

    cout << "Distanza: " << distanza(a, b) << endl;
    cout << "Punto medio: (" << m.x
         << ", " << m.y << ")" << endl;

    return 0;
}
```

<div class="mt-3 text-sm">
<div v-if="$clicks === 1"><code>#include &lt;cmath&gt;</code> serve per usare <code>sqrt</code></div>
<div v-if="$clicks === 2">La struct va definita <b>prima</b> delle funzioni e del <code>main</code> che la usano</div>
<div v-if="$clicks === 3">Poi le due funzioni, come le abbiamo scritte</div>
<div v-if="$clicks === 4">Nel <code>main</code> tre variabili di tipo <code>Punto</code></div>
<div v-if="$clicks === 5"><code>cin</code> legge direttamente nei campi: <code>cin &gt;&gt; a.x &gt;&gt; a.y;</code> legge due numeri separati da uno spazio</div>
<div v-if="$clicks === 6"><code>puntoMedio</code> restituisce un <code>Punto</code> intero, che salviamo in <code>m</code></div>
<div v-if="$clicks === 7">Per stampare un punto si stampano i suoi campi, uno alla volta</div>
</div>

</div>
</div>

---

# Prova con il piano cartesiano

<DemoPunto />

<!--
Provare: A e B sulla stessa riga (dy = 0), A e B coincidenti (distanza 0), coordinate negative, e un caso con la distanza non intera.
-->

---

# 🔍 Trova l'errore: struct

<div class="text-lg mt-6">

Stesso gioco dell'esercizio 1: **6 versioni** del programma del punto, ognuna con **un errore**.

</div>

<div class="grid grid-cols-3 gap-6 mt-10">

<div class="border-2 border-gray-400 rounded-lg p-4">
  <div class="text-3xl mb-2">🕵️</div>
  <div class="font-bold mb-1">1. Leggi l'indizio</div>
  <div class="text-sm">Un errore di compilazione o un risultato sbagliato</div>
</div>

<div class="border-2 border-yellow-500 rounded-lg p-4">
  <div class="text-3xl mb-2">👉</div>
  <div class="font-bold mb-1">2. Trova la riga</div>
  <div class="text-sm">Cerca la riga sbagliata e prova a spiegare <b>perché</b> causa quel problema</div>
</div>

<div class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-3xl mb-2">✅</div>
  <div class="font-bold mb-1">3. Vai avanti</div>
  <div class="text-sm">Al primo passo si evidenzia l'errore, al secondo compare la correzione</div>
</div>

</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 1 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|5}
struct Punto
{
    float x;
    float y;
}

float distanza(Punto a, Punto b)
{
```

```cpp {5}
struct Punto
{
    float x;
    float y;
};

float distanza(Punto a, Punto b)
{
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: expected ';' after struct definition</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Manca il `;` dopo la graffa che chiude la struct. A differenza delle funzioni, la definizione di una struct finisce **sempre** con `;`

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

`};`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 2 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|4-5}
int main()
{
    Punto a;
    Punto.x = 3;
    Punto.y = 4;
```

```cpp {4-5}
int main()
{
    Punto a;
    a.x = 3;
    a.y = 4;
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: expected unqualified-id before '.' token</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`Punto` è il **tipo**, lo stampo: non contiene valori. I campi esistono solo nelle **variabili** di tipo `Punto`, come `a`. Sarebbe come scrivere `float = 3;`

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Si usa il nome della variabile: `a.x = 3;`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 3 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|5}
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return dx * dx + dy * dy;
}
```

```cpp {5}
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx * dx + dy * dy);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

La distanza tra $(0, 0)$ e $(3, 4)$ risulta **25** invece di 5

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

$3 \cdot 3 + 4 \cdot 4 = 25$ è $d^2$, non $d$: manca la **radice quadrata** del teorema di Pitagora

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

`return sqrt(dx * dx + dy * dy);` (con `#include <cmath>`)

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 4 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|5}
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx^2 + dy^2);
}
```

```cpp {5}
float distanza(Punto a, Punto b)
{
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx * dx + dy * dy);
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: invalid operands of types 'float' and 'float' to binary 'operator^'</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

In C++ `^` **non** è l'elevamento a potenza: è un'operazione sui bit, che con i `float` non si può nemmeno usare

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Il quadrato si scrive `dx * dx` (oppure `pow(dx, 2)`, sempre da `<cmath>`)

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 5 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|4-5}
Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
    m.x = a.x + b.x / 2;
    m.y = a.y + b.y / 2;
    return m;
}
```

```cpp {4-5}
Punto puntoMedio(Punto a, Punto b)
{
    Punto m;
    m.x = (a.x + b.x) / 2;
    m.y = (a.y + b.y) / 2;
    return m;
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il punto medio tra $(2, 4)$ e $(6, 8)$ risulta $(5, 8)$ invece di $(4, 6)$

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Come in matematica, la divisione si fa **prima** della somma: viene diviso solo `b.x`. Infatti $2 + 6 / 2 = 5$ e $4 + 8 / 2 = 8$

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Le parentesi: `m.x = (a.x + b.x) / 2;`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">struct · 6 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|4}
cin >> a.x >> a.y;
cin >> b.x >> b.y;

if (a == b)
{
    cout << "I punti coincidono" << endl;
}
```

```cpp {4}
cin >> a.x >> a.y;
cin >> b.x >> b.y;

if (a.x == b.x && a.y == b.y)
{
    cout << "I punti coincidono" << endl;
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: no match for 'operator==' (operand types are 'Punto' and 'Punto')</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Il C++ non sa confrontare due struct con `==`: non sa che due punti sono uguali quando hanno uguali **tutti** i campi

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Si confronta **campo per campo**: `a.x == b.x && a.y == b.y`

</div>

</div>
</div>

---

# Prima di consegnare: la checklist delle struct

<div class="text-lg mt-2 opacity-80">Quando usi una struct nel compito, controlla:</div>

<v-clicks>

- ✅ Dopo la graffa della struct c'è il **`;`**: `};`
- ✅ La struct è definita **prima** delle funzioni che la usano
- ✅ I campi si usano sulla **variabile** (`a.x`), mai sul tipo (`Punto.x`)
- ✅ Il quadrato si scrive `dx * dx`: **`^` non è la potenza**
- ✅ Per `sqrt` serve `#include <cmath>`
- ✅ Le **parentesi** nella media: `(a.x + b.x) / 2`
- ✅ Due struct si confrontano **campo per campo**, non con `==`
- ✅ Una funzione che restituisce un punto ha tipo **`Punto`**, non `float`

</v-clicks>

---

# Riepilogo: le struct

<div class="grid grid-cols-2 gap-4 mt-4">

<div v-click class="border-2 border-blue-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Definire</div>
  <div class="font-bold text-lg mb-2">Un nuovo tipo</div>
  <div class="text-sm">Raggruppa dati che stanno insieme</div>
  <div class="font-mono text-sm mt-3">struct Punto { float x; float y; };</div>
</div>

<div v-click class="border-2 border-yellow-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Usare</div>
  <div class="font-bold text-lg mb-2">Variabile e punto</div>
  <div class="text-sm">Si dichiara come un tipo qualsiasi, i campi si raggiungono con il punto</div>
  <div class="font-mono text-sm mt-3">Punto a; a.x = 1;</div>
</div>

<div v-click class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Come parametro</div>
  <div class="font-bold text-lg mb-2">Un parametro, tutti i dati</div>
  <div class="text-sm">La funzione riceve il punto intero invece di due numeri sciolti</div>
  <div class="font-mono text-sm mt-3">float distanza(Punto a, Punto b)</div>
</div>

<div v-click class="border-2 border-purple-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Come valore restituito</div>
  <div class="font-bold text-lg mb-2">Più valori in un colpo solo</div>
  <div class="text-sm">Una funzione restituisce un solo valore, ma quel valore può essere una struct</div>
  <div class="font-mono text-sm mt-3">Punto puntoMedio(Punto a, Punto b)</div>
</div>

</div>
