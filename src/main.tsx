
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Facebook browser detection
const isFacebookBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (
    userAgent.indexOf("FBAN") > -1 || 
    userAgent.indexOf("FBAV") > -1 || 
    userAgent.indexOf("Instagram") > -1
  );
};

// Apply Facebook-specific fixes if needed
if (isFacebookBrowser()) {
  // Force redraw on Facebook browser
  document.body.style.WebkitTransform = 'scale(1)';
  
  // Additional workaround for Facebook browser rendering issues
  window.addEventListener('load', () => {
    setTimeout(() => {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        (viewport as HTMLMetaElement).content = 'width=device-width, initial-scale=1.0';
        setTimeout(() => {
          (viewport as HTMLMetaElement).content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }, 100);
      }
    }, 300);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
