---
theme: default
routerMode: hash
title: Le classi in C++
transition: slide-left
mdc: true
---

# Le classi in C++

Dalla `struct` agli oggetti, un pezzo alla volta

<!--
Obiettivo della lezione: capire perché esistono le classi, non solo come si scrivono.
-->

---

# Il problema

Vogliamo scrivere una serie di programmi che calcolano **area** e **perimetro** di rettangoli.

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

Un rettangolo è descritto da due dati:

- la **base** $b$
- l'**altezza** $h$

Da questi ricaviamo:

$$
A = b \cdot h \qquad P = 2 \cdot (b + h)
$$

</div>
<div class="flex items-center justify-center">

<svg viewBox="0 0 220 150" class="w-64">
  <rect x="20" y="20" width="160" height="90" fill="none" stroke="currentColor" stroke-width="3"/>
  <text x="100" y="135" text-anchor="middle" fill="currentColor" font-size="16">b</text>
  <text x="195" y="70" fill="currentColor" font-size="16">h</text>
</svg>

</div>
</div>

<v-clicks>

- Primo passo: un programma **semplice**, tutto nel `main`
- Poi lo miglioreremo un pezzo alla volta: **funzioni** → **struct** → **classe**
- A ogni passo ci chiederemo: *che problema stiamo risolvendo?*

</v-clicks>

<!--
Il problema resta sempre lo stesso per tutta la lezione: cambia solo il modo di organizzare il codice.
Chiedere agli studenti quali dati servono per descrivere un rettangolo prima di mostrarli.
-->

---

# Versione 1: tutto nel `main`

```cpp {all|6-7|9-12|14-15|17-18}
#include <iostream>
using namespace std;

int main()
{
    float base, altezza;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> altezza;

    area = base * altezza;
    perimetro = 2 * (base + altezza);

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```

<!--
Seguire il codice con i click: dichiarazione delle variabili, input, calcolo, output.
Funziona, ma cosa succede se i rettangoli diventano due? O dieci?
-->




---

# Versione <span v-if="$clicks < 4">2: i calcoli in una funzione</span><span v-else>3: la <code>struct</code> Rettangolo</span>

<div class="grid grid-cols-2 gap-4">
<div>

````md magic-move {at:1}
```cpp {all|4-7|9-12|4-12}
#include <iostream>
using namespace std;

float calcolaArea(float base, float altezza)
{
    return base * altezza;
}

float calcolaPerimetro(float base, float altezza)
{
    return 2 * (base + altezza);
}
```

```cpp {all|4-8|10-18}
#include <iostream>
using namespace std;

struct Rettangolo
{
    float base;
    float altezza;
};

float calcolaArea(Rettangolo r)
{
    return r.base * r.altezza;
}

float calcolaPerimetro(Rettangolo r)
{
    return 2 * (r.base + r.altezza);
}
```
````

<div v-if="$clicks === 3">

- Porto i calcoli fuori dal **main**
- Si scrivono **una volta**, si usano **quante volte vogliamo**

</div>

</div>
<div>

````md magic-move {at:3}
```cpp {all|11-12}
int main()
{
    float base, altezza;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> altezza;

    area = calcolaArea(base, altezza);
    perimetro = calcolaPerimetro(base, altezza);

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```

```cpp {all|3,7,9|11-12}
int main()
{
    Rettangolo r;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> r.base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> r.altezza;

    area = calcolaArea(r);
    perimetro = calcolaPerimetro(r);

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```
````

</div>
</div>

<!--
[click] calcolaArea
[click] calcolaPerimetro
[click] Definizione e chiamata. Le funzioni vanno scritte prima del main (o almeno dichiarate), altrimenti il compilatore non le conosce.
Il main ora dice COSA fare, le funzioni dicono COME farlo.
Domanda: base e altezza viaggiano sempre in coppia... e se le tenessimo insieme?

[click] Arriva la struct: il codice si trasforma.

[click] La struct definisce un nuovo tipo, Rettangolo, che raggruppa base e altezza. Nel main dichiariamo una variabile r di quel tipo e accediamo ai campi con il punto: r.base, r.altezza.

