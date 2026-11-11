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

---
layout: section
---

# Esercizio 3

Le classi: il vertice della parabola

---

# Esercizio 3

<div class="text-xl leading-relaxed mt-6 border-l-4 border-blue-500 pl-6">

Scrivi una classe **Parabola** che rappresenti la parabola $y = ax^2 + bx + c$:

- i coefficienti `a`, `b` e `c` sono attributi **private**, che si impostano con dei **setter**
- il metodo `calcolaVertice` restituisce il **vertice** della parabola, usando la `struct` **Punto**

Nel `main` leggi da tastiera i tre coefficienti (`a` deve essere diverso da 0) e stampa il vertice.

</div>

<div class="mt-8 text-center text-xl border-2 border-yellow-500 rounded-lg p-4 bg-yellow-500/10">

✋ Fermati qui e prova a scriverlo da solo prima di andare avanti

</div>

---

# L'idea: il vertice della parabola

<div class="grid grid-cols-[2fr_3fr] gap-8 mt-2">
<div>

<div class="text-center font-mono text-sm opacity-80">y = x² − 4x + 3</div>

<svg viewBox="0 0 230 230" class="w-full">
  <line x1="22" y1="160" x2="205" y2="160" stroke="currentColor" stroke-opacity="0.6" />
  <line x1="58" y1="222" x2="58" y2="10" stroke="currentColor" stroke-opacity="0.6" />
  <text x="202" y="153" text-anchor="end" fill="currentColor" fill-opacity="0.6" style="font-size: 11px; font-style: italic">x</text>
  <text x="64" y="20" fill="currentColor" fill-opacity="0.6" style="font-size: 11px; font-style: italic">y</text>
  <path d="M 49.6 39.9 Q 114 336.1 178.4 39.9" fill="none" stroke="#3b82f6" stroke-width="2.5" />
  <line x1="114" y1="188" x2="114" y2="160" stroke="#eab308" stroke-width="1.5" stroke-dasharray="4 3" />
  <line x1="114" y1="188" x2="58" y2="188" stroke="#eab308" stroke-width="1.5" stroke-dasharray="4 3" />
  <text x="114" y="153" text-anchor="middle" fill="#ca8a04" style="font-size: 11px">2</text>
  <text x="53" y="192" text-anchor="end" fill="#ca8a04" style="font-size: 11px">−1</text>
  <circle cx="114" cy="188" r="6" fill="#22c55e" />
  <text x="124" y="208" fill="#16a34a" style="font-size: 13px; font-weight: bold">V (2, −1)</text>
</svg>

</div>
<div>

<div v-click="1">

Il **vertice** è il punto più basso (o più alto) della parabola:

$$
x_V = -\frac{b}{2a} \qquad \Delta = b^2 - 4ac \qquad y_V = -\frac{\Delta}{4a}
$$

</div>

<div v-click="2" class="mt-2">

Nell'esempio $a = 1$, $b = -4$, $c = 3$:

$$
x_V = -\frac{-4}{2} = 2 \qquad \Delta = 16 - 12 = 4 \qquad y_V = -\frac{4}{4} = -1
$$

</div>

<div v-click="3" class="mt-4 p-3 rounded-lg bg-yellow-500/15 border-2 border-yellow-500 text-sm">

**Perché $a \neq 0$?** Con $a = 0$ non è più una parabola ma una retta, e nelle formule si dividerebbe per 0

</div>

<div v-click="4" class="mt-4">

Il vertice sono **due** numeri, $x_V$ e $y_V$, che stanno insieme: è un **punto**. Ci tornerà utile la `struct Punto` dell'esercizio 2

</div>

</div>
</div>

---

# Passo 1: tutto nel `main`

<div class="grid grid-cols-2 gap-8">
<div>

```cpp {all|4-7|8-11|12-14|15-16|all} {at:1}
int main(){
    float a, b, c, delta;
    float xv, yv;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> a;
    }while(a==0);
    cout << "Inserisci b: ";
    cin >> b;
    cout << "Inserisci c: ";
    cin >> c;
    xv = -b/(2*a);
    delta = b*b-4*a*c;
    yv = -delta/(4*a);
    cout << "Il vertice è al punto ("
         << xv << ";" << yv << ")" << endl;
    return 0;
}
```

