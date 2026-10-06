// Brand tokens, design "Überdruck" (two-colour riso print).
// Pink = Augenblick, Blue = structure / table. Violet appears ONLY where pink and blue
// overlap (resonance, logo), never as a free accent. Ink text on paper; on pink always ink.

export const colors = {
  paper: '#F4F4F2',
  ink: '#16244A',
  inkSoft: 'rgba(22, 36, 74, 0.74)', // ink at reduced strength for supporting text
  inkFaint: 'rgba(22, 36, 74, 0.14)', // hairlines, silhouettes
  pink: '#FF48B0',
  blue: '#0078BF',
  violet: '#5A3BA3', // overlap of pink + blue only
  white: '#FFFFFF',
  device: '#121A33', // phone bezel (deep ink)
} as const;

// Light tints of the two print colours (pink/blue on paper), for the hook cards.
export const tints = {
  pink: '#FFD3EB',
  blue: '#CCE2F1',
} as const;

export const fonts = {
  // Headlines and wordmark: Bricolage Grotesque Condensed ExtraBold (OFL).
  display: '"AB Plakat", "Arial Narrow", sans-serif',
  // Body text: Figtree (OFL).
  text: 'Figtree, system-ui, sans-serif',
} as const;

// Font files in /public/fonts, loaded before the first frame (see src/fonts.ts).
export const fontFiles = [
  {family: 'AB Plakat', file: 'fonts/BricolageGrotesqueCondensed-ExtraBold.ttf', weight: '800'},
  {family: 'Figtree', file: 'fonts/figtree-latin-400-normal.woff2', weight: '400'},
  {family: 'Figtree', file: 'fonts/figtree-latin-500-normal.woff2', weight: '500'},
  {family: 'Figtree', file: 'fonts/figtree-latin-600-normal.woff2', weight: '600'},
  {family: 'Figtree', file: 'fonts/figtree-latin-700-normal.woff2', weight: '700'},
] as const;

export const wordmark = 'Augenblick';

// Logo: two overlapping circles; the overlap is the Augenblick.
export const logo = {
  left: colors.blue,
  right: colors.pink,
  overlap: colors.violet,
};