[click] Le funzioni ricevono un solo parametro, il rettangolo intero: non si possono più scambiare base e altezza per errore.
-->

---

# Dati da una parte, funzioni dall'altra

<div class="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-4 gap-y-6 mt-8 text-center">

<div class="row-span-2 border-2 border-blue-400 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60 mb-2">Dati · <code>struct</code></div>
  <div class="font-bold mb-2"><code>Rettangolo r</code></div>
  <div class="font-mono">base</div>
  <div class="font-mono">altezza</div>
</div>

<div v-click="1" class="text-2xl">→</div>
<div v-click="1" class="border-2 border-green-500 rounded-lg p-3 font-mono">calcolaArea(r)</div>
<div v-click="2" class="text-2xl">→</div>
<div v-click="2" class="font-mono">float area</div>

<div v-click="1" class="text-2xl">→</div>
<div v-click="1" class="border-2 border-green-500 rounded-lg p-3 font-mono">calcolaPerimetro(r)</div>
<div v-click="2" class="text-2xl">→</div>
<div v-click="2" class="font-mono">float perimetro</div>

</div>

<div class="mt-10">
<v-clicks :at="3">

- I **dati** del rettangolo stanno tutti insieme, dentro la `struct`
- Le **funzioni** ricevono il rettangolo e **restituiscono** un valore
- Per farlo usano **solo** ciò che c'è dentro `r`: `r.base` e `r.altezza`

</v-clicks>
</div>

<div v-click class="mt-6 text-center text-xl">

Ma allora… le funzioni **appartengono** al rettangolo? 🤔

</div>

<!--
A sinistra i dati: la struct contiene base e altezza.
[click] Le funzioni prendono il rettangolo come ingresso...
[click] ...e restituiscono un valore calcolato.
[click] I dati sono raggruppati.
[click] Ogni funzione produce un risultato.
[click] E non serve loro nient'altro che i campi della struct: dati e funzioni sono strettamente legati, ma nel codice sono separati.
[click] Domanda aperta per introdurre la classe: e se mettessimo le funzioni dentro la struttura, insieme ai dati?
-->

---

# Dalla `struct` alla classe

<div class="grid grid-cols-2 gap-6">
<div>

<div class="text-sm uppercase opacity-60 mb-1">Prima: <code>struct</code> + funzioni</div>

```cpp {all|1-5|7-15|9,14|7,12}
struct Rettangolo
{
    float base;
    float altezza;
};

float calcolaArea(Rettangolo r)
{
    return r.base * r.altezza;
}

float calcolaPerimetro(Rettangolo r)
{
    return 2 * (r.base + r.altezza);
}
```

</div>
<div>

<div class="text-sm uppercase opacity-60 mb-1">Dopo: <code>class</code></div>

````md magic-move {at:1}
```cpp
class Rettangolo
{
};
```

```cpp
class Rettangolo
{
public:
    float base;
    float altezza;
};
```

```cpp {all|9,14|7,12}
class Rettangolo
{
public:
    float base;
    float altezza;

    float calcolaArea()
    {
        return base * altezza;
    }

    float calcolaPerimetro()
    {
        return 2 * (base + altezza);
    }
};
```
````

</div>
</div>

<div v-click="5" class="mt-4">

- **attributi** = i dati
- **metodi** = le funzioni che lavorano su quei dati

</div>

<!--
La classe nasce vuota: c'è solo il nome.
[click] I dati della struct entrano nella classe: diventano gli attributi. public: per ora serve a poterli usare dal main come prima.
[click] Le funzioni entrano anche loro nella classe: diventano metodi.
[click] Dentro un metodo non serve più scrivere r.base: il metodo vede direttamente gli attributi dell'oggetto su cui è chiamato.
[click] Per lo stesso motivo il parametro Rettangolo r sparisce: il rettangolo è l'oggetto stesso.
[click] Riassunto: una classe tiene insieme dati (attributi) e funzioni (metodi).
-->

---

# Versione <span v-if="$clicks < 1">3: la <code>struct</code> Rettangolo</span><span v-else>4: la classe Rettangolo</span>

<div class="grid grid-cols-2 gap-4">
<div>

