import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.1em", opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                TREND FOCUS
              </motion.h1>
            </motion.div>
            
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.5 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            
            <motion.div
              className="mt-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
