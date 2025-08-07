import React from 'react';

// Temporary placeholder for animated background effects. Replace with production visuals later.
export const BackgroundEffects: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
    {/* TODO: add SVG / canvas animations */}
    <div className="absolute inset-0 bg-gradient-to-br from-aria-blue-500 via-purple-500 to-pink-500 blur-3xl" />
  </div>
);

export default BackgroundEffects;