````md magic-move {at:1}
```cpp
#include <iostream>
using namespace std;

struct Rettangolo
{
    float base;
    float altezza;
};

float calcolaArea(Rettangolo r)
{
    return r.base * r.altezza;
}

float calcolaPerimetro(Rettangolo r)
{
    return 2 * (r.base + r.altezza);
}
```

```cpp
#include <iostream>
using namespace std;

class Rettangolo
{
public:
    float base;
    float altezza;

    float calcolaArea()
    {
        return base * altezza;
    }

    float calcolaPerimetro()
    {
        return 2 * (base + altezza);
    }
};
```
````

</div>
<div>

````md magic-move {at:2}
```cpp
int main()
{
    Rettangolo r;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> r.base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> r.altezza;

    area = calcolaArea(r);
    perimetro = calcolaPerimetro(r);

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```

```cpp {all|11-12|3}
int main()
{
    Rettangolo r;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> r.base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> r.altezza;

    area = r.calcolaArea();
    perimetro = r.calcolaPerimetro();

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```
````

</div>
</div>

<!--
Ripartiamo dal codice della versione 3: struct + funzioni a sinistra, main a destra.
[click] La struct e le funzioni lasciano il posto alla classe.
[click] Nel main cambiano solo le due chiamate.
[click] Non passiamo più r alla funzione: chiamiamo il metodo SU r, con il punto, come facciamo con gli attributi. "r, calcola la tua area".
[click] r non è più una semplice variabile struct: è un OGGETTO, un'istanza della classe Rettangolo. Tutto il resto del main è rimasto identico.
-->

---

# Riepilogo: cosa abbiamo fatto

<div class="grid grid-cols-4 gap-4 mt-8">

<div v-click class="border-2 border-gray-400 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Versione 1</div>
  <div class="font-bold text-lg mb-2">Tutto nel <code>main</code></div>
  <div class="text-sm">Variabili sciolte, calcoli scritti a mano</div>
  <div class="text-sm mt-3 opacity-70">⚠️ Codice da ripetere per ogni rettangolo</div>
</div>

<div v-click class="border-2 border-green-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Versione 2</div>
  <div class="font-bold text-lg mb-2">Funzioni</div>
  <div class="text-sm">I calcoli hanno un nome e si scrivono una volta sola</div>
  <div class="text-sm mt-3 opacity-70">⚠️ <code>base</code> e <code>altezza</code> viaggiano separate</div>
</div>

<div v-click class="border-2 border-blue-400 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Versione 3</div>
  <div class="font-bold text-lg mb-2"><code>struct</code></div>
  <div class="text-sm">I dati del rettangolo stanno insieme in un nuovo tipo</div>
  <div class="text-sm mt-3 opacity-70">⚠️ Dati e funzioni sono legati ma separati</div>
</div>

<div v-click class="border-2 border-purple-500 rounded-lg p-4">
  <div class="text-xs uppercase opacity-60">Versione 4</div>
  <div class="font-bold text-lg mb-2"><code>class</code></div>
  <div class="text-sm">Dati (<b>attributi</b>) e funzioni (<b>metodi</b>) nello stesso posto</div>
  <div class="text-sm mt-3 font-mono">r.calcolaArea()</div>
</div>

</div>

<div v-click class="mt-10 text-center text-xl">

Il problema è sempre lo stesso: è cambiato il modo di **organizzare** il codice

</div>

<!--
Ripercorrere le quattro versioni: per ognuna, cosa abbiamo introdotto e quale limite ci ha spinto al passo successivo.
[click] Versione 1: funziona, ma tutto è mescolato nel main.
[click] Versione 2: le funzioni danno un nome ai calcoli.
[click] Versione 3: la struct raggruppa i dati.
[click] Versione 4: la classe unisce dati e comportamento. L'oggetto "sa" calcolare la propria area.
[click] Messaggio finale: area e perimetro si calcolano sempre allo stesso modo, quello che è migliorato è l'organizzazione.
-->

---

# Una classe, tanti rettangoli

<div class="grid grid-cols-2 gap-6">
<div>

