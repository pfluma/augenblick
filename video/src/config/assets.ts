// Real app screenshots in /public/screenshots (sources: see README.md).
//
// kind 'phone': photo from an Android phone. The system status bar at the top is cut
//   off evenly (cropTop = share of the image height), then the image fills the screen.
// kind 'web':   PNG from the web build, no status bar. It starts below the camera
//   island (topInset) and is cut off at the bottom if it is taller than the screen.
//
// To swap a screen: replace the file or change the path. Keep the 9:19.5 aspect ratio.

export type Shot = {src: string; kind: 'phone' | 'web'; cropTop?: number; bg?: string};

export const STATUS_BAR = 0.044; // share of a phone screenshot taken by the status bar
export const WEB_TOP_INSET = 62; // px of empty screen above a web screenshot

export const shots = {
  augenblicke: {src: 'screenshots/phone/02-augenblicke.jpg', kind: 'phone'},
  festhaltenOrt: {src: 'screenshots/web/03-augenblick-festhalten-ort-und-zeit.png', kind: 'web'},
  festhaltenText: {src: 'screenshots/web/04-augenblick-festhalten-text.png', kind: 'web'},
  amTisch: {src: 'screenshots/phone/04-am-tisch.jpg', kind: 'phone'},
  events: {src: 'screenshots/phone/09-events-liste.jpg', kind: 'phone'},
  tischSchutz: {src: 'screenshots/phone/06-tisch-oeffnen-schutz.jpg', kind: 'phone'},
  verbinden: {src: 'screenshots/phone/07-verbinden.jpg', kind: 'phone'},
} satisfies Record<string, Shot>;

// The important spot of each feature screen. It zooms out of the phone as an enlarged
// card so it stays readable on a small screen. from/to = vertical range of the
// screenshot, as share of the full image height (full width is always used).
export const details = {
  moment: {shot: 'festhaltenText', from: 0.088, to: 0.265}, // "Was ist passiert?" text field
  table: {shot: 'amTisch', from: 0.413, to: 0.7}, // card "Ich sitz allein …"
  safety: {shot: 'tischSchutz', from: 0.678, to: 0.862}, // "Wer darf anfragen? Alle / Nur Frauen"
  connect: {shot: 'verbinden', from: 0.215, to: 0.575}, // QR code + "Zeig diesen Code der Person vor dir."
} satisfies Record<string, {shot: keyof typeof shots; from: number; to: number}>;

// Optional logo file (SVG/PNG in /public). null = draw the two-circle mark in code.
export const logoFile: string | null = null;