</div>
<div class="flex flex-col gap-3 compatto">

<div class="border-l-4 border-gray-400 pl-4">

Prima della classe, scriviamo il programma **come lo sapremmo già fare**

</div>

<div v-click="1" class="border-l-4 border-yellow-500 pl-4">

Il **`do-while`** richiede `a` finché l'utente non scrive un valore diverso da 0

</div>

<div v-click="2" class="border-l-4 border-blue-500 pl-4">

Poi `b` e `c`: va bene qualsiasi valore

</div>

<div v-click="3" class="border-l-4 border-green-500 pl-4">

Le formule del vertice. Attenzione alle **parentesi**: `-b/(2*a)`, non `-b/2*a`

</div>

<div v-click="4" class="border-l-4 border-gray-400 pl-4">

Stampiamo il risultato

</div>

<div v-click="5" class="p-3 rounded-lg bg-yellow-500/15 border-2 border-yellow-500 text-sm">

Funziona! Ma **dati** e **calcoli** della parabola sono mescolati con il dialogo con l'utente: li raccogliamo in una **classe**

</div>

</div>
</div>

---

# Dal `main` alla classe: cosa va dove?

<div class="grid grid-cols-2 gap-8">
<div>

```cpp {all|2|12-14|3-11,15-16|all} {at:1}
int main(){
    float a, b, c, delta;
    float xv, yv;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> a;
    }while(a==0);
    cout << "Inserisci b: ";
    cin >> b;
    cout << "Inserisci c: ";
    cin >> c;
    xv = -b/(2*a);
    delta = b*b-4*a*c;
    yv = -delta/(4*a);
    cout << "Il vertice è al punto ("
         << xv << ";" << yv << ")" << endl;
    return 0;
}
```

</div>
<div class="flex flex-col gap-4">

<div v-click="1" class="border-2 border-purple-500 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60">Va nella classe</div>
  I <b>dati</b> della parabola, <code>a</code>, <code>b</code>, <code>c</code> e <code>delta</code>, diventano <b>attributi</b>
</div>

<div v-click="2" class="border-2 border-purple-500 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60">Va nella classe</div>
  Il <b>calcolo</b> del vertice diventa un <b>metodo</b>
</div>

<div v-click="3" class="border-2 border-gray-400 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60">Resta nel main</div>
  Il <b>dialogo con l'utente</b>: <code>cout</code>, <code>cin</code>, il controllo su <code>a</code> e le variabili dove salvare il risultato
</div>

<div v-click="4" class="text-center text-lg mt-2">

La classe sa **cos'è** una parabola e **come** si calcola il vertice. Il `main` **parla con l'utente**

</div>

</div>
</div>

---

# Passo 2: la prima classe

<div class="grid grid-cols-2 gap-6">
<div>

```cpp {all|3|5-11|5-11|all|all} {at:1}
class Parabola{
public:
    float a, b, c, delta;

    float getVerticeX(){
        return -b/(2*a);
    }
    float getVerticeY(){
        delta = b*b-4*a*c;
        return -delta/(4*a);
    }
};
```

</div>
<div>

```cpp {all|all|all|all|2|6,9,11|12-15} {at:1}
int main(){
    Parabola p;
    float xv, yv;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> p.a;
    }while(p.a==0);
    cout << "Inserisci b: ";
    cin >> p.b;
    cout << "Inserisci c: ";
    cin >> p.c;
    xv = p.getVerticeX();
    yv = p.getVerticeY();
    cout << "Il vertice è al punto ("
         << xv << ";" << yv << ")" << endl;
    return 0;
}
```

</div>
</div>

<div class="mt-2">
<div v-if="$clicks === 0">La prima versione: per ora tutti gli attributi sono <code>public</code></div>
<div v-if="$clicks === 1">I dati della parabola sono diventati <b>attributi</b></div>
<div v-if="$clicks === 2">Il calcolo è diventato un metodo... anzi <b>due</b>: <code>getVerticeX</code> e <code>getVerticeY</code></div>
<div v-if="$clicks === 3">Perché due? Un metodo, come ogni funzione, restituisce <b>un solo valore</b>: uno per la x e uno per la y</div>
<div v-if="$clicks === 4">Nel <code>main</code> creiamo l'oggetto <code>p</code>, la nostra parabola</div>
<div v-if="$clicks === 5">Il <code>cin</code> scrive direttamente negli attributi: si può, perché sono <code>public</code></div>
<div v-if="$clicks === 6">Per avere il vertice servono <b>due chiamate</b>, e il <code>main</code> deve rimettere insieme x e y</div>
</div>

