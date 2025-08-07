import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Filter,
  Download,
  Share2,
  Brain,
  Zap,
  Target,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  RefreshCw,
  Eye,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface PredictionModel {
  id: string;
  name: string;
  category: 'political' | 'economic' | 'security' | 'social' | 'environmental';
  accuracy: number;
  confidence: number;
  timeframe: string;
  description: string;
  lastUpdated: string;
}

interface Prediction {
  id: string;
  modelId: string;
  title: string;
  description: string;
  category: string;
  probability: number;
  confidence: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  keyFactors: string[];
  riskLevel: number;
  opportunities: string[];
  timestamp: string;
}

interface TrendData {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  previousValue: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  forecast: { date: string; value: number; confidence: number }[];
  unit: string;
}

interface PredictiveAnalyticsProps {
  className?: string;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ className = '' }) => {
  const [models, setModels] = useState<PredictionModel[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'predictions' | 'trends' | 'models'>('predictions');

  // Mock data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockModels: PredictionModel[] = [
    {
      id: '1',
      name: 'Political Stability Predictor',
      category: 'political',
      accuracy: 87.3,
      confidence: 92,
      timeframe: '30-90 days',
      description: 'Advanced ML model for predicting political stability changes',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Economic Crisis Early Warning',
      category: 'economic',
      accuracy: 91.2,
      confidence: 88,
      timeframe: '60-180 days',
      description: 'Economic indicators analysis for crisis prediction',
      lastUpdated: '2024-01-15T09:45:00Z'
    },
    {
      id: '3',
      name: 'Security Threat Assessment',
      category: 'security',
      accuracy: 84.7,
      confidence: 90,
      timeframe: '7-30 days',
      description: 'Multi-source intelligence for security threat prediction',
      lastUpdated: '2024-01-15T11:15:00Z'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockPredictions: Prediction[] = [
    {
      id: '1',
      modelId: '1',
      title: 'Potential Political Tensions in Eastern Europe',
      description: 'Model predicts increasing likelihood of political tensions escalating based on diplomatic patterns and social indicators.',
      category: 'Political',
      probability: 78,
      confidence: 85,
      timeframe: '45-60 days',
      impact: 'high',
      region: 'Eastern Europe',
      keyFactors: ['Diplomatic communications breakdown', 'Economic sanctions impact', 'Public sentiment shift'],
      riskLevel: 73,
      opportunities: ['Diplomatic intervention window', 'Economic cooperation alternatives'],
      timestamp: '2024-01-15T12:00:00Z'
    },
    {
      id: '2',
      modelId: '2',
      title: 'Economic Volatility in Emerging Markets',
      description: 'High probability of increased market volatility in emerging economies due to global financial pressures.',
      category: 'Economic',
      probability: 82,
      confidence: 91,
      timeframe: '90-120 days',
      impact: 'medium',
      region: 'Global',
      keyFactors: ['Interest rate changes', 'Currency fluctuations', 'Trade policy uncertainties'],
      riskLevel: 65,
      opportunities: ['Investment diversification', 'Currency hedging strategies'],
      timestamp: '2024-01-15T11:30:00Z'
    },
    {
      id: '3',
      modelId: '3',
      title: 'Cybersecurity Threat Spike',
      description: 'Elevated risk of coordinated cyber attacks targeting critical infrastructure in Q2.',
      category: 'Security',
      probability: 71,
      confidence: 88,
      timeframe: '30-45 days',
      impact: 'critical',
      region: 'North America',
      keyFactors: ['Increased threat actor activity', 'Infrastructure vulnerabilities', 'Geopolitical tensions'],
      riskLevel: 81,
      opportunities: ['Security system upgrades', 'International cooperation enhancement'],
      timestamp: '2024-01-15T10:45:00Z'
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockTrends: TrendData[] = [
    {
      id: '1',
      name: 'Global Political Risk Index',
      category: 'political',
      currentValue: 68.5,
      previousValue: 64.2,
      trend: 'up',
      change: 6.7,
      forecast: [
        { date: '2024-02-01', value: 69.2, confidence: 87 },
        { date: '2024-02-15', value: 71.8, confidence: 82 },
        { date: '2024-03-01', value: 73.1, confidence: 78 },
        { date: '2024-03-15', value: 74.6, confidence: 74 }
      ],
      unit: 'index'
    },
    {
      id: '2',
      name: 'Economic Stability Score',
      category: 'economic',
      currentValue: 72.3,
      previousValue: 75.8,
      trend: 'down',
      change: -4.6,
      forecast: [
        { date: '2024-02-01', value: 71.1, confidence: 89 },
        { date: '2024-02-15', value: 69.8, confidence: 85 },
        { date: '2024-03-01', value: 68.5, confidence: 81 },
        { date: '2024-03-15', value: 67.2, confidence: 77 }
      ],
      unit: 'score'
    },
    {
      id: '3',
      name: 'Security Alert Frequency',
      category: 'security',
      currentValue: 24,
      previousValue: 19,
      trend: 'up',
      change: 26.3,
      forecast: [
        { date: '2024-02-01', value: 26, confidence: 92 },
        { date: '2024-02-15', value: 28, confidence: 88 },
        { date: '2024-03-01', value: 31, confidence: 84 },
        { date: '2024-03-15', value: 33, confidence: 80 }
      ],
      unit: 'alerts/week'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { data: modelsData, error: modelsError } = await supabase.from('analytics_models').select('*');
        const { data: predictionsData, error: predsError } = await supabase.from('predictions').select('*');
        const { data: riskData, error: riskError } = await supabase.from('risk_metrics').select('*');

        if (modelsError) console.error(modelsError);
        if (predsError) console.error(predsError);
        if (riskError) console.error(riskError);

        setModels((modelsData as any) || []);
        setPredictions((predictionsData as any) || []);

        const mappedTrends = (riskData || []).map((r: any) => ({
          id: r.id,
          name: r.metric?.name ?? 'Metric',
          category: r.metric?.category ?? 'general',
          currentValue: r.metric?.currentValue ?? 0,
          previousValue: r.metric?.previousValue ?? 0,
          trend: r.metric?.trend ?? 'stable',
          change: r.metric?.change ?? 0,
          forecast: r.metric?.forecast ?? [],
          unit: r.metric?.unit ?? ''
        }));
        setTrends(mappedTrends);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'political': return 'text-blue-600 bg-blue-50';
      case 'economic': return 'text-green-600 bg-green-50';
      case 'security': return 'text-red-600 bg-red-50';
      case 'social': return 'text-purple-600 bg-purple-50';
      case 'environmental': return 'text-teal-600 bg-teal-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const categories = ['all', 'political', 'economic', 'security', 'social', 'environmental'];
  const timeframes = ['7d', '30d', '90d', '180d', '1y'];

  const filteredPredictions = selectedCategory === 'all' 
    ? predictions 
    : predictions.filter(p => p.category.toLowerCase() === selectedCategory);

  const filteredTrends = selectedCategory === 'all' 
    ? trends 
    : trends.filter(t => t.category === selectedCategory);

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
            <Brain className="w-8 h-8 text-blue-600" />
            Predictive Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            AI-powered trend forecasting and geopolitical outcome prediction
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            Update Models
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit"
      >
        {[
          { id: 'predictions', label: 'Predictions', icon: Target },
          { id: 'trends', label: 'Trends', icon: LineChart },
          { id: 'models', label: 'Models', icon: Settings }
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Timeframe:</span>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {timeframes.map(timeframe => (
              <option key={timeframe} value={timeframe}>
                {timeframe.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Predictions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(prediction.category)}`}>
                          {prediction.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(prediction.impact)}`}>
                          {prediction.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{prediction.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{prediction.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium">Probability</div>
                      <div className="text-2xl font-bold text-blue-900">{prediction.probability}%</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-green-600 font-medium">Confidence</div>
                      <div className="text-2xl font-bold text-green-900">{prediction.confidence}%</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Key Factors</div>
                      <div className="flex flex-wrap gap-1">
                        {prediction.keyFactors.slice(0, 2).map((factor, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {factor}
                          </span>
                        ))}
                        {prediction.keyFactors.length > 2 && (
                          <span className="text-xs text-gray-500">+{prediction.keyFactors.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{prediction.region}</span>
                      <span>{prediction.timeframe}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Trends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrends.map((trend, index) => (
                <motion.div
                  key={trend.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(trend.category)}`}>
                      {trend.category.toUpperCase()}
                    </div>
                    {getTrendIcon(trend.trend)}
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{trend.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {trend.currentValue}
                    </div>
                    <div className="text-sm">
                      <div className={`flex items-center gap-1 ${
                        trend.change > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {trend.change > 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {Math.abs(trend.change).toFixed(1)}%
                      </div>
                      <div className="text-gray-500">{trend.unit}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-medium text-gray-700">30-Day Forecast</div>
                    <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-between px-2 py-1">
                      {trend.forecast.slice(0, 4).map((point, i) => (
                        <div
                          key={i}
                          className="bg-blue-500 rounded-sm w-3 opacity-75"
                          style={{ 
                            height: `${(point.value / Math.max(...trend.forecast.map(f => f.value))) * 100}%`,
                            opacity: point.confidence / 100
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Avg Confidence: {Math.round(trend.forecast.reduce((acc, f) => acc + f.confidence, 0) / trend.forecast.length)}%</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'models' && (
          <motion.div
            key="models"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Models Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(model.category)}`}>
                      {model.category.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">ACTIVE</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-2">{model.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{model.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium">Accuracy</div>
                      <div className="text-lg font-bold text-blue-900">{model.accuracy}%</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-green-600 font-medium">Confidence</div>
                      <div className="text-lg font-bold text-green-900">{model.confidence}%</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium">{model.timeframe}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{new Date(model.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Configure
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictiveAnalytics;
