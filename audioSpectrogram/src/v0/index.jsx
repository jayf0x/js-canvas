import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, Stats } from "@react-three/drei";

import Drawer from "./Drawer";

function Scene() {
  return (
    <>
      {/* <input
        type="file"
        accept="audio/*"
        onChange={(e) => console.log(e.target.files[0])}
      /> */}
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <directionalLight position={[0, 20, 2]} intensity={10} />
        <ambientLight intensity={0.1} />

        <Drawer />

        <Box args={[1, 1, 1]} />

        <OrbitControls dampingFactor={1} />
        <Stats showPanel="{2}" />
      </Canvas>
    </>
  );
}

export default Scene;
