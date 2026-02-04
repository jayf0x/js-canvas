import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Drawer from "./Main";
import { MAX_HEIGHT, TIME_SEGMENTS } from "./consts";

import "./styles.css";

const limit = (
  (window.performance as any).memory.jsHeapSizeLimit / 100
).toFixed();

const StatsCustom = () => {
  const [c, setC] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setC(
        +((window.performance as any).memory.totalJSHeapSize / 100).toFixed()
      );
    }, 500);
  }, []);

  return (
    <div id="heap-stats">
      <p>max: {limit}</p>
      <p>size: {c ?? "-"}</p>
    </div>
  );
};

const startPosition: [number, number, number] = [0, 0, 0]; // [0, 200, 200]
export default () => (
  <>
    <StatsCustom />

    <Canvas camera={{ position: [0, 200, 200], fov: 75, rotation: [1, 10, 1] }}>
      <directionalLight
        position={[TIME_SEGMENTS, MAX_HEIGHT * 1.5, 0]}
        intensity={2}
        color="white"
        castShadow
      />
      <ambientLight intensity={0.5} />

      <Drawer />

      <OrbitControls dampingFactor={1} />
    </Canvas>
  </>
);
