// Brand tokens. Values mirror the existing Augenblick website ("Papier & Tinte").
// Swap any value here and every scene picks it up.

export const colors = {
  paper: '#F4F4F2', // background
  paperDark: '#E9E9E5',
  white: '#FFFFFF',
  line: '#D5D8E0',
  ink: '#16244A', // primary text
  inkSoft: '#4A5570', // secondary text
  inkPale: '#5E6780', // tertiary text / labels
  pink: '#FF48B0', // accent fill
  pinkText: '#B0006F', // accent text (AA on paper)
  pinkLight: '#FFE1F1',
  blue: '#0078BF',
  blueText: '#006AA8',
  blueLight: '#DCEBF6',
  sky: '#4AA3E3', // logo circle left
  violet: '#4A2E9D', // logo overlap
  device: '#10162A', // phone bezel
} as const;

export const fonts = {
  // Poster face for headlines and the wordmark (Bricolage Grotesque Condensed ExtraBold).
  display: '"AB Plakat", "Arial Narrow", sans-serif',
  // Interface and supporting text.
  text: 'Inter, system-ui, sans-serif',
} as const;

// Font files in /public/fonts. Loaded once before rendering (see src/fonts.ts).
export const fontFiles = [
  {family: 'AB Plakat', file: 'fonts/BricolageGrotesqueCondensed-ExtraBold.ttf', weight: '800'},
  {family: 'Inter', file: 'fonts/inter-latin-400-normal.woff2', weight: '400'},
  {family: 'Inter', file: 'fonts/inter-latin-500-normal.woff2', weight: '500'},
  {family: 'Inter', file: 'fonts/inter-latin-600-normal.woff2', weight: '600'},
  {family: 'Inter', file: 'fonts/inter-latin-700-normal.woff2', weight: '700'},
] as const;

export const wordmark = 'Augenblick';

// Logo: two overlapping circles, the overlap is the "Augenblick" (encounter).
export const logo = {
  left: colors.sky,
  right: colors.pink,
  overlap: colors.violet,
};
