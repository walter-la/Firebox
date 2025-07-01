import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export default function Gun() {
  const ref = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (ref.current) {
      camera.add(ref.current);
      ref.current.position.set(0.3, -0.2, -0.5);
    }
    return () => {
      if (ref.current) camera.remove(ref.current);
    };
  }, [camera]);

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.2, 0.1, 0.5]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