<!--
Il passaggio è lo stesso del rettangolo: dati → attributi, calcoli → metodi.
Il main legge ancora direttamente negli attributi: lo sistemeremo con i setter al passo 4.
-->

---

# Passo 3: da due metodi a un `Punto`

<div class="grid grid-cols-2 gap-6" style="--slidev-code-font-size: 11px; --slidev-code-line-height: 16px">
<div>

````md magic-move {at:2}
```cpp
class Parabola{
public:
    float a, b, c, delta;

    float getVerticeX(){
        return -b/(2*a);
    }
    float getVerticeY(){
        delta = b*b-4*a*c;
        return -delta/(4*a);
    }
};
```

```cpp
struct Punto{
    float x;
    float y;
};

class Parabola{
public:
    float a, b, c, delta;

    float getVerticeX(){
        return -b/(2*a);
    }
    float getVerticeY(){
        delta = b*b-4*a*c;
        return -delta/(4*a);
    }
};
```

```cpp
struct Punto{
    float x;
    float y;
};

class Parabola{
public:
    float a, b, c, delta;
    Punto vertice;

    Punto calcolaVertice(){
        vertice.x = -b/(2*a);
        delta = b*b-4*a*c;
        vertice.y = -delta/(4*a);
        return vertice;
    }
};
```
````

</div>
<div class="flex flex-col gap-3 compatto">

````md magic-move {at:4}
```cpp
// ... lettura di a, b e c ...
float xv, yv;
xv = p.getVerticeX();
yv = p.getVerticeY();
cout << "Il vertice è al punto ("
     << xv << ";" << yv << ")" << endl;
```

```cpp
// ... lettura di a, b e c ...
Punto vertice_calcolato;
vertice_calcolato = p.calcolaVertice();
cout << "Il vertice è al punto ("
     << vertice_calcolato.x << ";"
     << vertice_calcolato.y << ")" << endl;
```
````

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">Il problema</div>

Il vertice è **un** punto, ma esce in **due pezzi**: due metodi e due chiamate

</div>

<div v-click="2" class="border-l-4 border-blue-500 pl-4 text-sm">

La `struct Punto` dell'esercizio 2 tiene x e y **insieme**. Va scritta **prima** della classe

</div>

<div v-click="3" class="border-l-4 border-green-500 pl-4 text-sm">

Un solo metodo che restituisce un **`Punto`**. Anche il vertice diventa un attributo

</div>

<div v-click="4" class="border-l-4 border-yellow-500 pl-4 text-sm">

Nel `main` una sola chiamata. Come `puntoMedio`: si restituisce un solo valore, ma è una **struct**

</div>

</div>
</div>

<!--
Domanda alla classe prima di andare avanti: cosa non vi piace di getVerticeX / getVerticeY?
Collegare a puntoMedio dell'esercizio 2: stesso problema (due valori da restituire), stessa soluzione.
-->

---

# Passo 4: perché i setter?

<div class="grid grid-cols-2 gap-8">
<div>

```cpp {all|3-4|all} {at:1}
class Parabola{
public:
    float a, b, c, delta;
    Punto vertice;

    Punto calcolaVertice(){
        vertice.x = -b/(2*a);
        delta = b*b-4*a*c;
        vertice.y = -delta/(4*a);
        return vertice;
    }
};
```

<div v-click="1" class="mt-4">

```cpp
// nel main, dopo il do-while...
p.a = 0;        // divisione per 0!
p.delta = 100;  // delta lo calcola la classe
```

</div>

</div>
<div class="flex flex-col gap-3 compatto">

<div v-click="1" class="border-l-4 border-red-500 pl-4">

Con gli attributi `public`, il `main` può scrivere **qualsiasi valore** in **qualsiasi** attributo

</div>

<div v-click="2" class="border-l-4 border-purple-500 pl-4">

