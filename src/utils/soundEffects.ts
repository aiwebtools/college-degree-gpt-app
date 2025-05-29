
export const createPortalSounds = async () => {
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
        
        gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      }, 1500);
    };

    // Epic Thunder Crack Sound
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
        
        gainNode.gain.setValueAtTime(0.9, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      }, 200);
    };

    // Dimensional Rip Sound
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
      gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (fallbackError) {
      console.error('Fallback audio also failed:', fallbackError);
    }
  }
};
