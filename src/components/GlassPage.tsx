import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassPageProps {
  children: ReactNode;
}

export const GlassPage = ({ children }: GlassPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Animated glassy radial glows in the background */}
      <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.38),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.28),_transparent_60%)] opacity-80 animate-pulse" />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
