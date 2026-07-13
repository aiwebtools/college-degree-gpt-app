import confetti from 'canvas-confetti';
import { createPortalSounds } from './soundEffects';
import { createPortalVisuals, createFlashEffect } from './visualEffects';
import { addTimePortalStyles } from './portalStyles';

// Custom confetti shapes: broken chain link + raised fist
const buildShapes = () => {
  const shapes: confetti.Shape[] = [];
  try {
    // Broken chain link
    const chainPath = 'M8 20 C4 20 4 12 8 12 L14 12 M18 12 L24 12 C28 12 28 20 24 20 L18 20 M14 12 L18 20';
    // @ts-expect-error confetti.shapeFromPath types
    shapes.push(confetti.shapeFromPath({ path: chainPath, matrix: [0.6, 0, 0, 0.6, -8, -8] }));
    // Raised fist (stylized)
    const fistPath = 'M6 22 L6 12 Q6 8 10 8 L14 8 Q18 8 18 12 L22 12 Q24 12 24 15 L24 22 Z';
    // @ts-expect-error confetti.shapeFromPath types
    shapes.push(confetti.shapeFromPath({ path: fistPath, matrix: [0.7, 0, 0, 0.7, -10, -10] }));
  } catch {
    // shapeFromPath unsupported — fall back below
  }
  return shapes;
};

const launchLiberationConfetti = () => {
  const shapes = buildShapes();
  const base = {
    particleCount: 60,
    spread: 90,
    startVelocity: 55,
    scalar: 1.6,
    ticks: 260,
    colors: ['#ef4444', '#dc2626', '#f59e0b', '#ffffff', '#111827'],
    shapes: shapes.length ? shapes : (['square', 'circle'] as confetti.Shape[]),
  };
  confetti({ ...base, origin: { x: 0.15, y: 0.7 }, angle: 60 });
  confetti({ ...base, origin: { x: 0.85, y: 0.7 }, angle: 120 });
  setTimeout(() => {
    confetti({
      ...base,
      particleCount: 120,
      spread: 160,
      origin: { x: 0.5, y: 0.5 },
    });
  }, 400);
  setTimeout(() => {
    confetti({
      particleCount: 200,
      spread: 180,
      startVelocity: 45,
      scalar: 1.2,
      ticks: 320,
      colors: ['#ef4444', '#ffffff', '#fbbf24'],
      shapes: shapes.length ? shapes : (['square'] as confetti.Shape[]),
      origin: { x: 0.5, y: 0.3 },
    });
  }, 900);
};

const startPortalVisualsAndSound = (buttonText?: string) => {
  addTimePortalStyles();

  const overlay = document.createElement('div');
  overlay.className = 'time-portal-overlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: 9999; pointer-events: none;
    background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%);
    display: flex; align-items: center; justify-content: center;
  `;
  createPortalVisuals(overlay);
  createFlashEffect(overlay);
  document.body.appendChild(overlay);

  document.body.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.2)';
  document.body.style.animation = 'time-warp 2.3s ease-in-out';

  createPortalSounds(buttonText);
  launchLiberationConfetti();

  return overlay;
};

const cleanupPortal = (overlay: HTMLElement) => {
  if (overlay.parentNode) document.body.removeChild(overlay);
  document.body.style.filter = '';
  document.body.style.animation = '';
};

export const createTimePortalEffect = (destinationUrl: string, buttonText?: string) => {
  let opened = false;
  try {
    const a = document.createElement('a');
    a.href = destinationUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    opened = true;
  } catch {
    opened = false;
  }

  const overlay = startPortalVisualsAndSound(buttonText);

  setTimeout(() => {
    cleanupPortal(overlay);
    if (!opened) window.location.href = destinationUrl;
  }, 2300);
};

// Same portal effect but for internal navigation (React Router).
export const createInternalPortalEffect = (
  navigate: (path: string) => void,
  path: string,
  buttonText?: string,
) => {
  const overlay = startPortalVisualsAndSound(buttonText);
  // Navigate partway through so user sees portal transition
  setTimeout(() => navigate(path), 900);
  setTimeout(() => cleanupPortal(overlay), 2300);
};
