type RawAudioData = number[][];

type FlatAudioData = [number, number, number][];

type FlatAudioDataArray = FlatAudioData[];

interface Window {
  voices: number;
}
