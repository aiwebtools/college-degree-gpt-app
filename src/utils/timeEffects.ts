
import { createPortalSounds } from './soundEffects';
import { createPortalVisuals, createFlashEffect } from './visualEffects';
import { addTimePortalStyles } from './portalStyles';

export const createTimePortalEffect = (destinationUrl: string, buttonText?: string) => {
  // Open the destination directly in a new tab within the user gesture.
  // Using an anchor click avoids about:blank intermediate pages that some
  // sites (e.g. chatgpt.com) refuse to be navigated into via popup.location
  // (ERR_BLOCKED_BY_RESPONSE).
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

  // Initialize styles
  addTimePortalStyles();

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'time-portal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
    background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  createPortalVisuals(overlay);
  createFlashEffect(overlay);
  document.body.appendChild(overlay);

  document.body.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.2)';
  document.body.style.animation = 'time-warp 2.3s ease-in-out';

  createPortalSounds(buttonText);

  setTimeout(() => {
    if (overlay.parentNode) {
      document.body.removeChild(overlay);
    }
    document.body.style.filter = '';
    document.body.style.animation = '';

    // Fallback: if the anchor click somehow failed, navigate in same tab.
    if (!opened) {
      window.location.href = destinationUrl;
    }
  }, 2300);
};
