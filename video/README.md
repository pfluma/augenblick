# Augenblick – Produktvideo (Remotion)

9:16 · 1080×1920 · 60 fps · 34,3 s · ohne Ton · Ergebnis: `out/augenblick.mp4`

> Dieser Ordner liegt nur auf dem Branch `ccr-dc9daf8e-yuqab9`. `main` ist die öffentliche Website.

## Storyboard

| # | Szene | Dauer | Was man sieht | Text | Übergang |
|---|---|---|---|---|---|
| 1 | Hook | 3,9 s | Neutrale Profilkarten (Silhouetten) werden weggeswipt, immer schneller | „Swipen. Swipen. Swipen.“ / auf Pink: „Und wann triffst du endlich jemanden?“ | Die letzte Karte dreht sich hochkant weg (0–90°), das Handy dreht weiter (Rückseite, dann Vorderseite): eine 360°-Drehung. |
| 2 | Intro | 2,8 s | Handy mit dem echten Screen „Verpasste Begegnungen“, Logo | „Für alle Momente, die fast was geworden wären.“ / „Eine App, die Menschen offline zusammenbringt.“ | Der nächste Screen blendet weich über, das Handy steht still. |
| 3 | Augenblicke | 6,1 s | „Augenblick festhalten“: erst Ortswahl (Café Landtmann), nach einer Überblendung „Was ist passiert?“. Das Textfeld zoomt vergrößert aus dem Screen. | „Du hast jemanden gesehen und nichts gesagt?“ / „Halte den Moment fest: nachträglich, mit Ort und ungefährer Zeit.“ | Das Handy fährt nach unten aus dem Bild. |
| 4 | Resonanz | 3,8 s | Zwei Zettel, pink und blau (zwei Menschen, derselbe Moment), schieben sich übereinander. Die Überlappung wird violett: „Resonanz“. | „Wenn zwei dasselbe erzählen, finden sie sich.“ / „Vorher sieht niemand einen Namen.“ | Die Zettel gehen, das Handy kommt von unten zurück. |
| 5 | Ein Platz am Tisch | 5,0 s | Screen „Ein Platz am Tisch“, die Karte „Ich sitz allein …“ zoomt heraus, danach die Events-Liste | „Ein Stuhl ist frei? Setz dich dazu.“ / „Offene Runden und Events an echten Orten. Kein Match nötig.“ | Überblendung zur Events-Liste, dann eine 360°-Drehung zum Schutz-Screen. |
| 6 | Schutz | 4,7 s | Screen „Tisch öffnen“. Der Ausschnitt „Wer darf anfragen? Alle / Nur Frauen“ zoomt heraus, dazu „Serverseitig durchgesetzt“. | „Sicherheit ist eingebaut.“ / „Wer was sehen darf, regelt die Datenbank selbst.“ | Ausschnitt sinkt zurück, Überblendung. |
| 7 | Verbinden | 3,9 s | Screen „Verbinden“, der QR-Code zoomt heraus | „Kontakt erst beim echten Treffen.“ / „Per QR-Code, wenn ihr euch gegenübersteht.“ | Das Handy fährt nach unten weg. |
| 8 | Schluss | 4,2 s | Blauer und pinker Kreis treffen sich, die Überlappung wird violett: das Logo. Dann Wortmarke und Claim. Etwa 1,5 s stehendes Endbild. | „Weniger swipen.“ / auf Pink: „Mehr erleben.“ · Augenblick · „Bald in Wien.“ · pfluma.github.io/augenblick | – |

## Design „Überdruck“

- **Farben:** Pink `#FF48B0` = Augenblick, Blau `#0078BF` = Struktur/Tisch. Violett `#5A3BA3` nur dort, wo sich Pink und Blau überlagern (Zettel-Überlappung, Logo). Tinte `#16244A` für Text, Papier `#F4F4F2` als Grund. Auf Pink steht immer Tinte.
- **Zooms:** Die wichtige Stelle jedes Feature-Screens (Bereich in `details` in `src/config/assets.ts`) wächst sanft von ihrer Position im Handy auf 1,75-fache Größe, das Handy dahinter wird leicht abgeblendet. So bleibt das Handy immer ganz im Bild, außer es fährt bewusst hinaus (Resonanz, Schluss).
- **Bewegung (CSS 3D):** Das Handy steht in allen Szenen exakt an derselben Stelle (`POSE` in `src/poses.ts`). Im ganzen Video gibt es nur zwei 360°-Drehungen um die senkrechte Achse, jeweils als eine einzige weiche Kurve: die Hook-Karte, die zum Handy wird (`HOOK_SPIN`), und der Wechsel Events → Schutz (`spins`). Dabei geht das Handy kurz auf etwa 95 % zurück, der Schatten wird schmal, wenn es seitlich steht, und der neue Screenshot wird genau bei 180° getauscht, wenn nur die Rückseite (Tinte mit kleinem Logo) zu sehen ist. Nur während dieser Drehungen gibt es Bewegungsunschärfe (`@remotion/motion-blur`, 6 Samples). Alle anderen Screen-Wechsel sind weiche Überblendungen von 0,4 s (`fades`, `FADE`), bei denen sich das Handy nicht bewegt. Texte bewegen sich während einer Drehung oder Überblendung nie. Die Zoom-Karten neigen sich beim Heraustreten nach vorne und liegen flach, sobald sie lesbar sind. Die Zettel fliegen gekippt aufeinander zu und sind flach, bevor sie sich überlagern. Perspektive, Kante, Rückseite, Schatten und Spiegelung stehen in `src/components/Phone.tsx`.
- **Textur:** leichte Papierkörnung im Hintergrund und Rasterpunkte auf den Zetteln. Die Körnung liegt *unter* dem Handy, die Screenshots bleiben unverändert.
- Alles in `src/config/brand.ts`.

