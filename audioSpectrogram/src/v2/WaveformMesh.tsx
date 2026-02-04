import { useEffect, useMemo, useRef, memo } from "react";
import * as THREE from "three";

import { MAX_HEIGHT } from "./consts";

const WaveformMesh = ({ points }: { points: FlatAudioDataArray }) => {
  const meshRef = useRef<THREE.InstancedMesh<THREE.BufferGeometry> | any>();

  const instanceCount = useMemo(() => points.flat().length, [points]);

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.dispose();

    points.flat().forEach(([x, y, z], id) => {
      // Position each instance's base at y=0 and extend it upward by instanceHeight
      const matrix = new THREE.Matrix4();
      matrix.makeTranslation(x, y / 2, z); // Center the geometry on y-axis
      matrix.scale(new THREE.Vector3(1, y, 1)); // Scale on y-axis only

      meshRef.current.setMatrixAt(id, matrix);

      meshRef.current?.setColorAt(
        id,
        new THREE.Color(
          `hsl(${((360 / MAX_HEIGHT) * y).toFixed()}, 100%, ${Math.floor(
            (70 / MAX_HEIGHT) * y
          )}%)`
        )
      );
    });

    // points.forEach(
    //   ([x, y, z], id) => {
    //     meshRef.current?.setMatrixAt(
    //       id,
    //       new THREE.Matrix4().compose(
    //         new THREE.Vector3(x, y / 2, z), // Fixed y position
    //         new THREE.Quaternion(),
    //         new THREE.Vector3(1, y, 1) // Set geometry size for precise height
    //       )
    //     );

    //     meshRef.current?.setColorAt(
    //       id,
    //       new THREE.Color(
    //         `hsl(${((360 / MAX_HEIGHT) * y).toFixed()}, 100%, ${Math.floor(
    //           (70 / MAX_HEIGHT) * y
    //         )}%)`
    //       )
    //     );
    //   }
    // );

    // const temp = new THREE.Object3D();

    // points.forEach(([x, y, z], id) => {
    //   temp.position.set(x, y, z);
    //   temp.updateMatrix();
    //   meshRef.current.setMatrixAt(id, temp.matrix);
    //   meshRef.current.setColorAt(
    //     id,
    //     new THREE.Color(
    //       `hsl(${((360 / MAX_HEIGHT) * y).toFixed()}, 100%, ${Math.floor(
    //         10 + (40 / MAX_HEIGHT) * y
    //       )}%)`
    //     )
    //   );
    // });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  return (
    // <instancedMesh
    //   ref={meshRef}
    //   args={[undefined, undefined, instanceCount]}
    //   castShadow
    //   receiveShadow
    // >
    //   <boxGeometry args={[1, 1, 1]} />
    //   <meshBasicMaterial />
    // </instancedMesh>

    <instancedMesh
      ref={meshRef}
      args={[new THREE.BoxGeometry(1, 1, 1), undefined, instanceCount]}
    >
      <meshStandardMaterial />
    </instancedMesh>
  );
};

export default memo(WaveformMesh);
