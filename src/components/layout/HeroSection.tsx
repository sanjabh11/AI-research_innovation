import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  backgroundImageUrl: string;
}

/**
 * Responsive full-width hero section with glassmorphic blurred overlay and smooth fade-in on scroll.
 * Usage:
 * <HeroSection title="..." subtitle="..." backgroundImageUrl="/images/hero.jpg" cta={<Button>Start</Button>} />
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, cta, backgroundImageUrl }) => {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl px-6 py-12 md:px-16 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        {subtitle && <p className="text-lg md:text-2xl text-white/90 mb-8 leading-relaxed max-w-prose mx-auto">{subtitle}</p>}
        {cta && <div className="flex justify-center">{cta}</div>}
      </motion.div>
    </section>
  );
};
