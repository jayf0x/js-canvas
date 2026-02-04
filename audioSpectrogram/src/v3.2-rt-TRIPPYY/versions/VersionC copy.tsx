import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { InstancedMesh, BufferGeometry, BoxGeometry, Matrix4 } from "three";

const totalNrPoints = 500;
const radius = 200;

const instanceArgs = [new BoxGeometry(1, 1, 1), undefined, totalNrPoints];
const matrix = new Matrix4();
const { sin, tan, cos, cosh, tanh, PI } = Math;

const goldenRatio = (1 + Math.sqrt(5)) / 2;

class Point {
  theta: number;
  phi: number;
  radius: number = 100;
  id = 0;

  constructor(id: number) {
    this.id = id;

    // Spherical Fibonacci distribution
    this.phi = Math.acos(1 - (2 * (id + 0.5)) / totalNrPoints);
    this.theta = 2 * Math.PI * goldenRatio * id; //
  }
  animate(_radius = radius) {
    this.theta += 0.1;

    let x = _radius * Math.sin(this.phi) * Math.cos(this.theta);
    const y = _radius * Math.cos(this.phi);
    const z = _radius * Math.sin(this.phi) * Math.sin(this.theta);

    x += (this.id * x) / tanh(y * z);

    return [x, y, z];
  }
}

const cubes = Array(totalNrPoints)
  .fill(0)
  .map((_, i) => new Point(i));

const Main = () => {
  const meshRef = useRef<InstancedMesh<BufferGeometry> | any>();

  useFrame(({ camera, clock }) => {
    if (clock.elapsedTime === 0) {
      camera.position.set(
        0.11623156003062385,
        283.83947846348923,
        239.98456319912282
      );
      camera.matrix.set(
        0.9999998827125761,
        2.710505431213761e-20,
        -0.0004843292620520871,
        0,
        -0.0003698506182358321,
        0.6456485765100815,
        -0.7636345846417812,
        0,
        0.0003127064986061083,
        0.7636346742065251,
        0.6456485007836232,
        0,
        0.11623156003062385,
        283.83947846348923,
        239.98456319912282,
        1
      );
    }

    requestAnimationFrame(updateMesh);
  });

  const updateMesh = useCallback(() => {
    cubes.forEach((point, i) => {
      const [x, y, z] = point.animate();

      matrix.makeTranslation(x, y, z);
      meshRef.current.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [meshRef.current]);

  return (
    <instancedMesh ref={meshRef} args={instanceArgs as any}>
      <meshStandardMaterial />
    </instancedMesh>
  );
};

export default Main;
