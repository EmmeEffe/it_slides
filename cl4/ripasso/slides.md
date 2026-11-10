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