Come per il rettangolo, gli attributi diventano **`private`**. Ma ora `cin >> p.a;` non compila più:

<div class="font-mono text-red-500" style="font-size: 10px">error: 'float Parabola::a' is private within this context</div>

</div>

<div v-click="3" class="border-l-4 border-green-500 pl-4">

Serve una **porta controllata**: un **setter** per `a`, `b` e `c`. Per `delta` e `vertice` **nessun setter**: li calcola solo la classe

</div>

<div v-click="4" class="p-3 rounded-lg border-2 border-gray-400 text-sm">

💡 Il setter è anche il posto giusto per un **controllo** (come `setBase` nel rettangolo): `setA` potrebbe rifiutare `a = 0`

</div>

</div>
</div>

<!--
Il motivo dei setter: con gli attributi private il main non può più scriverci, quindi la classe apre una "porta" solo per i coefficienti.
delta e vertice restano chiusi: sono il risultato dei calcoli della classe.
Nel programma fatto a lezione il controllo a != 0 è nel main (do-while); spostarlo in setA è un'alternativa.
-->

---

# Passo 4: attributi `private` e setter

<div class="grid grid-cols-2 gap-4" style="--slidev-code-font-size: 11px; --slidev-code-line-height: 16px">
<div>

````md magic-move {at:1}
```cpp
class Parabola{
public:
    float a, b, c, delta;
    Punto vertice;

    Punto calcolaVertice(){
        vertice.x = -b/(2*a);
        delta = b*b-4*a*c;
        vertice.y = -delta/(4*a);
        return vertice;
    }
};
```

```cpp
class Parabola{
private:
    float a, b, c, delta;
    Punto vertice;
public:
    Punto calcolaVertice(){
        vertice.x = -b/(2*a);
        delta = b*b-4*a*c;
        vertice.y = -delta/(4*a);
        return vertice;
    }
};
```

```cpp
class Parabola{
private:
    float a, b, c, delta;
    Punto vertice;
public:
    void setA(float val_a){
        a = val_a;
    }
    void setB(float val_b){
        b = val_b;
    }
    void setC(float val_c){
        c = val_c;
    }

    Punto calcolaVertice(){
        vertice.x = -b/(2*a);
        delta = b*b-4*a*c;
        vertice.y = -delta/(4*a);
        return vertice;
    }
};
```
````

</div>
<div>

````md magic-move {at:3}
```cpp
int main(){
    Parabola p;
    Punto vertice_calcolato;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> p.a;
    }while(p.a==0);
    cout << "Inserisci b: ";
    cin >> p.b;
    cout << "Inserisci c: ";
    cin >> p.c;
    vertice_calcolato = p.calcolaVertice();
    // ... stampa ...
    return 0;
}
```

```cpp {all|3|5-9|10-15}
int main(){
    Parabola p;
    float a_utente, b_utente, c_utente;
    Punto vertice_calcolato;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> a_utente;
    }while(a_utente==0);
    p.setA(a_utente);
    cout << "Inserisci b: ";
    cin >> b_utente;
    p.setB(b_utente);
    cout << "Inserisci c: ";
    cin >> c_utente;
    p.setC(c_utente);
    vertice_calcolato = p.calcolaVertice();
    // ... stampa ...
    return 0;
}
```
````

</div>
</div>

<div class="mt-2 text-sm">
<div v-if="$clicks === 0">Partiamo dalla classe del passo 3, con gli attributi <code>public</code></div>
<div v-if="$clicks === 1">Tutti gli attributi diventano <code>private</code>, anche <code>delta</code> e <code>vertice</code>. Il metodo resta <code>public</code></div>
<div v-if="$clicks === 2">Un setter per ogni coefficiente: riceve il nuovo valore e lo copia nell'attributo. Per <code>delta</code> e <code>vertice</code> niente setter</div>
<div v-if="$clicks === 3">Il <code>main</code> non può più scrivere in <code>p.a</code>: deve passare dai setter</div>
<div v-if="$clicks === 4">Servono tre variabili <b>del main</b> dove leggere i valori scritti dall'utente</div>
<div v-if="$clicks === 5">Il <code>do-while</code> controlla <code>a_utente</code>; quando va bene, lo passiamo a <code>setA</code></div>
<div v-if="$clicks === 6">Stessa cosa per <code>b</code> e <code>c</code>, senza controllo</div>
</div>