```cpp {all|3-5|7-9|11-12}
int main()
{
    Rettangolo r1;
    r1.base = 3;
    r1.altezza = 4;

    Rettangolo r2;
    r2.base = 5;
    r2.altezza = 2;

    cout << "Area r1: " << r1.calcolaArea() << endl;
    cout << "Area r2: " << r2.calcolaArea() << endl;

    return 0;
}
```

</div>
<div class="flex flex-col items-center text-center">

<div class="border-2 border-purple-500 rounded-lg px-6 py-3">
  <div class="text-xs uppercase opacity-60">Classe (lo stampo)</div>
  <div class="font-bold font-mono">Rettangolo</div>
  <div class="text-sm font-mono opacity-80">base · altezza · calcolaArea() · calcolaPerimetro()</div>
</div>

<div class="grid grid-cols-2 gap-6 mt-4 w-full">

<div v-click="1">
  <div class="text-2xl">↓</div>
  <div class="border-2 border-blue-400 rounded-lg p-3">
    <div class="text-xs uppercase opacity-60">Oggetto</div>
    <div class="font-bold font-mono">r1</div>
    <div class="font-mono text-sm">base = 3</div>
    <div class="font-mono text-sm">altezza = 4</div>
    <div v-click="3" class="font-mono text-sm mt-2 text-green-500">area → 12</div>
  </div>
</div>

<div v-click="2">
  <div class="text-2xl">↓</div>
  <div class="border-2 border-blue-400 rounded-lg p-3">
    <div class="text-xs uppercase opacity-60">Oggetto</div>
    <div class="font-bold font-mono">r2</div>
    <div class="font-mono text-sm">base = 5</div>
    <div class="font-mono text-sm">altezza = 2</div>
    <div v-click="3" class="font-mono text-sm mt-2 text-green-500">area → 10</div>
  </div>
</div>

</div>

<div v-click="4" class="mt-6">

La classe si scrive **una volta**, gli oggetti si creano **quante volte vogliamo**: ognuno ha i **propri** valori

</div>

</div>
</div>

<!--
La classe Rettangolo è quella della versione 4: non la riscriviamo, la usiamo.
[click] Creiamo un primo oggetto, r1, e gli diamo i suoi valori.
[click] Creiamo un secondo oggetto, r2: stessa classe, valori diversi. Cambiare r2 non tocca r1.
[click] Lo stesso metodo calcolaArea() dà risultati diversi: usa gli attributi dell'oggetto su cui viene chiamato.
[click] Classe = stampo, oggetti = i rettangoli concreti. Domanda: quanti rettangoli potrei creare? E se volessi un array di rettangoli?
-->

---

# E se la base fosse negativa?

<DemoRettangolo versione="public" />

<!--
Torniamo a un solo oggetto, con base e altezza lette da tastiera.
Usare "Passo" per eseguire il main riga per riga: la riga evidenziata è quella che il programma sta eseguendo.
Quando il programma chiede la base, far scrivere a uno studente -5 (o 0).
Il programma non si lamenta: calcola area e perimetro negativi e li stampa.
Domanda: di chi è la colpa? Chi dovrebbe impedire che un rettangolo abbia una base negativa?
Il problema è che base e altezza sono public: chiunque, dal main, può metterci qualsiasi valore.
-->

---

# Chi deve controllare i dati?

<div class="grid grid-cols-2 gap-8 mt-4">

<div v-click class="border-2 border-gray-400 rounded-lg p-4">

### A. Il `main`

```cpp
cin >> r.base;
if (r.base <= 0)
{
    cout << "Base non valida!" << endl;
    return 1;
}
```

<v-clicks>

- ❌ Va ripetuto per **ogni** rettangolo e **ogni** dato
- ❌ Basta **dimenticarlo una volta**
- ❌ Nessuno impedisce di scrivere `r.base = -5;` da un'altra parte

</v-clicks>

</div>

<div v-click class="border-2 border-purple-500 rounded-lg p-4">

### B. Il rettangolo stesso

<div class="text-center text-lg my-6">

È il rettangolo a sapere quali valori sono **validi** per lui

</div>

<v-clicks>

- ✅ Il controllo si scrive **una volta**, dentro la classe
- ✅ Vale per **tutti** gli oggetti
- ⚠️ Però dal `main` **nessuno** deve poter toccare `base` e `altezza` direttamente

