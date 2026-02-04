import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import Drawer from "./Main";

export default () => (
  <>
    <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
      <Stats showPanel={2} />
      <directionalLight position={[0, 20, 2]} intensity={10} />
      <ambientLight intensity={0.1} />

      <Drawer />

      <OrbitControls dampingFactor={1} />
    </Canvas>
  </>
);
