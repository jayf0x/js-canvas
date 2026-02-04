export const FREQUENCY_DIVISIONS = 512;
export const TIME_DIVISIONS = 100;
export const MAX_HEIGHT = 20;

export const centerZ = TIME_DIVISIONS / 2;
export const bufferSize = FREQUENCY_DIVISIONS / 2;

// 18.810
export const chunk = (a: number[], l: number): number[][] =>
  a.length ? [a.slice(0, l)].concat(chunk(a.slice(l), l)) : [];
