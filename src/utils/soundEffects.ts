
export const createPortalSounds = async () => {
  try {
    // Check if speech synthesis is available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('ACTIVE');
      
      // Configure robot-like voice settings
      utterance.rate = 0.7; // Slower speech rate for robot effect
      utterance.pitch = 0.3; // Lower pitch for robot voice
      utterance.volume = 1.0; // Maximum volume
      
      // Try to find a more robotic voice
      const voices = speechSynthesis.getVoices();
      const robotVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('male') || 
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('alex')
      );
      
      if (robotVoice) {
        utterance.voice = robotVoice;
      }
      
      console.log('Playing robot voice: ACTIVE');
      speechSynthesis.speak(utterance);
      
      // Add a second "ACTIVE" with slight delay for emphasis
      setTimeout(() => {
        const utterance2 = new SpeechSynthesisUtterance('ACTIVE');
        utterance2.rate = 0.6;
        utterance2.pitch = 0.2;
        utterance2.volume = 0.8;
        if (robotVoice) {
          utterance2.voice = robotVoice;
        }
        speechSynthesis.speak(utterance2);
      }, 800);
      
    } else {
      // Fallback to a simple beep if speech synthesis not available
      console.log('Speech synthesis not available, using fallback');
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
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
    }

  } catch (error) {
    console.error('Audio creation failed:', error);
  }
};
