export type CoordsResult =
  | { status: 'success'; coords: [number, number] }
  | { status: 'fallback'; coords: [number, number] }
  | { status: 'unavailable' };