---

# Come funziona un setter

<div class="grid grid-cols-[2fr_3fr] gap-8 mt-2">
<div>

```cpp {2|3,6|7|8}
// nel main
cin >> a_utente;      // l'utente scrive 2
p.setA(a_utente);

// nella classe
void setA(float val_a){
    a = val_a;
}
```

</div>
<div>

<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 font-mono text-sm">

<div class="border-2 border-gray-400 rounded-lg p-2">
  <div class="text-xs opacity-60 font-sans">main</div>
  <div>a_utente = <b>2</b></div>
</div>

<div class="text-center text-xs font-sans" :class="$clicks === 1 ? 'text-blue-500' : 'opacity-0'">copia<br>⟶</div>

<div class="border-2 rounded-lg p-2" :class="$clicks === 0 ? 'opacity-0' : $clicks === 3 ? 'border-dashed border-gray-400 opacity-40' : 'border-blue-500'">
  <div class="text-xs opacity-60 font-sans">setA</div>
  <div :class="{ 'line-through': $clicks === 3 }">val_a = <b>2</b></div>
</div>

<div class="text-center text-xs font-sans" :class="$clicks === 2 ? 'text-green-500' : 'opacity-0'">copia<br>⟶</div>

<div class="border-2 border-purple-500 rounded-lg p-2">
  <div class="text-xs opacity-60 font-sans">Parabola p 🔒</div>
  <div>a = <b :class="$clicks >= 2 ? 'text-green-500' : 'text-red-500'">{{ $clicks >= 2 ? '2' : '?' }}</b></div>
  <div class="opacity-50">b = ?</div>
  <div class="opacity-50">c = ?</div>
</div>

</div>

<div class="mt-6">
<div v-if="$clicks === 0">L'utente scrive 2 in <code>a_utente</code>, una variabile <b>del main</b>. L'attributo <code>a</code> di <code>p</code> contiene ancora un valore a caso</div>
<div v-if="$clicks === 1">Chiamando <code>p.setA(a_utente)</code> nasce il parametro <code>val_a</code>, che riceve una <b>copia</b> del valore di <code>a_utente</code></div>
<div v-if="$clicks === 2"><code>a = val_a;</code> copia il valore del parametro nell'<b>attributo</b> <code>a</code> dell'oggetto <code>p</code></div>
<div v-if="$clicks === 3">Il setter finisce e <code>val_a</code> <b>sparisce</b>, come ogni parametro. Il valore però è salvo nell'attributo, che vive finché vive l'oggetto <code>p</code></div>
</div>

</div>
</div>

<div v-click="4" class="mt-6 grid grid-cols-3 gap-4 text-sm">
  <div class="border-2 border-gray-400 rounded-lg p-3"><code>a_utente</code><br>variabile del <b>main</b>: dove l'utente scrive</div>
  <div class="border-2 border-blue-500 rounded-lg p-3"><code>val_a</code><br><b>parametro</b>: esiste solo durante la chiamata</div>
  <div class="border-2 border-purple-500 rounded-lg p-3"><code>a</code><br><b>attributo</b>: vive dentro l'oggetto, ed è <code>private</code></div>
</div>

<!--
Tre variabili diverse per lo stesso numero: è il punto da far capire.
Il valore fa due copie: a_utente → val_a (passaggio del parametro), val_a → a (assegnazione nel setter).
-->

---

# Perché il parametro ha un nome diverso?

<div class="grid grid-cols-2 gap-8 mt-2">
<div class="border-2 border-red-500 rounded-lg p-4">
<div class="text-xs uppercase opacity-60">❌ Stesso nome</div>

<pre class="font-mono text-sm mt-2 leading-relaxed">void setA(float <span class="text-orange-500 font-bold">a</span>){
    <span :class="$clicks >= 2 ? 'text-orange-500 font-bold' : ''">a</span> = <span :class="$clicks >= 2 ? 'text-orange-500 font-bold' : ''">a</span>;
}</pre>

<div v-click="1" class="flex gap-3 mt-3 font-mono text-sm">
  <div class="border-2 border-purple-500 rounded p-2"><div class="text-xs font-sans opacity-60">attributo di p</div>a = <b class="text-red-500">?</b></div>
  <div class="border-2 border-orange-500 rounded p-2"><div class="text-xs font-sans opacity-60">parametro</div>a = <b>2</b></div>
