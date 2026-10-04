// Real screenshots: drop PNG/JPG files into /public/screenshots and set the path here,
// e.g. eventList: 'screenshots/event-list.png'. Use the device's native aspect ratio
// (about 9:19.5, e.g. 1179×2556). When a path is set, the phone shows the image instead
// of the built-in mock screen. null = use the mock.

export const screenshots: Record<'eventList' | 'eventDetail' | 'safety' | 'place', string | null> = {
  eventList: null,
  eventDetail: null,
  safety: null,
  place: null,
};

// Optional logo file (SVG/PNG in /public). null = draw the two-circle mark in code.
export const logoFile: string | null = null;
