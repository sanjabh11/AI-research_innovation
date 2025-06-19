import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import {
  LayoutDashboard,
  Search,
  FileText,
  Lightbulb,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Zap,
  BookOpen,
  Shield,
  TrendingUp,
  Briefcase,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview and insights',
      badge: null
    },
    {
      name: 'Research',
      href: '/research',
      icon: BookOpen,
      description: 'Literature and analysis',
      badge: null
    },
    {
      name: 'Patents',
      href: '/patents',
      icon: Shield,
      description: 'IP landscape and search',
      badge: null
    },
    {
      name: 'Inventions',
      href: '/inventions',
      icon: Lightbulb,
      description: 'Innovation pipeline',
      badge: null
    },
    {
      name: 'Collaborate',
      href: '/collaborate',
      icon: Users,
      description: 'Team and partnerships',
      badge: 'New'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Performance metrics',
      badge: 'Pro'
    },
  ];

  const secondaryNavigation = [
    {
      name: 'Market Intelligence',
      href: '/market',
      icon: TrendingUp,
      description: 'Commercial insights',
      badge: 'Beta'
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: Briefcase,
      description: 'IP management',
      badge: 'Pro'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account preferences',
      badge: null
    },
    {
      name: 'Help & Support',
      href: '/help',
      icon: HelpCircle,
      description: 'Documentation',
      badge: null
    },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:translate-x-0",
          !isOpen && "md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="text-lg font-semibold text-gray-900">Navigation</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="mb-8">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4"
              >
                Main
              </motion.h2>
              <div className="space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-aria-blue-50 to-aria-purple-50 text-aria-blue-700 shadow-sm border border-aria-blue-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-aria-blue-600 to-aria-purple-600 rounded-r"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        
                        <Icon
                          className={cn(
                            "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                            isActive
                              ? "text-aria-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === 'Pro' ? 'default' : 'secondary'} 
                                className="text-xs ml-2"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Secondary Navigation */}
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4"
              >
                Tools
              </motion.h2>
              <div className="space-y-2">
                {secondaryNavigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.name}
                      custom={index + navigation.length}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-aria-blue-50 to-aria-purple-50 text-aria-blue-700 shadow-sm border border-aria-blue-100"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabSecondary"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-aria-blue-600 to-aria-purple-600 rounded-r"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        
                        <Icon
                          className={cn(
                            "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                            isActive
                              ? "text-aria-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === 'Pro' ? 'default' : 'secondary'} 
                                className="text-xs ml-2"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <motion.div 
            className="border-t p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-aria-blue-50 via-aria-purple-50 to-aria-blue-50 border border-aria-blue-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl aria-gradient shadow-sm">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">ARIA Pro</p>
                <p className="text-xs text-gray-600">Unlimited AI analysis</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}