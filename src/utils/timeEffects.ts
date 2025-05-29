export const createTimePortalEffect = (destinationUrl: string) => {
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

  // Create flash effect
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

  overlay.appendChild(vortexContainer);
  overlay.appendChild(flash);
  document.body.appendChild(overlay);

  // Apply time warp effect to body
  document.body.style.filter = 'hue-rotate(0deg) saturate(1.5) brightness(1.2)';
  document.body.style.animation = 'time-warp 2.3s ease-in-out';

  // Enhanced sound generation with MUCH LOUDER volumes
  const createSounds = async () => {
    try {
      // Create or resume audio context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      // Resume audio context if it's suspended (required by browsers)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      console.log('Audio context state:', audioContext.state);

      // LOUD Whoosh sound - deep bass rumble
      const createWhooshSound = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(15, audioContext.currentTime + 1.5);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 1.5);
        
        // MUCH LOUDER - increased from 0.4 to 0.8
        gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.5);
      };

      // LOUD Portal opening sound - high-pitched energy
      const createPortalSound = () => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.8);
          
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1500, audioContext.currentTime);
          filter.Q.setValueAtTime(20, audioContext.currentTime);
          
          // MUCH LOUDER - increased from 0.3 to 0.7
          gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.8);
        }, 800);
      };

      // LOUD Zap sound - electrical discharge
      const createZapSound = () => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(3000, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
          
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(1500, audioContext.currentTime);
          
          // MUCH LOUDER - increased from 0.2 to 0.6
          gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
        }, 1500);
      };

      // NEW: Epic Thunder Crack Sound
      const createThunderSound = () => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.3);
          
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(200, audioContext.currentTime);
          
          // VERY LOUD thunder crack
          gainNode.gain.setValueAtTime(0.9, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
        }, 200);
      };

      // NEW: Dimensional Rip Sound
      const createDimensionalRip = () => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          oscillator.frequency.linearRampToValueAtTime(50, audioContext.currentTime + 0.5);
          
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800, audioContext.currentTime);
          filter.Q.setValueAtTime(30, audioContext.currentTime);
          
          // LOUD dimensional rip
          gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
        }, 1200);
      };

      // Play all sounds for maximum effect
      createWhooshSound();
      createThunderSound();
      createPortalSound();
      createDimensionalRip();
      createZapSound();

    } catch (error) {
      console.error('Audio creation failed:', error);
      // Louder fallback sound
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        // MUCH LOUDER fallback - increased from 0.3 to 0.8
        gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (fallbackError) {
        console.error('Fallback audio also failed:', fallbackError);
      }
    }
  };

  // Start sound effects
  createSounds();

  // Clean up and redirect after 2.3 seconds
  setTimeout(() => {
    document.body.removeChild(overlay);
    document.body.style.filter = '';
    document.body.style.animation = '';
    window.open(destinationUrl, '_blank', 'noopener,noreferrer');
  }, 2300);
};

// Add CSS animations to document head
const addTimePortalStyles = () => {
  const styleId = 'time-portal-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes vortex-spin {
      0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.1); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translate(-50%, -50%) rotate(720deg) scale(1.2); opacity: 0.8; }
    }

    @keyframes energy-pulse {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }

    @keyframes particle-explosion {
      0% { 
        transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0px); 
        opacity: 1; 
        scale: 1;
      }
      100% { 
        transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))); 
        opacity: 0; 
        scale: 0;
      }
    }

    @keyframes lightning-flash {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    @keyframes flash-fade {
      0% { opacity: 0; }
      30% { opacity: 0.9; }
      100% { opacity: 0; }
    }

    @keyframes time-warp {
      0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
      50% { filter: hue-rotate(180deg) saturate(2) brightness(1.5); }
      100% { filter: hue-rotate(360deg) saturate(1) brightness(1); }
    }
  `;
  document.head.appendChild(style);
};

// Initialize styles when module loads
addTimePortalStyles();