</div>

<div v-click="1" class="text-sm mt-2">Ci sono <b>due</b> variabili che si chiamano <code>a</code>. In <code>a = a;</code>, quale delle due?</div>

<div v-click="2" class="text-sm mt-2">Dentro il metodo vince il nome <b>più vicino</b>: il parametro <b>nasconde</b> l'attributo. Entrambe le <code>a</code> sono il parametro, che viene copiato in sé stesso. L'attributo resta un valore a caso</div>

<div v-click="3" class="text-sm mt-2 p-2 rounded bg-red-500/15">

Compila **senza errori** e senza avvisi, ma con $a = 2$, $b = 4$, $c = 1$ stampa:<br>
<span class="font-mono text-xs">Il vertice è al punto (25927.1;51855.2)</span>

</div>

</div>
<div v-click="4" class="border-2 border-green-500 rounded-lg p-4">
<div class="text-xs uppercase opacity-60">✅ Nomi diversi</div>

<pre class="font-mono text-sm mt-2 leading-relaxed">void setA(float <span class="text-blue-500 font-bold">val_a</span>){
    <span class="text-purple-500 font-bold">a</span> = <span class="text-blue-500 font-bold">val_a</span>;
}</pre>

<div class="flex gap-3 mt-3 font-mono text-sm">
  <div class="border-2 border-purple-500 rounded p-2"><div class="text-xs font-sans opacity-60">attributo di p</div>a = <b class="text-green-500">2</b></div>
  <div class="border-2 border-blue-500 rounded p-2"><div class="text-xs font-sans opacity-60">parametro</div>val_a = <b>2</b></div>
</div>

<div class="text-sm mt-2">Nessuna ambiguità: <code>a</code> può essere solo l'<b>attributo</b>, <code>val_a</code> solo il <b>parametro</b>. Il valore va da uno all'altro</div>

<div class="text-sm mt-3 p-2 rounded bg-green-500/15">

**Regola**: il parametro del setter ha un nome **diverso** dall'attributo, per esempio `val_a`, `val_b`, `val_c`

</div>

</div>
</div>

<!--
Il risultato con a = a dipende da cosa c'è in memoria: numeri a caso, a ogni esecuzione possono cambiare.
Il compilatore non segnala niente: è un errore "silenzioso", per questo è importante la regola dei nomi diversi.
-->

---
zoom: 0.9
---

# Il programma completo

<div class="grid grid-cols-2 gap-6" style="--slidev-code-font-size: 10px; --slidev-code-line-height: 14px">
<div>

```cpp {all|4-7|10-12|14-22|24-29|all|all|all} {at:1}
#include <iostream>
using namespace std;

struct Punto{
  float x;
  float y;
};

class Parabola{
private:
  float a, b, c, delta;
  Punto vertice;
public:
  void setA(float val_a){
    a = val_a;
  }
  void setB(float val_b){
    b = val_b;
  }
  void setC(float val_c){
    c = val_c;
  }

  Punto calcolaVertice(){
    vertice.x = -b/(2*a);
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
  }
};
```

</div>
<div>

```cpp {all|all|all|all|all|5-9|10-15|16-18} {at:1}
int main(){
  Parabola p;
  float a_utente, b_utente, c_utente;
  Punto vertice_calcolato;
  do{
    cout << "Inserisci a (diverso da 0): ";
    cin >> a_utente;
  }while(a_utente==0);
  p.setA(a_utente);
  cout << "Inserisci b: ";
  cin >> b_utente;
  p.setB(b_utente);
  cout << "Inserisci c: ";
  cin >> c_utente;
  p.setC(c_utente);
  vertice_calcolato = p.calcolaVertice();
  cout << "Il vertice è al punto (" << vertice_calcolato.x
       << ";" << vertice_calcolato.y << ")" << endl;
  return 0;
}
```

