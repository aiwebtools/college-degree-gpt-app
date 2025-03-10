
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

const Disclaimer: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setShowDisclaimer(false);
    
    toast({
      title: "Welcome aboard!",
      description: "Thanks for accepting our terms. Enjoy your learning journey!",
      duration: 3000,
    });
  };

  if (!showDisclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full mx-4 p-6 rounded-xl shadow-lg animate-scale-in" 
           style={{
             background: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
           }}>
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white/90 p-3 rounded-full shadow-lg">
          <Info className="h-8 w-8 text-pink-500" />
        </div>
        
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold mb-3 text-white drop-shadow-md" 
              style={{ fontFamily: "'Poppins', sans-serif" }}>
            Important Notice
          </h2>
          
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg mb-4">
            <p className="text-slate-800 font-medium mb-3">
              This platform provides AI-generated educational content for informational purposes only.
            </p>
            <p className="text-slate-800 mb-3">
              While we strive for accuracy, all content should be verified through official academic sources.
            </p>
            <p className="text-slate-800 font-medium">
              By clicking "I Agree," you acknowledge this disclaimer and our terms of service.
            </p>
          </div>
          
          <Button 
            onClick={handleAgree}
            className="w-full py-6 text-lg font-bold transition-all bg-white hover:bg-white/90 text-pink-500 hover:text-pink-600 hover:scale-105 active:scale-95 shadow-md"
          >
            <Check className="mr-2 h-5 w-5" />
            I AGREE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