</v-clicks>

</div>

</div>

<div v-click class="mt-6 text-center text-xl">

Serve un modo per **chiudere** i dati dentro la classe 🔒

</div>

<!--
Riprendere la domanda della demo: il programma ha accettato una base negativa. Chi doveva impedirlo?
[click] Prima idea, la più naturale: un if nel main dopo ogni cin.
[click] [click] [click] Problemi: si ripete, ci si dimentica, e comunque i dati restano modificabili da chiunque.
[click] Seconda idea: è il rettangolo a sapere cosa è valido per sé stesso.
[click] [click] Si scrive una volta e vale per tutti gli oggetti...
[click] ...ma funziona solo se nessuno può aggirare il controllo scrivendo direttamente r.base.
[click] Ci serve quindi un modo per proteggere i dati: è la parola chiave private.
-->

---

# I dati diventano `private`

<div class="grid grid-cols-2 gap-4">
<div>

````md magic-move {at:1}
```cpp
class Rettangolo
{
public:
    float base;
    float altezza;

    float calcolaArea()
    {
        return base * altezza;
    }

    float calcolaPerimetro()
    {
        return 2 * (base + altezza);
    }
};
```

```cpp {all|3-5|7-17}
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    float calcolaArea()
    {
        return base * altezza;
    }

    float calcolaPerimetro()
    {
        return 2 * (base + altezza);
    }
};
```
````

</div>
<div>

```cpp {all|7,9|11-12} {at:4}
int main()
{
    Rettangolo r;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> r.base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> r.altezza;

    area = r.calcolaArea();
    perimetro = r.calcolaPerimetro();

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```

</div>
</div>

<div v-click="[4, 5]" class="absolute bottom-6 left-14 right-14 rounded-lg p-3 font-mono text-sm bg-red-500/15 border-2 border-red-500">
❌ error: ‘float Rettangolo::base’ is private within this context
</div>

<div v-click="5" class="absolute bottom-6 left-14 right-14 rounded-lg p-3 text-sm bg-green-500/15 border-2 border-green-500">
✅ <code>r.calcolaArea()</code> e <code>r.calcolaPerimetro()</code> funzionano: i metodi sono <code>public</code>
</div>

<!--
[click] Dividiamo la classe in due parti.
[click] private: base e altezza si possono usare solo DENTRO la classe, cioè nei suoi metodi.
[click] public: i metodi restano accessibili da fuori, dal main.
[click] Il main di prima non compila più: cin >> r.base prova a scrivere un dato privato. È esattamente quello che volevamo: nessuno può più mettere -5 nella base.
[click] Invece r.calcolaArea() funziona: il metodo è public, e dentro la classe può leggere base e altezza.
Problema: adesso non riusciamo più nemmeno a dare un valore alla base! Serve una "porta controllata": i setter.
-->

---

# Setter: una porta controllata

<div class="grid grid-cols-2 gap-4" style="--slidev-code-font-size: 11px; --slidev-code-line-height: 16px">
<div>

````md magic-move {at:1}
```cpp
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    float calcolaArea()
    {
        return base * altezza;
    }

    float calcolaPerimetro()
    {
        return 2 * (base + altezza);
    }
};
```

```cpp {all|8-14|4,8-10|5,12-14}
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    void setBase(float b){
        base = b;
    }

    void setAltezza(float h){
        altezza = h;
    }

    float calcolaArea() { return base * altezza; }
    float calcolaPerimetro() { return 2 * (base + altezza); }
};
```

```cpp {all|8-10|8-14|8-22|all}
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    void setBase(float b){
        if(b>0){
            base = b;
        }else{
            base = 1; // Metto un valore di default
        }
    }

    void setAltezza(float h){
        if(h>0){
            altezza = h;
        }else{
            altezza = 1; // Metto un valore di default
        }
    }

    float calcolaArea() { return base * altezza; }
    float calcolaPerimetro() { return 2 * (base + altezza); }
};
```