<div class="mt-3 text-sm">
<div v-if="$clicks === 1">La <code>struct Punto</code> va definita <b>prima</b> della classe che la usa</div>
<div v-if="$clicks === 2">Gli attributi sono <code>private</code>: il <code>main</code> non li vede</div>
<div v-if="$clicks === 3">I setter sono <code>public</code>: sono la porta d'ingresso per <code>a</code>, <code>b</code> e <code>c</code></div>
<div v-if="$clicks === 4"><code>calcolaVertice</code> usa gli attributi e restituisce il vertice come <code>Punto</code></div>
<div v-if="$clicks === 5">Il controllo <code>a ≠ 0</code> lo fa il <code>main</code>, poi passa il valore al setter</div>
<div v-if="$clicks === 6"><code>b</code> e <code>c</code>: si leggono e si passano ai setter</div>
<div v-if="$clicks === 7">Una sola chiamata per il vertice, poi si stampano i campi <code>.x</code> e <code>.y</code></div>
</div>

</div>
</div>

---

# Prova a cambiare la parabola

<DemoParabola />

<!--
Provare: a negativo (parabola rivolta verso il basso), b = 0 (vertice sull'asse y), a = 0 (il do-while non chiama setA, l'oggetto non cambia).
Far notare che delta e vertice cambiano solo perché li ricalcola la classe: nessuno li scrive dal main.
-->

---

# 🔍 Trova l'errore: classi

<div class="text-lg mt-6">

Ultimo giro: **6 versioni** del programma della parabola, ognuna con **un errore**.

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

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 1 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|2}
Punto calcolaVertice(){
    vertice.x = -b/2*a;
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
}
```

```cpp {2}
Punto calcolaVertice(){
    vertice.x = -b/(2*a);
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Con $a = 2$, $b = 4$, $c = 1$ il vertice risulta $(-4; -1)$ invece di $(-1; -1)$: la y è giusta, la x no

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Divisione e moltiplicazione si eseguono **da sinistra a destra**: `-b/2*a` divide per 2 e poi **moltiplica** per `a`. Infatti $-4 / 2 \cdot 2 = -4$

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Le parentesi intorno al denominatore: `-b/(2*a)`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 2 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|3-4}
Punto calcolaVertice(){
    vertice.x = -b/(2*a);
    vertice.y = -delta/(4*a);
    delta = b*b-4*a*c;
    return vertice;
}
```

```cpp {3-4}
Punto calcolaVertice(){
    vertice.x = -b/(2*a);
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
}
```
````

</div>
<div class="flex flex-col gap-3 compatto">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Con $a = 2$, $b = 4$, $c = 1$ stampa:

<div class="font-mono text-xs mt-1">Il vertice è al punto (-1;-5.73692e-42)</div>

La x è giusta, ma la y è un numero strano invece di −1

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`vertice.y` usa `delta` **prima** che venga calcolato: in quel momento `delta` contiene un valore a caso. Le istruzioni si eseguono **nell'ordine** in cui sono scritte

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Prima si calcola `delta`, poi lo si usa per `vertice.y`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 3 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|5,6}
int main(){
    Parabola p;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> p.a;
    }while(p.a==0);
```

```cpp {5-7}
int main(){
    Parabola p;
    do{
        cout << "Inserisci a (diverso da 0): ";
        cin >> a_utente;
    }while(a_utente==0);
    p.setA(a_utente);
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: 'float Parabola::a' is private within this context</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`a` è `private`: dal `main` non si può né scrivere né leggere, nemmeno con `cin` o nella condizione del `while`

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Si legge in una variabile del `main`, la si controlla, e la si passa al **setter**: `p.setA(a_utente);`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 4 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|1}
float calcolaVertice(){
    vertice.x = -b/(2*a);
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
}
```

```cpp {1}
Punto calcolaVertice(){
    vertice.x = -b/(2*a);
    delta = b*b-4*a*c;
    vertice.y = -delta/(4*a);
    return vertice;
}
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: cannot convert 'Punto' to 'float' in return</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

Il metodo dice di restituire un `float`, ma `return vertice;` restituisce un `Punto`: un punto non si può trasformare in un numero solo

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Il tipo restituito è quello di ciò che si restituisce: `Punto calcolaVertice()`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 5 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|2}
vertice_calcolato = p.calcolaVertice();
cout << vertice_calcolato << endl;
```

