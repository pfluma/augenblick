// All on-screen text. Headlines are arrays: one entry = one line, so you decide the breaks.
// Tone: du-form, warm, short, honest. No store badges, numbers, testimonials or promises
// the app does not keep.

export const copy = {
  hook: {
    words: ['Swipen.', 'Swipen.', 'Swipen.'],
    question: ['Und wann triffst du', 'endlich jemanden?'],
  },
  intro: {
    headline: ['Für alle Momente,', 'die fast was', 'geworden wären.'],
    sub: 'Eine App, die Menschen offline zusammenbringt.',
  },
  moment: {
    label: 'Augenblicke',
    headline: ['Du hast jemanden', 'gesehen und', 'nichts gesagt?'],
    sub: 'Halte den Moment fest: nachträglich, mit Ort und ungefährer Zeit.',
  },
  resonance: {
    headline: ['Wenn zwei dasselbe', 'erzählen, finden', 'sie sich.'],
    sub: 'Vorher sieht niemand einen Namen.',
    // the two notes (illustration, not app UI)
    place: 'Café Landtmann · nachmittags',
    pink: '„Am Nebentisch, mit der Zeitung. Ich hätte so gern gefragt.“',
    blue: '„Die Person mit der Zeitung am Nebentisch. Ich hab mich nicht getraut.“',
    hidden: 'Name erst, wenn beide Ja sagen',
    overlap: 'Resonanz',
  },
  table: {
    label: 'Ein Platz am Tisch',
    headline: ['Ein Stuhl ist frei?', 'Setz dich dazu.'],
    sub: 'Offene Runden und Events an echten Orten. Kein Match nötig.',
  },
  safety: {
    label: 'Schutz',
    headline: ['Sicherheit ist', 'eingebaut.'],
    sub: 'Wer was sehen darf, regelt die Datenbank selbst.',
    tag: 'Serverseitig durchgesetzt',
  },
  connect: {
    label: 'Verbinden',
    headline: ['Kontakt erst beim', 'echten Treffen.'],
    sub: 'Per QR-Code, wenn ihr euch gegenübersteht.',
  },
  closing: {
    tagline: ['Weniger swipen.', 'Mehr erleben.'],
    soon: 'Bald in Wien.',
    url: 'pfluma.github.io/augenblick',
  },
} as const;
