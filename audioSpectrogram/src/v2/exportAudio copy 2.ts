import { bufferSize, TIME_SEGMENTS } from "./consts";

// need to reconstruct the correct buffer sizes as in previous normalization we removed some frequencies ranges
// eg: convert 90 [Array(201), ...] ---> {{TIME_SEGMENTS}} [Array({{bufferSize}}), ...]
const populateBuffer = (dataArray: FlatAudioDataArray) => {
  const fullBuffer = dataArray.map((range) => {
    // TODO: should the x, y, z be any value or will 0 work?
    const silentBuffer = Array(Math.max(bufferSize - range.length, 0)).fill([
      0, 0, 0,
    ]);
    range.push(...silentBuffer);
    return range;
  });

  while (fullBuffer.length < TIME_SEGMENTS) {
    fullBuffer.push(Array(bufferSize).fill([0, 0, 0]));
  }

  return fullBuffer;
};

type FlatAudioData = [number, number, number][];
type FlatAudioDataArray = FlatAudioData[];

export const exportAudio = (
  dataArray: FlatAudioDataArray,
  playBuffer = true,
  exportBuffer = false
) => {
  const populatedBuffer = populateBuffer(dataArray);

  // Construct new buffer
  const audioCtx = new AudioContext();
  const filledBuffer = audioCtx.createBuffer(2, TIME_SEGMENTS, 48000);
  const channel1 = filledBuffer.getChannelData(0); // Left channel
  const channel2 = filledBuffer.getChannelData(1); // Right channel

  populatedBuffer.forEach((segment) => {
    for (let i = 0; i < filledBuffer.length; i++) {
      // as we cut of certain % of the length of the buffer in the normalization we now assign
      // Segment is of the form [x, y, z], where y is the amplitude at that point
      // TODO: need to use x, y, z somehow ??
      const [x, y, z] = segment[i];
      // update different channel acording to x y z ??
      channel1[i] = y;
      channel2[i] = y;
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
    const blob = new Blob([source.buffer as any], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_audio.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
