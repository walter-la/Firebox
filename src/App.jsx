import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Environment from './components/Environment.jsx';
import Player from './components/Player.jsx';
import Gun from './components/Gun.jsx';
import Bullets from './components/Bullets.jsx';
import { BulletProvider } from './hooks/useBullets.js';

export default function App() {
  return (
    <BulletProvider>
      <Canvas shadows camera={{ fov: 75 }}>
        <Suspense fallback={null}>
          <color attach="background" args={[0.6, 0.7, 0.9]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 5]} />
          <Environment />
          <Player />
          <Gun />
          <Bullets />
        </Suspense>
      </Canvas>
    </BulletProvider>
  );
}
