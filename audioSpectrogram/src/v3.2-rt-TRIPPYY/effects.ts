/**

// Connect your audio source to the panner, then to the master gain
audioSourceNode.connect(pannerNode);
pannerNode.connect(masterGainRef.current!);
 */
export const createPanner = (context: AudioContext) => {
  const pannerNode = context.createPanner();
  // Set up panner properties
  pannerNode.panningModel = "HRTF"; // or 'equalpower' for simpler model
  pannerNode.distanceModel = "inverse";
  pannerNode.refDistance = 1;
  pannerNode.maxDistance = 10000;
  pannerNode.rolloffFactor = 1;
  pannerNode.coneInnerAngle = 360;
  pannerNode.coneOuterAngle = 0;
  pannerNode.coneOuterGain = 0;

  // Position the sound source
  pannerNode.setPosition(1, 0, 0); // Example: right of the listener

  return pannerNode;
};