## Screenshots (Quellen)

Alle Screens im Video sind echte, unveränderte Screenshots der App. Sie wurden nur skaliert und im Handy-Rahmen beschnitten.

| Im Video | Datei | Quelle |
|---|---|---|
| Intro | `public/screenshots/phone/02-augenblicke.jpg` | Android-Handy, App `de.augenblick.app`, 06.10.2026 |
| Augenblicke 1 | `public/screenshots/web/03-augenblick-festhalten-ort-und-zeit.png` | Web-Build der App |
| Augenblicke 2 | `public/screenshots/web/04-augenblick-festhalten-text.png` | Web-Build der App |
| Tisch | `public/screenshots/phone/04-am-tisch.jpg` | Android-Handy |
| Events | `public/screenshots/phone/09-events-liste.jpg` | Android-Handy |
| Schutz | `public/screenshots/phone/06-tisch-oeffnen-schutz.jpg` | Android-Handy |
| Verbinden | `public/screenshots/phone/07-verbinden.jpg` | Android-Handy |

- **Handy-Fotos (`phone/`):** Die Android-Statusleiste wird gleichmäßig abgeschnitten (oberste 4,4 % des Bildes, `STATUS_BAR` in `src/config/assets.ts`). Danach füllt das Bild die Bildschirmhöhe. Links und rechts fallen dabei je etwa 1,3 % weg.
- **Web-PNGs (`web/`):** Sie haben keine Statusleiste, beginnen unter der Kamera-Insel und werden unten beschnitten.
- Die übrigen Dateien in `public/screenshots/` (Anmelden, Sicherheits-Check, Melden, Event starten, Plakat malen, Website-Plakatwerkstatt) sind vorhanden, werden aber nicht verwendet.
- Die Zettel in Szene 4 sind eine Illustration, keine App-Oberfläche. Ihr Text paraphrasiert das Beispiel aus dem Screenshot „Was ist passiert?“.

## Schriften (beide SIL Open Font License 1.1, lokal eingebunden)

- **Bricolage Grotesque Condensed ExtraBold** für Überschriften und Wortmarke: `public/fonts/BricolageGrotesqueCondensed-ExtraBold.ttf`, Lizenz in `public/fonts/OFL-BricolageGrotesque.txt`.
- **Figtree** (400/500/600/700, latin) für Fließtext: `public/fonts/figtree-latin-*.woff2` aus dem npm-Paket `@fontsource/figtree` 5.3.0, Lizenz in `public/fonts/OFL-Figtree.txt`.

## Bedienung

```bash
npm install
npm run studio   # Vorschau im Browser
npm run render   # → out/augenblick.mp4
node scripts/stills.mjs 120 300 600   # einzelne Frames → out/stills/
```

Rendern dauert auf 4 CPU-Kernen etwa 13 Minuten (gemessen: 772 s; 60 fps und Bewegungsunschärfe während der Drehungen).

Ohne eigenen Remotion-Browser kannst du einen lokalen Chrome Headless Shell angeben: `REMOTION_BROWSER=/pfad/zu/headless_shell`.

## Was wo geändert wird

- **Texte:** `src/config/copy.ts`. Ein Array-Eintrag in einer Headline ist eine Zeile.
- **Farben, Schriften, Logo:** `src/config/brand.ts`
- **Screenshots:** `src/config/assets.ts` (`shots`: Datei und Art, `details`: der gezoomte Bereich pro Szene). Wann welcher Screen erscheint und wann gezoomt wird, steht in `screenTimeline` und `zooms` in `src/components/PhoneLayer.tsx`.
- **Dauer:** `src/config/timing.ts`, `durations` in Einheiten von 1/30 s (30 = 1 s), unabhängig von der Bildrate. Gerendert wird mit `FPS` = 60. Spätere Szenen verschieben sich automatisch. `scripts/stills.mjs` erwartet Frame-Nummern bei 60 fps.
- **Bildausschnitt des Handys:** `src/poses.ts`. Faustregeln: Die Oberkante des Handys bleibt bei y ≥ 620, damit es nicht mit den Headlines kollidiert, und das Handy bleibt ganz im Bild.

## Aufbau

```
src/
  config/      brand · copy · assets · timing        ← alles Editierbare
  components/  Phone, PhoneLayer (ein durchgehendes Handy + Kamerafahrten), Screenshot,
               TextBlock, Logo, Icon, Background (Papier, Körnung, Rasterpunkte)
  scenes/      Hook, TextScenes, Resonance, DetailZoom, Closing
  Video.tsx    Ebenen- und Szenenreihenfolge
```
