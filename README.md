<div align='center'>
 <img src="./src/assets/logo-tak-transparent.webp" alt="Trondheim Atletklubb Logo"/>
</div>

# Trondheim Atletklubb Nettsiden

[Besøk nettsiden](atletklubben.no)

## Summary

Denne nettsiden gir informasjon om Trondheim Atletklubb. Fase én viser:

- En navigasjonslinje
- En hoveddel for å formidle hva klubben handler om i én visning
- En tjenestedel
- En Om-del
- En kontaktdel med et Google-kart som er klikkbart for veibeskrivelse.
- Bunntekst

## Tech Stack

- Vite/ReactJS
- Sass
- Github-sider

## Testing

Prosjektet har to typer tester:

### Komponent-tester (Vitest)
Tester individuelle React-komponenter:

```bash
# Kjør tester i watch-modus
yarn test:unit

# Kjør tester én gang
yarn test:unit:run

# Kjør tester med UI
yarn test:unit:ui
```

### Visuell regresjonstesting (Playwright)
Tester at UI-et ser riktig ut på tvers av nettlesere:

```bash
# Kjør alle visuelle tester
yarn test

# Kjør tester med synlig nettleser
yarn test:headed

# Kjør tester med UI
yarn test:ui

# Oppdater snapshots etter endringer
yarn test --update-snapshots
```

**Merk:** Når du endrer styling eller layout, må du oppdatere snapshots ved å kjøre `yarn test --update-snapshots` for å unngå at testene feiler.
