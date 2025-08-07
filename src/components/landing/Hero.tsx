import React from 'react';
import { HeroSection } from '../layout/HeroSection';

export const Hero: React.FC = () => (
  <HeroSection
    title="ARIA: Autonomous Research & Innovation Engine"
    subtitle="Accelerate discovery, generate new inventions, and map the patent landscape—all on one platform."
    backgroundImageUrl="/images/hero-bg.jpg"
    cta={null}
  />
);
