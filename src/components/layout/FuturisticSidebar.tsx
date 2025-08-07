import React from 'react';

/**
 * Placeholder futuristic sidebar component.
 * Replace with real implementation when design is finalized.
 */
interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export const FuturisticSidebar: React.FC<SidebarProps> = ({ isCollapsed, onCollapse }) => {
  return (
    <aside
      className={`transition-width duration-500 bg-gradient-to-b from-aria-blue-700 to-aria-blue-800 text-white overflow-hidden ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
>
      <button
        className="absolute top-4 right-4 text-xs opacity-70 hover:opacity-100"
        onClick={() => onCollapse(!isCollapsed)}
      >
        {isCollapsed ? '▶' : '◀'}
      </button>
      {/* TODO: sidebar links */}
    </aside>
  );
};

export default FuturisticSidebar;
