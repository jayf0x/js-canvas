import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import {
  InstancedMesh,
  BufferGeometry,
  BoxGeometry,
  Matrix4,
  Camera,
} from "three";
import { useControls } from "leva";

const totalNrPoints = 5000;
const radius = 200;

const instanceArgs = [new BoxGeometry(1, 1, 1), undefined, totalNrPoints];
const matrix = new Matrix4();
const { sin, tan, cos, cosh, sinh, tanh, PI, acos, asin } = Math;

const goldenRatio = (1 + Math.sqrt(5)) / 2;

let og = 0;
const Main = () => {
  const meshRef = useRef<InstancedMesh<BufferGeometry> | any>();

  const { coneWidth, coneTopDepth } = useControls({
    coneWidth: {
      value: 5,
      min: -20,
      max: 20,
      step: 0.1,
    },
    coneTopDepth: {
      value: 5,
      min: -10,
      max: 10,
      step: 0.1,
    },
  });

  const animate = useCallback(
    (i: number) => {
      const phi = acos(1 - (2 * (i + 0.5)) / totalNrPoints);
      const theta = 2 * PI * goldenRatio * i + og;

      let x = radius * sin(phi) * cos(theta);
      let y = radius * cos(phi);
      let z = radius * sin(phi) * sin(theta);

      const _x = x;
      const _y = y;
      const _z = z;

      // y /= cosh((_z + this.id) / totalNrPoints);

      /** V1: cone with top flat */
      // y /=
      //   cosh(((_z + i) / totalNrPoints) * coneWidth) -
      //   sin((i / totalNrPoints) * coneTopDepth);

      /** V2: awesome when decreasing the `coneTopDepth` */
      // y /=
      // sinh(((_z + i) / totalNrPoints) * coneWidth) -
      // sin((i / totalNrPoints) * coneTopDepth);

      /** V3: way more clean version of V1 */
      // y /=
      //   sinh(((_y + i) / totalNrPoints) * coneWidth) -
      //   sin((i / totalNrPoints) * coneTopDepth) +
      //   cos((i / totalNrPoints) * coneTopDepth);

      y /=
        sinh(((_y + i) / totalNrPoints) * coneWidth) -
        sin((i / totalNrPoints) * coneTopDepth) +
        cos((i / totalNrPoints) * coneTopDepth) +
        tanh(og);

      // x /= ((_y + i) / totalNrPoints) * coneWidth;

      matrix.makeTranslation(x, y, z);
      meshRef.current.setMatrixAt(i, matrix);
    },
    [coneWidth, coneTopDepth, meshRef.current]
  );

  const updateMesh = useCallback(() => {
    if (meshRef.current) {
      for (let i = 0; i < totalNrPoints; i++) {
        animate(i);
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef.current, animate]);

  useFrame(({ camera, clock }) => {
    og += 0.001;
    if (clock.elapsedTime === 0) {
      camera.position.set(
        27.93771499972516,
        296.7564658994582,
        258.0343295270578
      );
      camera.matrix.set(
        0.9986302147500634,
        2.6020852139652106e-18,
        -0.052322979542857216,
        0,
        -0.014529007841019695,
        0.9606738320457113,
        -0.27729892959361374,
        0,
        0.05026531726148601,
        0.27767929059007684,
        0.9593579152005751,
        0,
        54.77996543127063,
        354.9240327460401,
        620.4445858958193,
        1
      );
    }

    (window as any).camera = camera;

    requestAnimationFrame(updateMesh);
  });

  useEffect(() => {
    const ev = ({ key }: KeyboardEvent) => {
      if (key === " ") {
        console.log(coneWidth, coneTopDepth);
      }
    };

    document.addEventListener("keydown", ev);

    return () => document.removeEventListener("keydown", ev);
  }, [coneWidth, coneTopDepth]);

  return (
    <instancedMesh ref={meshRef} args={instanceArgs as any}>
      <meshStandardMaterial />
    </instancedMesh>
  );
};

export default Main;
