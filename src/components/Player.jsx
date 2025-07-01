import React, { useRef, useEffect } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { usePlayerControls } from '../hooks/usePlayerControls.js';
import { useBullets } from '../hooks/useBullets.jsx';

export default function Player() {
  const controlsRef = useRef();
  const { camera } = useThree();
  const keys = usePlayerControls();
  const { shoot } = useBullets();

  // Set initial camera height for a more natural viewpoint
  useEffect(() => {
    camera.position.y = 1;
  }, [camera]);

  useFrame((state, delta) => {
    if (!controlsRef.current?.isLocked) return;
    const speed = 5;
    if (keys.forward) controlsRef.current.moveForward(delta * speed);
    if (keys.backward) controlsRef.current.moveForward(-delta * speed);
    if (keys.left) controlsRef.current.moveRight(-delta * speed);
    if (keys.right) controlsRef.current.moveRight(delta * speed);
  });

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!controlsRef.current.isLocked) {
        controlsRef.current.lock();
      } else if (e.button === 0) {
        shoot();
      }
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, []);

  return <PointerLockControls ref={controlsRef} args={[camera]} />;
}
