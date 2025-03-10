
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Disclaimer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user has already agreed to the disclaimer
    const hasAgreed = localStorage.getItem('disclaimerAgreed');
    
    if (!hasAgreed) {
      // Show the disclaimer after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgree = () => {
    // Save to localStorage so it doesn't show again
    localStorage.setItem('disclaimerAgreed', 'true');
    setIsOpen(false);
    
    // Show a confirmation toast
    toast({
      title: "Welcome to College Degree GPT!",
      description: "You're ready to start your learning journey.",
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 max-w-md w-full shadow-xl border border-blue-500/30"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
      >
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">i</span>
        </div>
        
        <h2 className="text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200 font-serif">
          Before You Begin
        </h2>
        
        <div className="space-y-4 text-blue-100 mb-6 font-light leading-relaxed">
          <p>
            College Degree GPT provides educational content but is not an accredited institution.
          </p>
          <p>
            The information provided is for learning purposes only and should not be considered a substitute for formal education.
          </p>
        </div>
        
        <Button 
          onClick={handleAgree}
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transform transition duration-200 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Check className="h-5 w-5" />
          <span className="text-lg tracking-wide">I AGREE</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Disclaimer;
