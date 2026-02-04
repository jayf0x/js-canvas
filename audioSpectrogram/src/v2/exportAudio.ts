import * as THREE from "three";
import { bufferSize, MAX_HEIGHT, TIME_SEGMENTS } from "./consts";

type FlatAudioData = [number, number, number][];
type FlatAudioDataArray = FlatAudioData[];

// need to reconstruct the correct buffer sizes as in previous normalization we removed some frequencies ranges
// eg: convert 90 [Array(201), ...] ---> {{TIME_SEGMENTS}} [Array({{bufferSize}}), ...]
const populateBuffer = (dataArray: FlatAudioDataArray) => {
  const fullBuffer = dataArray.map((range) => {
    // TODO: should the x, y, z be any value or will 0 work?
    const silentBuffer = Array(Math.max(bufferSize - range.length, 0)).fill([
      0, 0, 0,
    ]);
    return [...range, ...silentBuffer];
  });

  while (fullBuffer.length < TIME_SEGMENTS) {
    fullBuffer.push(Array(bufferSize).fill([0, 0, 0]));
  }

  return fullBuffer;
};

// Map amplitude values to the audio range
const mapAmp = (y: number) =>
  THREE.MathUtils.mapLinear(y, 0, MAX_HEIGHT, -1, 1);

export const exportAudio = (
  dataArray: FlatAudioDataArray,
  playBuffer = true,
  exportBuffer = false
) => {
  dataArray = populateBuffer(dataArray);
  // Set up audio context
  const audioCtx = new AudioContext();
  const sampleRate = audioCtx.sampleRate;

  // Create buffer with one channel, sized to fit all segments
  const totalSamples = TIME_SEGMENTS * bufferSize;
  const filledBuffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
  const channelData = filledBuffer.getChannelData(0);

  // Initialize 2D buffer for audio data
  const audio2DArray: number[][] = Array.from({ length: TIME_SEGMENTS }, () =>
    Array(bufferSize).fill(0)
  );

  // Populate 2D buffer with amplitude values
  dataArray.forEach((segment, z) => {
    segment.forEach(([x, y]) => {
      const amp = mapAmp(y);
      if (z < TIME_SEGMENTS && x < bufferSize) {
        audio2DArray[z][x] = amp;
      }
    });
  });

  // Flatten 2D buffer into 1D audio buffer for playback
  let i = 0;
  for (let z = 0; z < TIME_SEGMENTS; z++) {
    for (let x = 0; x < bufferSize; x++) {
      channelData[i++] = audio2DArray[z][x];
    }
  }

  // Play the generated audio
  const source = audioCtx.createBufferSource();
  source.buffer = filledBuffer;

  if (playBuffer) {
    source.connect(audioCtx.destination);
    source.start();
  }

  // Optional: Export buffer as a .wav file
  if (exportBuffer) {
    // audioCtx.startRendering().then(renderedBuffer => {
    //   const blob = new Blob([renderedBuffer as any], { type: "audio/wav" });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = "exported_audio.wav";
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // });
  }
};