```cpp {all|13,21|all}
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    void setBase(float b){
        if(b>0){
            base = b;
        }else{
            base = 1;
            cout << "Hai inserito una base negativa" << endl;
        }
    }
    void setAltezza(float h){
        if(h>0){
            altezza = h;
        }else{
            altezza = 1;
            cout << "Hai inserito un'altezza negativa" << endl;
        }
    }
    float calcolaArea() { return base * altezza; }
    float calcolaPerimetro() { return 2 * (base + altezza); }
};
```
````

</div>
<div>

````md magic-move {at:13}
```cpp
int main()
{
    Rettangolo r;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> r.base;
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> r.altezza;

    area = r.calcolaArea();
    perimetro = r.calcolaPerimetro();

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```

```cpp {all|4|7-9|10-12}
int main()
{
    Rettangolo r;
    float b, h;
    float area, perimetro;

    cout << "Inserisci la base del rettangolo: ";
    cin >> b;
    r.setBase(b);
    cout << "Inserisci l'altezza del rettangolo: ";
    cin >> h;
    r.setAltezza(h);

    area = r.calcolaArea();
    perimetro = r.calcolaPerimetro();

    cout << "Area: " << area << endl;
    cout << "Perimetro: " << perimetro << endl;

    return 0;
}
```
````

</div>
</div>

