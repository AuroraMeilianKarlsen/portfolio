# Portfolio

En moderne portfolio-side bygget med Next.js, React og Tailwind CSS.

## Teknologier

- [Next.js 15](https://nextjs.org/) - React-rammeverket
- [React 19](https://react.dev/) - UI-bibliotek
- [Tailwind CSS](https://tailwindcss.com/) - CSS-rammeverk
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [GSAP](https://gsap.com/) - Animationsbibliotek
- [Prettier](https://prettier.io/) - Code formatter
- [ESLint](https://eslint.org/) - Code linter

## For å besøke nettsiden:

https://auroramk-portfolio.vercel.app/

## For å kjøre lokalt:

Første gang, installer avhengighetene:

```bash
npm install
```

Kjør utviklingsserveren:

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren for å se resultatet.

## Scripts

- `npm run dev` - Starter utviklingsserveren
- `npm run build` - Bygger produksjon-klargjort versjon
- `npm start` - Starter produksjonsserveren
- `npm run lint` - Kjører ESLint for å finne feil og problemer
- `npm run format` - Formaterer alle filer med Prettier
- `npm run format:check` - Sjekker om filer trenger formatering uten å endre dem

## Bygg for produksjon

```bash
npm run build
npm start
```

## Code Quality

Prosjektet bruker både ESLint og Prettier for å sikre konsistent kodekvalitet:

- **ESLint**: Sjekker for feil og problemer i koden
- **Prettier**: Formaterer koden automatisk for konsistent styling

Kjør `npm run format` før du committer endringer for å sikre konsistent formatering.
