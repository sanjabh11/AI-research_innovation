import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticSidebar } from './FuturisticSidebar';
import { FuturisticTopBar } from './FuturisticTopBar';
import { BackgroundEffects } from './BackgroundEffects';
import { useNotificationStore } from '../../stores/notificationStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    // Fetch notifications on mount
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-primary">
      {/* Ambient Background Effects */}
      <BackgroundEffects />
      
      {/* Futuristic Floating Top Bar */}
      <FuturisticTopBar 
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <div className="flex relative z-10">
        {/* Glassmorphism Minimalist Sidebar */}
        <FuturisticSidebar 
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
        
        {/* Main Workspace Area */}
        <motion.main 
          className={`flex-1 transition-all duration-500 ease-out pt-20 min-h-screen ${
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <motion.div
              className="relative z-20"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
