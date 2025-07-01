import { useEffect, useState } from 'react';

const keys = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
};

export function usePlayerControls() {
  const [movement, setMovement] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      const dir = keys[e.code];
      if (dir) setMovement((m) => ({ ...m, [dir]: true }));
    };
    const handleKeyUp = (e) => {
      const dir = keys[e.code];
      if (dir) setMovement((m) => ({ ...m, [dir]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
}
