import React, { useRef, useState, useEffect } from 'react';
import { useBullets } from '../hooks/useBullets.jsx';

const keyMap = {
  forward: 'KeyW',
  backward: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
};

export default function TouchControls() {
  const { shoot } = useBullets();
  const joyRef = useRef();
  const stickRef = useRef();
  const [state, setState] = useState({});

  useEffect(() => {
    console.log('TouchControls mounted', { hasShoot: typeof shoot === 'function' });
  }, [shoot]);

  const threshold = 15; // pixels

  const dispatch = (code, type) => {
    window.dispatchEvent(new KeyboardEvent(type, { code }));
  };

  const updateDir = (next) => {
    Object.keys(keyMap).forEach((dir) => {
      if (next[dir] !== state[dir]) {
        dispatch(keyMap[dir], next[dir] ? 'keydown' : 'keyup');
      }
    });
    setState(next);
  };

  const handleMove = (e) => {
    const touch = e.touches[0];
    if (!touch || !joyRef.current) return;
    const rect = joyRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    stickRef.current.style.transform = `translate(${x}px, ${y}px)`;
    const next = {
      forward: y < -threshold,
      backward: y > threshold,
      left: x < -threshold,
      right: x > threshold,
    };
    updateDir(next);
  };

  const reset = () => {
    if (stickRef.current) stickRef.current.style.transform = 'translate(0px, 0px)';
    updateDir({ forward: false, backward: false, left: false, right: false });
  };

  return (
    <>
      <div
        className="joystick"
        ref={joyRef}
        onTouchStart={handleMove}
        onTouchMove={handleMove}
        onTouchEnd={reset}
        onTouchCancel={reset}
      >
        <div className="stick" ref={stickRef} />
      </div>
      <div
        className="fire-btn"
        onTouchStart={(e) => {
          e.preventDefault();
          console.log('Fire button touched');
          shoot();
        }}
      />
    </>
  );
}
