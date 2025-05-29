
export const createPortalSounds = async (buttonText?: string) => {
  try {
    // Check if speech synthesis is available
    if ('speechSynthesis' in window) {
      // Determine robot voice response based on button text
      let robotMessage = 'ACTIVE'; // Default message
      
      if (buttonText) {
        const lowerText = buttonText.toLowerCase();
        
        if (lowerText.includes('start learning') || lowerText.includes('college degree gpt')) {
          robotMessage = 'Loading College Degree GPT Now Master';
        } else if (lowerText.includes('explore more ai tools') || lowerText.includes('more ai tools')) {
          robotMessage = 'Loading More AI Tools Now Master';
        } else if (lowerText.includes('aiwebtools') || lowerText.includes('ai web tools')) {
          robotMessage = 'Accessing AI Web Tools Portal Master';
        } else if (lowerText.includes('quiz maker')) {
          robotMessage = 'Initializing Quiz Maker GPT Master';
        } else if (lowerText.includes('learn any course')) {
          robotMessage = 'Loading Learn Any Course GPT Master';
        } else if (lowerText.includes('learn any skill')) {
          robotMessage = 'Activating Learn Any Skill GPT Master';
        } else if (lowerText.includes('talk to history')) {
          robotMessage = 'Connecting to Talk to History GPT Master';
        } else if (lowerText.includes('save') || lowerText.includes('download')) {
          robotMessage = 'Downloading Educational Resources Master';
        } else if (lowerText.includes('google') || lowerText.includes('certificate')) {
          robotMessage = 'Redirecting to Google Certification Portal Master';
        } else {
          robotMessage = 'Portal Activated Master';
        }
      }
      
      const utterance = new SpeechSynthesisUtterance(robotMessage);
      
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
      
      console.log('Playing robot voice:', robotMessage);
      speechSynthesis.speak(utterance);
      
      // Add a second confirmation with slight delay for emphasis
      setTimeout(() => {
        const confirmationMessage = 'Portal Sequence Complete';
        const utterance2 = new SpeechSynthesisUtterance(confirmationMessage);
        utterance2.rate = 0.6;
        utterance2.pitch = 0.2;
        utterance2.volume = 0.8;
        if (robotVoice) {
          utterance2.voice = robotVoice;
        }
        speechSynthesis.speak(utterance2);
      }, 1200);
      
    } else {
      // Fallback to a simple beep if speech synthesis not available
      console.log('Speech synthesis not available, using fallback');
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
    }

  } catch (error) {
    console.error('Audio creation failed:', error);
  }
};
