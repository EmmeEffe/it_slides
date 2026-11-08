// Compila tutte le presentazioni (cartelle cl<N>/<argomento>/slides.md) in dist/,
// esporta ciascuna anche in PDF e crea dist/index.html con l'elenco.
// Con `npm run build -- --senza-pdf` salta l'esportazione PDF (più veloce in locale).

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const radice = resolve(import.meta.dirname, '..')
const dist = join(radice, 'dist')

// su GitHub Actions il sito è pubblicato in /<nome-repo>/
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'presentazioni'

const conPdf = !process.argv.includes('--senza-pdf')
// nome che Slidev dà al PDF esportato con --download
const filePdf = 'slidev-exported.pdf'

const sottocartelle = dir => readdirSync(dir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort()

function titolo(file) {
  const intestazione = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/)
  const riga = intestazione?.[1].match(/^title:\s*(.+)$/m)
  return riga ? riga[1].trim().replace(/^['"]|['"]$/g, '') : null
}

const classi = sottocartelle(radice)
  .filter(nome => /^cl\d+$/.test(nome))
  .map(classe => ({
    classe,
    presentazioni: sottocartelle(join(radice, classe))
      .filter(argomento => existsSync(join(radice, classe, argomento, 'slides.md')))
      .map(argomento => ({
        cartella: `${classe}/${argomento}`,
        argomento,
        titolo: titolo(join(radice, classe, argomento, 'slides.md')) ?? argomento,
      })),
  }))
  .filter(c => c.presentazioni.length > 0)

rmSync(dist, { recursive: true, force: true })

for (const { presentazioni } of classi) {
  for (const { cartella } of presentazioni) {
    console.log(`\n▶ ${cartella}`)
    execFileSync('npx', [
      'slidev',
      'build',
      join(cartella, 'slides.md'),
      '--base',
      `/${repo}/${cartella}/`,
      '--out',
      join(dist, cartella),
      // esporta il PDF nella cartella della presentazione e mostra il pulsante di download;
      // --with-clicks crea una pagina per ogni click (animazioni ed evidenziazioni del codice)
      ...(conPdf ? ['--download', '--with-clicks'] : []),
    ], { cwd: radice, stdio: 'inherit' })
  }
}

const sezioni = classi.map(({ classe, presentazioni }) => `
    <section>
      <h2>Classe ${classe.slice(2)}ª</h2>
      <ul>
${presentazioni.map(p => `        <li><a href="${p.cartella}/">${p.titolo}</a>${conPdf ? ` <a class="pdf" href="${p.cartella}/${filePdf}" download="${p.argomento}.pdf">PDF</a>` : ''}</li>`).join('\n')}
      </ul>
    </section>`).join('\n')

writeFileSync(join(dist, 'index.html'), `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Presentazioni</title>
  <style>
    :root { color-scheme: light dark; --testo: #1f2937; --sfondo: #fafafa; --link: #2563eb; --bordo: #e5e7eb; }
    @media (prefers-color-scheme: dark) {
      :root { --testo: #e5e7eb; --sfondo: #121212; --link: #60a5fa; --bordo: #2a2a2a; }
    }
    body { margin: 0; background: var(--sfondo); color: var(--testo); font: 17px/1.6 system-ui, sans-serif; }
    main { max-width: 40rem; margin: 0 auto; padding: 3rem 1rem; }
    h1 { margin: 0 0 2rem; }
    h2 { font-size: 1.1rem; border-bottom: 1px solid var(--bordo); padding-bottom: 0.3rem; }
    ul { padding-left: 1.2rem; }
    a { color: var(--link); text-decoration: none; }
    a:hover { text-decoration: underline; }
    a.pdf { margin-left: 0.5rem; padding: 0 0.4rem; border: 1px solid var(--bordo); border-radius: 4px; font-size: 0.8rem; }
  </style>
</head>
<body>
  <main>
    <h1>Presentazioni</h1>
${sezioni}
  </main>
</body>
</html>
`)

console.log(`\n✓ Presentazioni compilate in dist/: ${classi.flatMap(c => c.presentazioni).length}`)
