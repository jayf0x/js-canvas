import { bufferSize, TIME_SEGMENTS } from "./consts";

export const chunk = (a: FlatAudioData, l: number): FlatAudioData[] =>
  [a.slice(0, l)].concat(chunk(a.slice(l), l));

//
type FlatAudioData = [number, number, number][];
export const exportAudio = (
  dataArray: FlatAudioData,
  playBuffer = true,
  exportBuffer = false
) => {
  // const fullBuffer = chunk(dataArray, segmentsSize).map((i) => {
  //   const temp = Array(bufferSize).fill(0);
  //   temp.splice(0, i.length, ...i);
  //   return temp;
  // });

  const audioCtx = new AudioContext();
  const filledBuffer = audioCtx.createBuffer(2, TIME_SEGMENTS, 48000);

  dataArray.forEach((segment, segIndex) => {
    const buffer = filledBuffer.getChannelData(segIndex);
    for (let i = 0; i < filledBuffer.length; i++) {
      // as we cut of certain % of the length of the buffer in the normalization we now assign
      buffer[i] = segment[i] ?? 0;
    }
  });

  const source = audioCtx.createBufferSource();
  source.buffer = filledBuffer;
  console.warn({ source });

  if (playBuffer) {
    source.connect(audioCtx.destination);
    source.start();
  }
  if (exportBuffer) {
    // const blob = new Blob([source.buffer], { type: "audio/wav" });
    // audio.src = window.URL.createObjectURL(blob);
  }
};
