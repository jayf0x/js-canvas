import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import Drawer from "./Main";
import { MAX_HEIGHT } from "./consts";
import { Leva } from "leva";

export default () => (
  <>
    <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
      <Stats showPanel={2} />
      <directionalLight
        position={[0, MAX_HEIGHT * 1.5, 0]}
        intensity={2}
        color="white"
        castShadow
      />
      <ambientLight intensity={0.5} />

      <Drawer />

      <OrbitControls dampingFactor={1} />
    </Canvas>
    <Leva flat hideCopyButton titleBar={false} />
  </>
);
