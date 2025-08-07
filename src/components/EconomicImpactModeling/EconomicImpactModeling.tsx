import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  DollarSign,
  ClipboardList,
  TrendingTip,
  BalanceScale,
  Calculator,
  Check,
  AlertCircle,
  Globe,
  Users,
  Briefcase,
  Calendar,
  Filter,
  Download,
  Share2,
  Brain
} from 'lucide-react';

interface EconomicFactor {
  id: string;
  name: string;
  description: string;
  category: 'trade' | 'industry' | 'financial' | 'policy' | 'technology';
  unit: string;
  value: number;
  change: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
}

interface EconomicImpactModel {
  id: string;
  name: string;
  description: string;
  factors: EconomicFactor[];
  totalImpact: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

interface EconomicImpactProps {
  className?: string;
}

const EconomicImpactModeling: React.FC<EconomicImpactProps> = ({ className = '' }) => {
  const [models, setModels] = useState<EconomicImpactModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<EconomicImpactModel | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockModels: EconomicImpactModel[] = [
    {
      id: '1',
      name: 'Global Trade Scenario',
      description: 'Analysis of potential impacts from changing global trade policies.',
      factors: [
        {
          id: 'gdp',
          name: 'GDP Growth',
          description: 'Annual percentage change in GDP',
          category: 'trade',
          unit: '%',
          value: 3.2,
          change: -1.1,
          impact: 'medium'
        },
        {
          id: 'tariffs',
          name: 'Average Tariff Rate',
          description: 'Effect of tariffs on international trade',
          category: 'trade',
          unit: '%',
          value: 5.5,
          change: 1.3,
          impact: 'high'
        }
      ],
      totalImpact: 72,
      trend: 'down',
      confidence: 85
    },
    {
      id: '2',
      name: 'Tech Industry Disruption',
      description: 'Impact of technology advancement and innovation on economic sectors.',
      factors: [
        {
          id: 'productivity',
          name: 'Labor Productivity',
          description: 'Output per labor hour increase due to tech',
          category: 'technology',
          unit: '%',
          value: 4.8,
          change: 0.7,
          impact: 'high'
        },
        {
          id: 'automation',
          name: 'Automation Adoption',
          description: 'Rate of technology integration in industries',
          category: 'technology',
          unit: '%',
          value: 9.3,
          change: 2.1,
          impact: 'critical'
        }
      ],
      totalImpact: 85,
      trend: 'up',
      confidence: 90
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setModels(mockModels);
      setLoading(false);
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
    switch (category) {
      case 'trade': return 'text-blue-600 bg-blue-50';
      case 'industry': return 'text-purple-600 bg-purple-50';
      case 'financial': return 'text-green-600 bg-green-50';
      case 'policy': return 'text-orange-600 bg-orange-50';
      case 'technology': return 'text-teal-600 bg-teal-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
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
            <BarChart3 className="w-8 h-8 text-teal-600" />
            Economic Impact Modeling
          </h1>
          <p className="text-gray-600 mt-2">
            Detailed economic analysis with simulations of trade, finance, and technology impacts
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          <Download className="w-4 h-4" />
          Export Data
        </motion.button>
      </motion.div>

      {/* Models List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedModel(model)}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 cursor-pointer hover:shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                <div className="flex items-center gap-2">
                  {getTrendIcon(model.trend)}
                  <span className="text-sm text-gray-500">
                    Confidence: {model.confidence}%
                  </span>
                </div>
              </div>
              <Gauge className="w-6 h-6 text-teal-600" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {model.factors.map((factor) => (
                <div key={factor.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className={`text-xs font-medium ${getCategoryColor(factor.category)}`}>{factor.name}</div>
                  <div className="text-lg font-bold text-gray-900">{factor.value}{factor.unit}</div>
                  <div className={`text-xs ${factor.change < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {factor.change < 0 ? <TrendingDown className="inline w-4 h-4" /> : <TrendingUp className="inline w-4 h-4" />}
                    {Math.abs(factor.change)}%
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(model.factors[0].impact)}`}>{model.factors[0].impact.toUpperCase()} IMPACT</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EconomicImpactModeling;

