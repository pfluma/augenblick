# Augenblick – Produktvideo (Remotion)

9:16 · 1080×1920 · 30 fps · ca. 25 s · Ergebnis: `out/augenblick.mp4`

## Storyboard

| # | Szene | Was man sieht | Was man verstehen soll | Text | Dauer | Übergang |
|---|---|---|---|---|---|---|
| 1 | Hook | Profilkarten fliegen nach links/rechts weg, immer schneller. Zu jedem Swipe erscheint ein „Swipen.“ | Endloses Swipen bringt dich nicht weiter. | „Swipen. Swipen. Swipen.“ / „Und wann triffst du endlich jemanden?“ | 3,3 s | Die letzte Karte bleibt stehen und wird zum Handy-Bildschirm. |
| 2 | Produkt | Ganzes Handy, Event-Liste „Diese Woche in Wien“, Logo + Wortmarke | Augenblick ist eine App, die dich zu echten Treffen bringt. | „Die App für echte Begegnungen.“ / „Für alle, die Menschen lieber in echt kennenlernen.“ | 3,3 s | Die Kamera zoomt auf die erste Event-Karte. |
| 3 | Feature 1: Events | Nahaufnahme. Antippen der Karte öffnet das Event: runder Tisch mit freien Plätzen, „Ich bin dabei“ → „Du bist dabei“, ein Platz füllt sich | Events und kleine Runden statt Feed. Mitmachen ist ein Tipp. | „01 — Events & Treffen“ / „Echte Treffen statt Endlos-Feed.“ / „Kleine Runden für Leute, die noch niemanden kennen.“ | 4,6 s | Die Kamera zieht zurück, der Schutz-Bildschirm schiebt sich herein. |
| 4 | Feature 2: Schutz | Ganzes Handy mit den Schutz-Einstellungen. Die Zeile „Nur Frauen“ hebt sich als große Karte heraus, der Schalter geht an, darunter das Label „Serverseitig durchgesetzt“ | Schutz ist kein optionaler Schalter, die Datenbank setzt ihn durch. | „02 — Schutz für alle“ / „Sicherheit ist eingebaut.“ / „Wer was sehen darf, regelt die Datenbank selbst – nicht nur ein Schalter in der App.“ | 5,0 s | Die Karte gleitet zurück ins Handy, das Handy rückt nach rechts. |
| 5 | Feature 3: Orte | Weitere Einstellung: Straßennetz zeichnet sich über das ganze Bild, Handy mit Karte, Pin und dem Partnerort „Café Feder“, Text links | Treffen finden an echten Orten statt, bei Partnerlokalen. | „03 — Partnerorte“ / „An echten Orten.“ / „Partnerlokale halten Tische für offene Runden frei.“ | 4,2 s | Das Handy verlässt das Bild nach unten, die Karte verblasst. |
| 6 | Abschluss | Zwei Kreise (zwei Menschen) treffen sich und bilden das Logo, dann Wortmarke und Claim. Ruhiges Endbild. | Marke + Botschaft. | „Weniger swipen. Mehr erleben.“ · Augenblick | 4,6 s (ca. 2,3 s stehendes Endbild) | – |

Durchgehendes Motiv: Im Hintergrund nähern sich ein blauer und ein pinker Lichtkreis über den ganzen Film langsam an. Am Ende werden sie zum Logo.

## Annahmen

- **Marke:** Farben („Papier & Tinte“), die Plakatschrift (Bricolage Grotesque Condensed ExtraBold) und das Zwei-Kreise-Logo stammen von der bestehenden Website im Repo (`../index.html`). Für Fließtext wird Inter verwendet. Beide Schriften liegen lokal in `public/fonts` und stehen unter der OFL-Lizenz.
- **UI:** Die vereinfachten Screens sind nachgebaut. „Café Feder“, „Gasthaus Lindengrün“ und die Event-Daten sind erfunden und dienen nur als Platzhalter.
- **Texte:** Die Aussagen zur Sicherheit halten sich an die Formulierungen aus Datenschutzerklärung und Nutzungsbedingungen („erzwingt die Datenbank selbst, nicht nur die App“). Bewusst gibt es keine Garantie-Aussage, weil „Nur Frauen“ laut den Nutzungsbedingungen auf Selbstauskunft beruht. Es gibt keinen Store-Badge, keine Zahlen und keine Nutzerstimmen.

## Bedienung

```bash
npm install
npm run studio   # Vorschau im Browser (Remotion Studio)
npm run render   # → out/augenblick.mp4
node scripts/stills.mjs 120 300 600   # einzelne Frames → out/stills/
```

Falls Remotion keinen eigenen Browser herunterladen kann, gib mit `REMOTION_BROWSER=/pfad/zu/chrome-headless-shell` einen lokalen an.

## Was wo geändert wird

- **Texte:** `src/config/copy.ts`. `copy` enthält die Headlines (ein Array-Eintrag = eine Zeile, so legst du die Umbrüche selbst fest), `ui` die Inhalte der Handy-Screens.
- **Farben, Schriften, Logo:** `src/config/brand.ts`. `colors` sind die Farbtokens, `fontFiles` die Schriftdateien, `logo` die drei Logofarben.
- **Echte Screenshots und Logo:** Dateien nach `public/screenshots/` legen und den Pfad in `src/config/assets.ts` eintragen, z. B. `eventList: 'screenshots/event-list.png'`. Das Handy zeigt dann den Screenshot statt des Mock-Screens (Seitenverhältnis ca. 9:19,5). `logoFile` ersetzt das gezeichnete Logo.
- **Dauer:** `src/config/timing.ts`, `durations` in Frames (30 = 1 s). Alle späteren Szenen verschieben sich automatisch. Momente innerhalb der Szenen (Antippen, Schalter, Pin) sind relativ zum Szenenbeginn in `src/components/PhoneLayer.tsx` (`beats`) definiert.
- **Bildausschnitt des Handys:** `src/poses.ts`, Position und Skalierung pro Szene.

## Aufbau

```
src/
  config/      brand.ts · copy.ts · assets.ts · timing.ts   ← alles Editierbare
  components/  Phone, PhoneLayer (ein durchgehendes Handy + Kamerafahrten), TextBlock, Logo, Icon, Background
  screens/     EventList, EventDetail, Safety, Place (Mock-UI)
  scenes/      Hook, TextScenes, SafetyCallout, PlacesMap, Closing
  Video.tsx    Ebenen- und Szenenreihenfolge
```
