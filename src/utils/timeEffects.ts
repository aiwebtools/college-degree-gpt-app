
import { createPortalSounds } from './soundEffects';
import { createPortalVisuals, createFlashEffect } from './visualEffects';
import { addTimePortalStyles } from './portalStyles';

export const createTimePortalEffect = (destinationUrl: string, buttonText?: string) => {
  // Open the window IMMEDIATELY within the user gesture to avoid popup blockers.
  // We navigate it to the destination after the animation completes.
  const newWindow = window.open('about:blank', '_blank', 'noopener,noreferrer');

  // If the popup was still blocked, fall back to same-tab navigation after the animation.
  const popupBlocked = !newWindow;

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

  // Create visual effects
  createPortalVisuals(overlay);
  createFlashEffect(overlay);

  document.body.appendChild(overlay);

  // Apply time warp effect to body
  document.body.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.2)';
  document.body.style.animation = 'time-warp 2.3s ease-in-out';

  // Start sound effects with button context
  createPortalSounds(buttonText);

  // Clean up and redirect after 2.3 seconds
  setTimeout(() => {
    if (overlay.parentNode) {
      document.body.removeChild(overlay);
    }
    document.body.style.filter = '';
    document.body.style.animation = '';

    if (newWindow && !newWindow.closed) {
      // Navigate the already-opened window to the destination
      try {
        newWindow.location.href = destinationUrl;
      } catch {
        // If cross-origin write is blocked for some reason, fall back
        window.location.href = destinationUrl;
      }
    } else if (popupBlocked) {
      // Popup blocker denied our window — fall back to same-tab navigation
      window.location.href = destinationUrl;
    }
  }, 2300);
};
