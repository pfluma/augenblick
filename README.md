# augenblick

Website (statisch, ohne Build) mit Landingpage, Warteliste und Rechtstexten.

## Sprachen (DE | EN)

- `assets/lang.js` wählt die Sprache: gespeicherte Wahl (localStorage) > Browsersprache (`de*` = Deutsch, sonst Englisch). Kein Cookie, keine Fremdressource.
- `assets/lang.css` blendet die jeweils andere Sprache aus und stylt den Umschalter.
- Jeder Text steht zweimal im HTML: `data-lang="de"` / `data-lang="en"`. Titel, Meta-Description, Platzhalter und `<option>` tragen die englische Fassung in `data-en`, `data-en-placeholder`, `data-en-aria-label`.
- Neue Seite: `<link rel="stylesheet" href="assets/lang.css">` und `<script src="assets/lang.js"></script>` in den `<head>`, den Umschalter-Block aus einer bestehenden Seite in den Header übernehmen.
- Die deutsche Fassung der Rechtstexte ist maßgeblich; die englische ist eine Übersetzung zur Orientierung.
