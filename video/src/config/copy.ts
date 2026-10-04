// All on-screen text lives here. Line breaks in headlines are explicit (arrays),
// so you control exactly where a line wraps.

export const copy = {
  hook: {
    words: ['Swipen.', 'Swipen.', 'Swipen.'],
    question: ['Und wann triffst du', 'endlich jemanden?'],
  },
  intro: {
    headline: ['Die App für echte', 'Begegnungen.'],
    sub: 'Für alle, die Menschen lieber in echt kennenlernen.',
  },
  events: {
    label: '01 — Events & Treffen',
    headline: ['Echte Treffen statt', 'Endlos-Feed.'],
    sub: 'Kleine Runden für Leute, die noch niemanden kennen.',
  },
  safety: {
    label: '02 — Schutz für alle',
    headline: ['Sicherheit ist', 'eingebaut.'],
    sub: 'Wer was sehen darf, regelt die Datenbank selbst – nicht nur ein Schalter in der App.',
    tag: 'Serverseitig durchgesetzt',
  },
  places: {
    label: '03 — Partnerorte',
    headline: ['An echten', 'Orten.'],
    sub: 'Partnerlokale halten Tische für offene Runden frei.',
  },
  closing: {
    tagline: ['Weniger swipen.', 'Mehr erleben.'],
  },
} as const;

// Content of the simplified phone screens (placeholder until real screenshots exist).
export const ui = {
  statusTime: '18:24',
  eventList: {
    kicker: 'Wien · diese Woche',
    title: 'Events',
    chips: ['Alle', 'Spieleabend', 'Laufen', 'Spaziergang'],
    items: [
      {day: 'DO', time: '19:00', title: 'Spieleabend für Neue', place: 'Café Feder', seats: '5 von 8 Plätzen frei', partner: true, color: 'pink'},
      {day: 'SA', time: '10:00', title: 'Lauftreff am Augarten', place: 'Augarten', seats: '6 von 12 Plätzen frei', partner: false, color: 'blue'},
      {day: 'SO', time: '17:30', title: 'Abendspaziergang', place: 'Donaukanal', seats: '4 von 6 Plätzen frei', partner: false, color: 'violet'},
      {day: 'MO', time: '19:30', title: 'Kochen zu viert', place: 'Gasthaus Lindengrün', seats: '2 von 4 Plätzen frei', partner: true, color: 'sky'},
    ],
    tabs: ['Entdecken', 'Augenblicke', 'Tische', 'Profil'],
  },
  eventDetail: {
    back: 'Events',
    kicker: 'Spieleabend · kleine Runde',
    title: 'Spieleabend für Neue',
    when: 'Donnerstag, 19:00 – 22:00',
    where: 'Café Feder, Neubau',
    seats: (free: number, total: number) => `${free} von ${total} Plätzen frei`,
    seatsTotal: 8,
    seatsTaken: 3,
    description: 'Brettspiele und Getränke. Keine Vorkenntnisse nötig.',
    cta: 'Ich bin dabei',
    ctaDone: 'Du bist dabei',
  },
  safety: {
    back: 'Profil',
    title: ['Schutz &', 'Sichtbarkeit'],
    intro: 'Du entscheidest, wer dich sieht.',
    rows: [
      {icon: 'location', title: 'Kein Live-Standort', sub: 'Niemand sieht, wo du gerade bist.', control: 'always'},
      {icon: 'eye', title: 'Namen erst nach Ja', sub: 'Vorher bleibt ihr anonym.', control: 'always'},
      {icon: 'shield', title: 'Nur Frauen', sub: 'Für deine Runden und Antworten', control: 'toggle'},
      {icon: 'pause', title: 'Unsichtbar-Modus', sub: 'Pause, wann du willst.', control: 'off'},
      {icon: 'flag', title: 'Melden & Blockieren', sub: 'Überall, mit echter Moderation.', control: 'chevron'},
    ],
    always: 'immer',
    footnote: 'Diese Regeln setzt der Server durch, nicht nur die App.',
  },
  place: {
    badge: 'Partnerort',
    title: 'Café Feder',
    area: 'Neubau · Wien',
    text: 'Hält jeden Donnerstag einen Tisch für offene Runden frei.',
    nextLabel: 'Nächstes Event',
    next: 'Spieleabend für Neue',
    nextWhen: 'Do, 19:00',
  },
} as const;
