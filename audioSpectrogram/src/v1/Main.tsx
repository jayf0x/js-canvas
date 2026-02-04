import WaveformMesh from "./WaveformMesh";

import { useAudioData } from "./useAudioData";
import { Box } from "@react-three/drei";

import {
  FREQUENCY_DIVISIONS,
  TIME_DIVISIONS,
  MAX_HEIGHT,
  centerZ,
} from "./consts";

const Main = () => {
  const normalizedValues = useAudioData(true);

  return (
    <>
      <Box args={[1, 1, 1]} />
      {/* <Box
        args={[FREQUENCY_DIVISIONS / 2, MAX_HEIGHT, TIME_DIVISIONS]}
        // translateY={MAX_HEIGHT}
        // translateZ={centerZ}
      /> */}

      {normalizedValues && <WaveformMesh points={normalizedValues} />}
    </>
  );
};

export default Main;
