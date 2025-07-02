import React, { createContext, useContext, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const BulletContext = createContext();

export function BulletProvider({ children }) {
  const [bullets, setBullets] = useState([]);
  const { camera, scene } = useThree();

  useFrame((state, delta) => {
    setBullets((bs) =>
      bs
        .map((b) => ({ ...b, pos: b.pos.clone().add(b.dir.clone().multiplyScalar(delta * b.speed)), life: b.life - delta }))
        .filter((b) => b.life > 0)
    );
  });

  const shoot = () => {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const origin = camera.position.clone();
    const bullet = {
      id: Math.random(),
      pos: origin,
      dir,
      speed: 30,
      life: 1,
    };
    // Raycast for immediate hit detection
    const raycaster = new THREE.Raycaster(origin, dir);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      // stop at first object, shorten life
      bullet.life = Math.min(bullet.life, intersects[0].distance / bullet.speed);
    }
    setBullets((bs) => [...bs, bullet]);
    playShootSound();
  };

  return <BulletContext.Provider value={{ bullets, shoot }}>{children}</BulletContext.Provider>;
}

export const useBullets = () => useContext(BulletContext);

function playShootSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}
