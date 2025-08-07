import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Shield, 
  Activity,
  ChevronRight,
  Filter,
  BarChart3,
  Map,
  RefreshCw
} from 'lucide-react';

interface RiskMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  lastUpdated: string;
  description: string;
}

interface GeopoliticalEvent {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  impact: number;
  timestamp: string;
  sources: string[];
}

interface RiskAssessmentProps {
  className?: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ className = '' }) => {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);
  const [events, setEvents] = useState<GeopoliticalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockRiskMetrics: RiskMetric[] = [
    {
      id: '1',
      name: 'Global Political Stability',
      value: 72,
      change: -3.2,
      severity: 'medium',
      category: 'Political',
      lastUpdated: '2024-01-15T10:30:00Z',
      description: 'Overall assessment of global political stability based on multiple indicators'
    },
    {
      id: '2',
      name: 'Economic Volatility Index',
      value: 68,
      change: 1.8,
      severity: 'medium',
      category: 'Economic',
      lastUpdated: '2024-01-15T10:25:00Z',
      description: 'Measures economic uncertainty and market volatility'
    },
    {
      id: '3',
      name: 'Cyber Security Threat Level',
      value: 85,
      change: 5.4,
      severity: 'high',
      category: 'Security',
      lastUpdated: '2024-01-15T10:20:00Z',
      description: 'Current cybersecurity threat landscape assessment'
    },
    {
      id: '4',
      name: 'Trade Conflict Index',
      value: 45,
      change: -2.1,
      severity: 'low',
      category: 'Economic',
      lastUpdated: '2024-01-15T10:15:00Z',
      description: 'Assessment of global trade tensions and conflicts'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mockEvents: GeopoliticalEvent[] = [
    {
      id: '1',
      title: 'Rising Tensions in Eastern Europe',
      description: 'Increased military activity and diplomatic tensions observed in the region',
      severity: 'high',
      region: 'Europe',
      impact: 78,
      timestamp: '2024-01-15T09:45:00Z',
      sources: ['Reuters', 'BBC', 'Associated Press']
    },
    {
      id: '2',
      title: 'Trade Agreement Negotiations',
      description: 'Multi-lateral trade discussions showing positive progress',
      severity: 'low',
      region: 'Asia-Pacific',
      impact: 32,
      timestamp: '2024-01-15T08:30:00Z',
      sources: ['Financial Times', 'Wall Street Journal']
    },
    {
      id: '3',
      title: 'Cybersecurity Incident',
      description: 'Major infrastructure targeted by sophisticated cyber attack',
      severity: 'critical',
      region: 'North America',
      impact: 91,
      timestamp: '2024-01-15T07:15:00Z',
      sources: ['CyberScoop', 'Security Week']
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { data: riskData, error: riskError } = await supabase.from('risk_metrics').select('*');
        if (riskError) console.error(riskError);
        setRiskMetrics((riskData as any) || []);
        // TODO: Replace mockEvents with real events table when available
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Simulate updated data
    setRiskMetrics(prev => 
      prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        change: (Math.random() - 0.5) * 10,
        lastUpdated: new Date().toISOString()
      }))
    );
    setRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-green-200';
      case 'medium': return 'border-yellow-200';
      case 'high': return 'border-orange-200';
      case 'critical': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };

  const categories = ['all', 'Political', 'Economic', 'Security'];
  const filteredMetrics = selectedCategory === 'all' 
    ? riskMetrics 
    : riskMetrics.filter(metric => metric.category === selectedCategory);

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
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
            <Shield className="w-8 h-8 text-blue-600" />
            Risk Assessment Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time geopolitical risk analysis and monitoring
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Risk Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg border-2 ${getSeverityBorder(metric.severity)} p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(metric.severity)}`}>
                  {metric.severity.toUpperCase()}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}%</div>
                  <div className={`text-sm flex items-center ${
                    metric.change > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {metric.change > 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(metric.change).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{metric.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{metric.category}</span>
                <span>Updated {new Date(metric.lastUpdated).toLocaleTimeString()}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Recent Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-600" />
            Recent Geopolitical Events
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`border-l-4 ${getSeverityBorder(event.severity)} pl-4 py-3 hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {event.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      Impact: {event.impact}%
                    </span>
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-gray-900">{event.impact}</div>
                  <div className="text-xs text-gray-500">Impact Score</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <Map className="w-6 h-6" />
          <div className="text-left">
            <div className="font-semibold">Regional Analysis</div>
            <div className="text-sm opacity-90">Detailed regional risk breakdown</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <BarChart3 className="w-6 h-6" />
          <div className="text-left">
            <div className="font-semibold">Historical Trends</div>
            <div className="text-sm opacity-90">View risk evolution over time</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl flex items-center gap-3 hover:shadow-lg transition-shadow"
        >
          <AlertTriangle className="w-6 h-6" />
          <div className="text-left">
            <div className="font-semibold">Alert Settings</div>
            <div className="text-sm opacity-90">Configure risk notifications</div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RiskAssessment;
