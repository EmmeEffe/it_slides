# Presentazioni

Presentazioni [Slidev](https://sli.dev) per le mie classi, pubblicate su GitHub Pages.

## Struttura

Ogni presentazione è una cartella `cl<classe>/<argomento>/` con dentro `slides.md`
(e `components/` se usa componenti Vue):

```
cl4/
  classi/
    slides.md
    components/
```

## Comandi

- `npm install` — la prima volta
- `npm run dev cl4/classi/slides.md` — apre una presentazione in locale (http://localhost:3030)
- `npm run build` — compila tutte le presentazioni, i relativi PDF e l'indice in `dist/`
  (la prima volta serve `npx playwright install chromium`; con `npm run build -- --senza-pdf`
  salta i PDF)

## Nuova presentazione

1. Crea la cartella, es. `cl4/ereditarieta/slides.md`
2. Nell'intestazione metti almeno `title:` (è il nome che compare nell'indice) e `routerMode: hash`
3. Fai push su `main`: GitHub Actions la pubblica da sola, assieme al PDF
   (scaricabile dall'indice e dal pulsante di download nelle slide)
