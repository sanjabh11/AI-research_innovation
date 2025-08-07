import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Eye,
  Filter,
  Clock,
  Globe,
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  Zap,
  Activity,
  MapPin,
  Calendar,
  Search,
  Settings,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Download,
  Share2,
  Play,
  Pause
} from 'lucide-react';

interface CrisisAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'political' | 'economic' | 'military' | 'social' | 'environmental' | 'cyber';
  region: string;
  country: string;
  coordinates: [number, number];
  timestamp: string;
  source: string;
  confidence: number;
  status: 'active' | 'monitoring' | 'resolved';
  tags: string[];
  relatedEvents: string[];
  impactScore: number;
}

interface MonitoringMetrics {
  totalAlerts: number;
  activeAlerts: number;
  criticalAlerts: number;
  newAlertsToday: number;
  averageResponseTime: number;
  globalThreatLevel: number;
}

interface CrisisMonitoringProps {
  className?: string;
}

const CrisisMonitoring: React.FC<CrisisMonitoringProps> = ({ className = '' }) => {
  const [alerts, setAlerts] = useState<CrisisAlert[]>([]);
  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  // Mock data
  const mockAlerts: CrisisAlert[] = [
    {
      id: '1',
      title: 'Escalating Border Tensions',
      description: 'Military movements detected near disputed border region with increased troop deployments and equipment positioning.',
      severity: 'critical',
      category: 'military',
      region: 'Eastern Europe',
      country: 'Ukraine',
      coordinates: [49.8397, 24.0297],
      timestamp: '2024-01-15T14:30:00Z',
      source: 'Satellite Intelligence',
      confidence: 92,
      status: 'active',
      tags: ['military', 'border-conflict', 'troop-movement'],
      relatedEvents: ['territorial-dispute', 'diplomatic-breakdown'],
      impactScore: 85
    },
    {
      id: '2',
      title: 'Economic Sanctions Package',
      description: 'Major economic powers announce coordinated sanctions targeting key financial institutions and energy sector.',
      severity: 'high',
      category: 'economic',
      region: 'Global',
      country: 'Multiple',
      coordinates: [0, 0],
      timestamp: '2024-01-15T12:15:00Z',
      source: 'Financial Intelligence',
      confidence: 88,
      status: 'monitoring',
      tags: ['sanctions', 'economic-warfare', 'financial-markets'],
      relatedEvents: ['trade-restrictions', 'currency-volatility'],
      impactScore: 78
    },
    {
      id: '3',
      title: 'Cyber Infrastructure Attack',
      description: 'Critical infrastructure systems targeted by sophisticated cyber attack affecting power grid and communications.',
      severity: 'critical',
      category: 'cyber',
      region: 'North America',
      country: 'United States',
      coordinates: [39.8283, -98.5795],
      timestamp: '2024-01-15T11:45:00Z',
      source: 'Cyber Threat Intelligence',
      confidence: 95,
      status: 'active',
      tags: ['cyberattack', 'infrastructure', 'power-grid'],
      relatedEvents: ['ransomware', 'state-sponsored'],
      impactScore: 91
    },
    {
      id: '4',
      title: 'Political Unrest Spreading',
      description: 'Protests escalating in multiple cities following controversial government policy announcement.',
      severity: 'medium',
      category: 'political',
      region: 'South America',
      country: 'Brazil',
      coordinates: [-14.2350, -51.9253],
      timestamp: '2024-01-15T10:30:00Z',
      source: 'Social Media Intelligence',
      confidence: 76,
      status: 'monitoring',
      tags: ['protests', 'civil-unrest', 'government-policy'],
      relatedEvents: ['social-movement', 'economic-grievances'],
      impactScore: 64
    },
    {
      id: '5',
      title: 'Natural Disaster Response',
      description: 'Major earthquake triggers regional emergency response and potential humanitarian crisis.',
      severity: 'high',
      category: 'environmental',
      region: 'Asia-Pacific',
      country: 'Japan',
      coordinates: [36.2048, 138.2529],
      timestamp: '2024-01-15T09:15:00Z',
      source: 'Seismic Monitoring',
      confidence: 99,
      status: 'active',
      tags: ['earthquake', 'humanitarian-crisis', 'emergency-response'],
      relatedEvents: ['tsunami-warning', 'infrastructure-damage'],
      impactScore: 72
    }
  ];

  const mockMetrics: MonitoringMetrics = {
    totalAlerts: 127,
    activeAlerts: 23,
    criticalAlerts: 6,
    newAlertsToday: 15,
    averageResponseTime: 8.5,
    globalThreatLevel: 73
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setAlerts(mockAlerts);
      setMetrics(mockMetrics);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        const shouldUpdate = Math.random() > 0.8;
        if (shouldUpdate) {
          setAlerts(prev => 
            prev.map(alert => ({
              ...alert,
              confidence: Math.max(50, Math.min(100, alert.confidence + (Math.random() - 0.5) * 5))
            }))
          );
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'political': return <Users className="w-4 h-4" />;
      case 'economic': return <TrendingDown className="w-4 h-4" />;
      case 'military': return <Shield className="w-4 h-4" />;
      case 'social': return <Globe className="w-4 h-4" />;
      case 'environmental': return <AlertTriangle className="w-4 h-4" />;
      case 'cyber': return <Zap className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'monitoring': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = selectedFilter === 'all' || alert.category === selectedFilter;
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSeverity && matchesSearch;
  });

  const categories = ['all', 'political', 'economic', 'military', 'social', 'environmental', 'cyber'];
  const severities = ['all', 'low', 'medium', 'high', 'critical'];

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Crisis Monitoring Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time global threat monitoring and alert management system
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              isRealTimeEnabled 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isRealTimeEnabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            Real-time {isRealTimeEnabled ? 'ON' : 'OFF'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics Dashboard */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.totalAlerts}</div>
            <div className="text-sm text-gray-600">Total Alerts</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.activeAlerts}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.criticalAlerts}</div>
            <div className="text-sm text-gray-600">Critical Alerts</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.newAlertsToday}</div>
            <div className="text-sm text-gray-600">New Today</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.averageResponseTime}m</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.globalThreatLevel}%</div>
            <div className="text-sm text-gray-600">Threat Level</div>
          </div>
        </motion.div>
      )}

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Category:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-6 h-6 text-red-600" />
              Active Alerts ({filteredAlerts.length})
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        {getCategoryIcon(alert.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            Confidence: {alert.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{alert.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {alert.region} - {alert.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {alert.source}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {alert.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {alert.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{alert.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {alert.impactScore}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">Impact Score</div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No alerts match your current filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CrisisMonitoring;