```cpp {2-4}
vertice_calcolato = p.calcolaVertice();
cout << "(" << vertice_calcolato.x
     << ";" << vertice_calcolato.y
     << ")" << endl;
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: no match for 'operator<<' (operand types are 'std::ostream' and 'Punto')</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`cout` sa stampare numeri e testi, ma **non** sa come stampare una struct: non sa quali campi stampare, né in che formato

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Si stampano i campi **uno alla volta**: `vertice_calcolato.x` e `vertice_calcolato.y`

</div>

</div>
</div>

---

# 🔍 Trova l'errore <span class="text-2xl opacity-50">classi · 6 / 6</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

````md magic-move
```cpp {all|3}
p.setC(c_utente);

vertice_calcolato = calcolaVertice();
```

```cpp {3}
p.setC(c_utente);

vertice_calcolato = p.calcolaVertice();
```
````

</div>
<div class="flex flex-col gap-3">

<div class="p-3 rounded-lg border-2 border-gray-400">
<div class="text-xs uppercase opacity-60">Indizio</div>

Il programma **non compila**:

<div class="font-mono text-xs mt-1">error: 'calcolaVertice' was not declared in this scope</div>

</div>

<div v-click="1" class="p-3 rounded-lg bg-red-500/15 border-2 border-red-500 text-sm">
<div class="text-xs uppercase opacity-60">L'errore</div>

`calcolaVertice` non è una funzione qualsiasi: è un **metodo** della classe. Va chiamato **su un oggetto**, altrimenti di quale parabola calcolerebbe il vertice?

</div>

<div v-click="2" class="p-3 rounded-lg bg-green-500/15 border-2 border-green-500 text-sm">
<div class="text-xs uppercase opacity-60">La correzione</div>

Oggetto, punto, metodo: `p.calcolaVertice()`

</div>

</div>
</div>

---

# Prima di consegnare: la checklist delle classi

<div class="text-lg mt-2 opacity-80">Quando scrivi una classe nel compito, controlla:</div>

<v-clicks>

- ✅ Gli attributi sono **`private`**, i setter e i metodi **`public`**
- ✅ Il parametro del setter ha un nome **diverso** dall'attributo: `a = val_a;`
- ✅ Dal `main` si scrive negli attributi **solo** con i setter: `cin >> a_utente;` e poi `p.setA(a_utente);`
- ✅ La `struct Punto` è definita **prima** della classe
- ✅ Le **parentesi** nelle formule: `-b/(2*a)` e `-delta/(4*a)`
- ✅ `delta` si calcola **prima** di usarlo
- ✅ Un metodo che restituisce un punto ha tipo **`Punto`**, e si chiama **su un oggetto**: `p.calcolaVertice()`
- ✅ Dopo la graffa della classe c'è il **`;`**: `};`

</v-clicks>

---

# Riepilogo: dal `main` alla classe

<div class="grid grid-cols-2 gap-4 mt-4">

<div v-click class="border-2 border-blue-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passi 1 e 2</div>
  <div class="font-bold text-lg mb-2">Dal main alla classe</div>
  <div class="text-sm">I dati diventano <b>attributi</b>, i calcoli diventano <b>metodi</b>, il dialogo con l'utente resta nel <code>main</code></div>
</div>

<div v-click class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passo 3</div>
  <div class="font-bold text-lg mb-2">Un metodo, un Punto</div>
  <div class="text-sm">Invece di <code>getVerticeX</code> e <code>getVerticeY</code>, un solo metodo che restituisce x e y insieme</div>
  <div class="font-mono text-sm mt-3">Punto calcolaVertice()</div>
</div>

<div v-click class="border-2 border-purple-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Passo 4</div>
  <div class="font-bold text-lg mb-2">private + setter</div>
  <div class="text-sm">Gli attributi sono chiusi nella classe: dal <code>main</code> si entra solo dalle porte che la classe decide di aprire</div>
  <div class="font-mono text-sm mt-3">p.setA(a_utente);</div>
</div>

<div v-click class="border-2 border-yellow-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Il setter</div>
  <div class="font-bold text-lg mb-2">Nomi diversi</div>
  <div class="text-sm">Il parametro ha un nome diverso dall'attributo, altrimenti lo nasconde</div>
  <div class="font-mono text-sm mt-3">void setA(float val_a){ a = val_a; }</div>
</div>

</div>
