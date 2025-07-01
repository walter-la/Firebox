# Firebox FPS Demo

This project is a small starter for a browser‑based first‑person shooter built with React 19, Three.js and @react-three/fiber.

## Requirements

- Node.js 18+ (tested with Node 20)
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the URL printed in the terminal to see the demo. Click inside the window to lock the pointer and use **WASD** to walk. Left click to fire a bullet.

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder. You can preview the build locally with:

```bash
npm run preview
```

## Extending

The code is separated into small components located in `src/components` and custom hooks in `src/hooks`.

- **Environment.jsx** – adds the ground plane and some box buildings.
- **Player.jsx** – handles pointer lock and keyboard movement.
- **Gun.jsx** – simple gun model attached to the camera.
- **Bullets.jsx** – renders active bullets.
- **useBullets.jsx** – stores bullet state and shooting logic.

Feel free to modify the scene, add models or effects.
