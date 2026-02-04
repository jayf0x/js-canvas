import * as THREE from "three";
import { Box } from "@react-three/drei";

import WaveformMesh from "./WaveformMesh";
import { useAudioData } from "./useAudioData";

import { FREQUENCY_DIVISIONS, TIME_SEGMENTS, MAX_HEIGHT } from "./consts";
import { button, useControls } from "leva";
import { useCallback, useEffect } from "react";
import { exportAudio } from "./exportAudio";

const OutlineBox = () => {
  const edgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
  const edgesMaterial = new THREE.LineBasicMaterial({ color: "#fff" });

  return (
    <lineSegments
      geometry={edgesGeometry}
      material={edgesMaterial}
      position={[0, MAX_HEIGHT / 2, 0]}
      scale={[FREQUENCY_DIVISIONS / 2, MAX_HEIGHT, TIME_SEGMENTS]}
    />
  );
};

const Main = () => {
  const { normalizedValues, frequencyData } = useAudioData(true);

  const onExport = useCallback(() => {
    console.log("yo epxort", frequencyData);
    if (normalizedValues) {
      exportAudio(normalizedValues);
    }
  }, [normalizedValues, exportAudio]);

  useControls(
    {
      export: button(onExport),
    },
    [normalizedValues]
  );

  return (
    <>
      <Box args={[1, 1, 1]} />
      <OutlineBox />

      {normalizedValues && <WaveformMesh points={normalizedValues} />}
    </>
  );
};

export default Main;
