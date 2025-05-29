
export const addTimePortalStyles = () => {
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
