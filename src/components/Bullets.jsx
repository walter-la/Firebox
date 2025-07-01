import React from 'react';
import { useBullets } from '../hooks/useBullets.jsx';

export default function Bullets() {
  const { bullets } = useBullets();
  return (
    <group>
      {bullets.map((b) => (
        <mesh key={b.id} position={b.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      ))}
    </group>
  );
}
