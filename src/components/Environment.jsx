import React, { useRef } from 'react';

export default function Environment() {
  const buildings = [
    [0, 0.5, -5],
    [2, 0.5, -8],
    [-2, 0.5, -8],
  ];
  return (
    <group>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#777" />
      </mesh>
      {buildings.map((pos, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ))}
    </group>
  );
}
