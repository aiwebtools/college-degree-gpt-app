
export const createPortalVisuals = (container: HTMLElement) => {
  // Create vortex container
  const vortexContainer = document.createElement('div');
  vortexContainer.style.cssText = `
    position: relative;
    width: 300px;
    height: 300px;
    animation: vortex-spin 2.3s ease-in-out;
  `;

  // Create multiple vortex rings
  for (let i = 0; i < 8; i++) {
    const ring = document.createElement('div');
    ring.className = 'vortex-ring';
    ring.style.cssText = `
      position: absolute;
      border-radius: 50%;
      border: 3px solid;
      border-color: hsl(${i * 45}, 100%, 60%) transparent hsl(${i * 45 + 180}, 100%, 60%) transparent;
      width: ${50 + i * 30}px;
      height: ${50 + i * 30}px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: vortex-spin ${1 + i * 0.2}s linear infinite reverse;
      filter: blur(${i * 0.3}px) drop-shadow(0 0 10px currentColor);
    `;
    vortexContainer.appendChild(ring);
  }

  // Create energy waves
  for (let i = 0; i < 5; i++) {
    const wave = document.createElement('div');
    wave.className = 'energy-wave';
    wave.style.cssText = `
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.6);
      width: ${100 + i * 50}px;
      height: ${100 + i * 50}px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: energy-pulse ${1.5 + i * 0.3}s ease-out infinite;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 20px rgba(255, 0, 255, 0.6);
    `;
    vortexContainer.appendChild(wave);
  }

  // Create particle explosion
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';
    const angle = (i / 20) * 360;
    const distance = 150 + Math.random() * 100;
    particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: hsl(${Math.random() * 360}, 100%, 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: particle-explosion 2.3s ease-out forwards;
      box-shadow: 0 0 10px currentColor;
      --angle: ${angle}deg;
      --distance: ${distance}px;
    `;
    vortexContainer.appendChild(particle);
  }

  // Create lightning bolts
  for (let i = 0; i < 6; i++) {
    const lightning = document.createElement('div');
    lightning.className = 'lightning-bolt';
    lightning.style.cssText = `
      position: absolute;
      width: 2px;
      height: 200px;
      background: linear-gradient(to bottom, 
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 255, 255, 0.8) 30%,
        rgba(255, 0, 255, 0.8) 70%,
        transparent 100%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(${i * 60}deg);
      animation: lightning-flash 0.3s ease-in-out infinite alternate;
      filter: blur(1px) drop-shadow(0 0 15px currentColor);
      animation-delay: ${i * 0.1}s;
    `;
    vortexContainer.appendChild(lightning);
  }

  container.appendChild(vortexContainer);
  return vortexContainer;
};

export const createFlashEffect = (container: HTMLElement) => {
  const flash = document.createElement('div');
  flash.className = 'portal-flash';
  flash.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, 
      rgba(255, 255, 255, 0.9) 0%,
      rgba(0, 255, 255, 0.7) 30%,
      rgba(255, 0, 255, 0.5) 60%,
      transparent 100%);
    animation: flash-fade 2.3s ease-in-out;
  `;
  
  container.appendChild(flash);
  return flash;
};
