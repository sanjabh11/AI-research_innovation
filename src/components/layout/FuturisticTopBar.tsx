import React from 'react';

/**
 * Placeholder futuristic top bar component.
 * Replace with real implementation when design is finalized.
 */
interface TopBarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const FuturisticTopBar: React.FC<TopBarProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="w-full bg-gradient-to-r from-aria-blue-700 to-aria-blue-800 text-white p-4 flex items-center justify-between shadow-lg">
      <h1 className="text-lg font-semibold tracking-wide">ARIA Platform</h1>
      <button
        className="mr-4 text-sm opacity-70 hover:opacity-100"
        onClick={onToggleSidebar}
      >
        {isSidebarCollapsed ? '▶' : '◀'}
      </button>
    </header>
  );
};

export default FuturisticTopBar;
