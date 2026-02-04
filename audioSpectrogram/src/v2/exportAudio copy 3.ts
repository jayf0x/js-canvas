import * as THREE from "three";

import { bufferSize, MAX_HEIGHT, TIME_SEGMENTS } from "./consts";

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

type FlatAudioData = [number, number, number][];
type FlatAudioDataArray = FlatAudioData[];

export const exportAudio = (
  dataArray: FlatAudioDataArray,
  playBuffer = true,
  exportBuffer = false
) => {
  const populatedBuffer = populateBuffer(dataArray);

  // Set up audio context with appropriate sample rate and duration
  const audioCtx = new AudioContext();
  const sampleRate = audioCtx.sampleRate;
  const duration = 100; // populatedBuffer.length / sampleRate; // total samples for the duration

  console.log({ duration });

  // Create buffer for 2 channels, with sampleRate * duration
  const filledBuffer = audioCtx.createBuffer(
    2,
    sampleRate * duration,
    sampleRate
  );
  const channel1 = filledBuffer.getChannelData(0); // Left channel
  const channel2 = filledBuffer.getChannelData(1); // Right channel

  const mapAmp = (y: number) =>
    THREE.MathUtils.mapLinear(y, 0, MAX_HEIGHT, -1, 1);

  // Map populatedBuffer into audio buffer data
  populatedBuffer.forEach((segment, segmentIndex) => {
    segment.forEach(([x, y, z], freqIndex) => {
      // Calculate the global index in the buffer
      const i = segmentIndex * bufferSize + freqIndex;

      const amp = mapAmp(y);

      // Set amplitude data for both channels; we could modulate per channel if desired
      channel1[i] = amp; // Set left channel
      channel2[i] = amp; // Set right channel
    });
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
