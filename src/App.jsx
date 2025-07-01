import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Environment from './components/Environment.jsx';
import Player from './components/Player.jsx';
import Gun from './components/Gun.jsx';
import Bullets from './components/Bullets.jsx';
import { BulletProvider } from './hooks/useBullets.jsx';

export default function App() {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, position: [0, 1, 0] }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <BulletProvider>
          <color attach="background" args={[0.6, 0.7, 0.9]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 5]} />
          <Environment />
          <Player />
          <Gun />
          <Bullets />
        </BulletProvider>
      </Suspense>
    </Canvas>
  );
}