<!--
Partiamo dalla classe con i dati private: il main non compila più.
[click] Aggiungiamo dei metodi public che hanno il compito di scrivere negli attributi: si chiamano setter (dall'inglese "to set", impostare).
[click] setBase riceve il valore da mettere nella base...
[click] ...e lo copia nell'attributo base.
[click] setAltezza fa lo stesso per l'altezza. I calcoli sono rimasti uguali, li scriviamo su una riga sola.
[click] Così però il setter accetta qualsiasi valore: aggiungiamo un controllo.
[click] Se b è positivo lo copiamo nella base...
[click] ...altrimenti mettiamo un valore di default, così la base non è mai sbagliata.
[click] Stessa cosa per l'altezza.
[click] (classe completa)
[click] Aggiungiamo un messaggio per avvisare l'utente.
[click] Il setter decide da solo cosa fare con un valore non valido.
[click] (classe completa)
[click] Ora il main: non può più scrivere in r.base, quindi passa dai setter.
[click] Servono due variabili del main, b e h, dove leggere i valori scritti dall'utente.
[click] Leggiamo b e lo passiamo a setBase: il controllo lo fa la classe.
[click] Stessa cosa per l'altezza con setAltezza.
-->

---

# Riepilogo: i setter

<div class="grid grid-cols-2 gap-6 mt-2">
<div class="border-2 border-green-500 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60">Cosa sono</div>
  Metodi <code>public</code> che <b>scrivono</b> un attributo <code>private</code>
</div>
<div class="border-2 border-green-500 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60">A cosa servono</div>
  <b>Controllano</b> il valore prima di salvarlo: l'oggetto ha sempre dati <b>validi</b>
</div>
</div>

<div class="grid grid-cols-2 gap-6 mt-6">
<div>

```cpp {all|1|2-3|4-7} {at:1}
void setBase(float b){
    if(b>0){
        base = b;
    }else{
        base = 1;
        cout << "Hai inserito una base negativa" << endl;
    }
}
```

</div>
<div>

<v-clicks :at="1">

- Si chiama **`set` + nome dell'attributo** e riceve il **nuovo valore** come parametro
- Se il valore è **valido**, lo copia nell'attributo
- Altrimenti decide la classe: **valore di default** e avviso

</v-clicks>

</div>
</div>

<div v-click="4" class="mt-6 text-center">

Dal `main`: &nbsp; ❌ `cin >> r.base;` &nbsp; → &nbsp; ✅ `cin >> b;` `r.setBase(b);`

</div>

<!--
Fermiamoci a riassumere cosa sono i setter prima di passare ai getter.
I setter sono l'unico modo, dal main, per scrivere negli attributi private.
[click] Convenzione sul nome: setBase, setAltezza. Il parametro è il valore che vorremmo assegnare.
[click] Se il valore va bene, viene salvato.
[click] Se non va bene, è la classe a decidere cosa fare: il main non deve preoccuparsene.
[click] Nel main non si scrive più direttamente nell'attributo: si legge in una variabile e la si passa al setter.
-->

---

# Getter: leggere senza toccare

<div class="grid grid-cols-2 gap-6">
<div>

```cpp {all|10-11}
class Rettangolo
{
private:
    float base;
    float altezza;

public:
    // setBase e setAltezza come prima

    float getBase() { return base; }
    float getAltezza() { return altezza; }

    // calcolaArea e calcolaPerimetro come prima
};
```

</div>
<div>

<div v-click="2">

Dal `main`:

```cpp
cout << r.base;        // ❌ errore: base è private
cout << r.getBase();   // ✅ restituisce il valore
```

</div>

<div v-click="3" class="mt-6">

| Metodo | Cosa fa |
|---|---|
| `setBase(b)` | **scrive** la base, dopo averla controllata |
| `getBase()` | **legge** la base, senza modificarla |

</div>

</div>
</div>

<!--
Con i dati private non possiamo nemmeno leggerli dal main.
[click] Aggiungiamo i getter (da "to get", ottenere): restituiscono il valore di un attributo.
[click] r.base non compila neanche in lettura, r.getBase() sì.
[click] Convenzione: set + NomeAttributo per scrivere, get + NomeAttributo per leggere. Il getter non riceve parametri e non modifica nulla.
Domanda: se un attributo ha il getter ma non il setter, cosa succede? (si può leggere ma non modificare da fuori)
-->

---

# Riproviamo con la base negativa

<DemoRettangolo versione="setter" />

<!--
Stesso esperimento di prima, ma ora base e altezza sono private e passano da setBase / setAltezza.
Far scrivere di nuovo -5: b vale -5, ma setBase lo rifiuta, avvisa l'utente e mette in r.base il valore di default 1.
Rifare la prova con un valore valido: solo allora r.base prende il valore scritto.
Notare la differenza tra b (variabile del main, può valere qualsiasi cosa) e r.base (attributo privato, sempre valido).
-->

---

# Riepilogo: `public`, `private` e incapsulamento

<div class="grid grid-cols-[auto_auto_1fr] items-center gap-6 mt-4">

<div class="border-2 border-gray-400 rounded-lg p-4 text-center">
  <div class="text-xs uppercase opacity-60">Fuori dalla classe</div>
  <div class="font-mono font-bold">main</div>
</div>

<div class="flex flex-col gap-3 text-center font-mono text-sm">
  <div class="text-green-500">── ✅ metodi ──▶</div>
  <div class="text-red-500 line-through">──── r.base ───▶</div>
</div>

<div class="border-2 border-purple-500 rounded-lg p-3">
  <div class="text-xs uppercase opacity-60 mb-2">Oggetto <span class="normal-case font-mono">r</span></div>
  <div class="flex flex-wrap gap-2 mb-3">
    <span v-for="m in ['setBase()', 'setAltezza()', 'getBase()', 'getAltezza()', 'calcolaArea()', 'calcolaPerimetro()']" :key="m" class="font-mono text-xs border border-green-500 rounded px-2 py-1">{{ m }}</span>
  </div>
  <div class="border-2 border-dashed border-red-400 rounded-lg p-2 text-center">
    <div class="text-xs uppercase opacity-60">🔒 private</div>
    <div class="font-mono">base · altezza</div>
  </div>
</div>

</div>

<v-clicks>

- **`private`**: si usa solo **dentro** la classe → gli attributi
- **`public`**: si usa anche **da fuori**, per esempio dal `main` → i metodi
- I **setter** controllano i valori prima di scriverli, i **getter** li leggono
- **Incapsulamento**: i dati sono chiusi dentro l'oggetto e si raggiungono solo attraverso i suoi metodi

</v-clicks>

<!--
Lo schema: il main può usare solo i metodi public (in verde); l'accesso diretto agli attributi è bloccato.
[click] private: gli attributi.
[click] public: i metodi, cioè quello che l'oggetto offre a chi lo usa.
[click] setter e getter sono le "porte controllate" verso i dati.
[click] Il nome di questo principio è incapsulamento. Vantaggio: un oggetto Rettangolo è sempre in uno stato valido, chiunque lo usi.
Problema rimasto: subito dopo "Rettangolo r;" base e altezza non hanno ancora un valore (i "?" nella demo). Lo risolverà il costruttore.
-->
