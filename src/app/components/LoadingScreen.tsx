import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFE951]"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-pixel text-[#000] text-2xl">LOADING...</h2>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative h-12 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Progress Fill with Animation */}
          <motion.div
            className="h-full bg-[#FF6B6B] relative overflow-hidden"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Animated Stripes */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.2) 10px, rgba(255,255,255,.2) 20px)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          
          {/* Progress Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-pixel text-black mix-blend-difference">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
