import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Settings,
  ClipboardList,
  Calendar,
  RefreshCw,
  LineChart
} from 'lucide-react';

interface ModelPerformance {
  id: string;
  modelName: string;
  historicalAccuracy: number;
  currentAccuracy: number;
  improvement: number;
  recommendations: string[];
  historicalData: number[];
  timestamps: string[];
}

interface ModelBacktestingProps {
  className?: string;
}

const ModelBacktesting: React.FC<ModelBacktestingProps> = ({ className = '' }) => {
  const [models, setModels] = useState<ModelPerformance[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelPerformance | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockModels: ModelPerformance[] = [
    {
      id: '1',
      modelName: 'Economic Forecasting Model',
      historicalAccuracy: 78.5,
      currentAccuracy: 83.2,
      improvement: 4.7,
      recommendations: [
        'Incorporate real-time financial data',
        'Improve feature scaling methods',
        'Regularize non-linear factors'
      ],
      historicalData: [75, 76, 77, 78, 78.5],
      timestamps: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01']
    },
    {
      id: '2',
      modelName: 'Political Risk Model',
      historicalAccuracy: 66.2,
      currentAccuracy: 70.8,
      improvement: 4.6,
      recommendations: [
        'Enhance geopolitical factor analysis',
        'Refine sentiment scoring algorithms'
      ],
      historicalData: [64, 65, 66, 66.2, 66.2],
      timestamps: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01']
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      setModels(mockModels);
      setSelectedModel(mockModels[0]);
      setLoading(false);
    };

    loadData();
  }, []);

  const getImprovementColor = (improvement: number) => {
    return improvement >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
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
            <ClipboardList className="w-8 h-8 text-indigo-600" />
            Model Backtesting System
          </h1>
          <p className="text-gray-600 mt-2">
            Historical validation, performance metrics, and improvement recommendations
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </motion.button>
      </motion.div>

      {/* Model Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedModel(model)}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 ${selectedModel?.id === model.id ? 'border-indigo-600' : 'border-gray-200'} cursor-pointer hover:shadow-xl transition-shadow`}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-indigo-600" />
              {model.modelName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Current Accuracy: <span className="font-bold text-gray-900">{model.currentAccuracy}%</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Historical Accuracy: <span className="font-bold text-gray-900">{model.historicalAccuracy}%</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Improvement: <span className={`font-bold ${getImprovementColor(model.improvement)}`}>{model.improvement}%</span>
            </p>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-xs font-medium text-gray-600">Recommendations Available</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Model Details */}
      {selectedModel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="w-6 h-6 text-indigo-600" />
              {selectedModel.modelName} - Performance Metrics
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Analyze historical performance and current accuracy improvements
            </p>
            {/* Historical Performance Chart */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                Historical Performance
              </h3>
              <div className="flex items-end justify-between h-32 bg-white rounded-lg px-2">
                {selectedModel.historicalData.map((value, i) => (
                  <div
                    key={i}
                    className="w-2 bg-indigo-500 rounded-sm"
                    style={{ height: `${value}%` }}
                    title={selectedModel.timestamps[i]}
                  />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recommendations
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {selectedModel.recommendations.map((rec, i) => (
                  <li key={i} className="mb-1">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModelBacktesting;

