
export const createPortalSounds = async (buttonText?: string) => {
  try {
    // Play the custom audio clip
    const audio = new Audio('/audio/portal-sound.mp3');
    audio.volume = 1.0;
    
    // Play the audio
    await audio.play();
    console.log('Playing custom portal sound');

  } catch (error) {
    console.error('Audio playback failed:', error);
    
    // Fallback to a simple beep if audio fails
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1.0);
    } catch (fallbackError) {
      console.error('Fallback audio also failed:', fallbackError);
    }
  }
};
