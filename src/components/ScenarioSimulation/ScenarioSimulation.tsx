import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Save,
  Share2,
  TrendingUp,
  TrendingDown,
  Globe,
  Users,
  DollarSign,
  Shield,
  Clock,
  Target,
  Brain,
  Zap,
  ChevronRight,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';

interface ScenarioParameter {
  id: string;
  name: string;
  category: 'political' | 'economic' | 'military' | 'social' | 'environmental';
  value: number;
  min: number;
  max: number;
  unit: string;
  description: string;
}

interface SimulationResult {
  id: string;
  timestamp: string;
  parameters: ScenarioParameter[];
  outcomes: {
    political_stability: number;
    economic_impact: number;
    social_cohesion: number;
    security_level: number;
    environmental_impact: number;
  };
  risks: string[];
  opportunities: string[];
  aiAnalysis: string;
  confidence: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: ScenarioParameter[];
  template: boolean;
}

interface ScenarioSimulationProps {
  className?: string;
}

const ScenarioSimulation: React.FC<ScenarioSimulationProps> = ({ className = '' }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showParameterModal, setShowParameterModal] = useState(false);

  // Mock scenario templates
  const mockScenarios: Scenario[] = [
    {
      id: '1',
      name: 'Trade War Escalation',
      description: 'Analyze the impact of escalating trade tensions between major economies',
      category: 'Economic',
      template: true,
      parameters: [
        {
          id: 'tariff_rate',
          name: 'Average Tariff Rate',
          category: 'economic',
          value: 15,
          min: 0,
          max: 50,
          unit: '%',
          description: 'Average tariff rate on affected goods'
        },
        {
          id: 'trade_volume',
          name: 'Trade Volume Reduction',
          category: 'economic',
          value: 25,
          min: 0,
          max: 100,
          unit: '%',
          description: 'Percentage reduction in bilateral trade'
        },
        {
          id: 'diplomatic_tension',
          name: 'Diplomatic Tension Level',
          category: 'political',
          value: 70,
          min: 0,
          max: 100,
          unit: 'index',
          description: 'Level of diplomatic tensions (0-100)'
        }
      ]
    },
    {
      id: '2',
      name: 'Regional Security Crisis',
      description: 'Model the effects of emerging security threats in a strategic region',
      category: 'Security',
      template: true,
      parameters: [
        {
          id: 'military_buildup',
          name: 'Military Buildup',
          category: 'military',
          value: 40,
          min: 0,
          max: 100,
          unit: 'index',
          description: 'Level of military mobilization'
        },
        {
          id: 'alliance_strength',
          name: 'Alliance Cohesion',
          category: 'political',
          value: 65,
          min: 0,
          max: 100,
          unit: 'index',
          description: 'Strength of existing alliances'
        },
        {
          id: 'economic_sanctions',
          name: 'Sanctions Impact',
          category: 'economic',
          value: 30,
          min: 0,
          max: 100,
          unit: '%',
          description: 'Economic impact of sanctions'
        }
      ]
    },
    {
      id: '3',
      name: 'Climate Change Response',
      description: 'Simulate international cooperation on climate change initiatives',
      category: 'Environmental',
      template: true,
      parameters: [
        {
          id: 'cooperation_level',
          name: 'International Cooperation',
          category: 'political',
          value: 55,
          min: 0,
          max: 100,
          unit: 'index',
          description: 'Level of international cooperation'
        },
        {
          id: 'investment_scale',
          name: 'Green Investment',
          category: 'economic',
          value: 45,
          min: 0,
          max: 100,
          unit: '%',
          description: 'Scale of green technology investment'
        },
        {
          id: 'policy_stringency',
          name: 'Policy Stringency',
          category: 'environmental',
          value: 60,
          min: 0,
          max: 100,
          unit: 'index',
          description: 'Stringency of climate policies'
        }
      ]
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScenarios(mockScenarios);
      setSelectedScenario(mockScenarios[0]);
      setLoading(false);
    };

    loadData();
  }, []);

  const runSimulation = async () => {
    if (!selectedScenario) return;

    setIsRunning(true);
    setCurrentStep(0);

    // Simulate multi-step analysis
    const steps = ['Initializing...', 'Analyzing parameters...', 'Running AI models...', 'Generating outcomes...', 'Finalizing results...'];
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate mock results based on parameters
    const result: SimulationResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      parameters: selectedScenario.parameters,
      outcomes: {
        political_stability: Math.max(0, Math.min(100, 75 + (Math.random() - 0.5) * 30)),
        economic_impact: Math.max(0, Math.min(100, 60 + (Math.random() - 0.5) * 40)),
        social_cohesion: Math.max(0, Math.min(100, 70 + (Math.random() - 0.5) * 35)),
        security_level: Math.max(0, Math.min(100, 65 + (Math.random() - 0.5) * 30)),
        environmental_impact: Math.max(0, Math.min(100, 55 + (Math.random() - 0.5) * 25))
      },
      risks: [
        'Potential for economic recession in affected regions',
        'Increased geopolitical tensions',
        'Supply chain disruptions',
        'Currency volatility'
      ],
      opportunities: [
        'Alternative trade route development',
        'Domestic industry strengthening',
        'New diplomatic partnerships',
        'Innovation in affected sectors'
      ],
      aiAnalysis: `Based on the current parameter configuration, the simulation indicates a moderate to high probability of significant geopolitical shifts. Key factors include the ${selectedScenario.parameters[0].name} set at ${selectedScenario.parameters[0].value}${selectedScenario.parameters[0].unit}, which could lead to cascading effects across multiple domains. The AI model suggests monitoring diplomatic channels and preparing contingency plans for economic stabilization.`,
      confidence: Math.floor(75 + Math.random() * 20)
    };

    setSimulationResults(prev => [result, ...prev]);
    setIsRunning(false);
  };

  const updateParameter = (parameterId: string, value: number) => {
    if (!selectedScenario) return;

    const updatedScenario = {
      ...selectedScenario,
      parameters: selectedScenario.parameters.map(param =>
        param.id === parameterId ? { ...param, value } : param
      )
    };
    setSelectedScenario(updatedScenario);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'political': return <Users className="w-4 h-4" />;
      case 'economic': return <DollarSign className="w-4 h-4" />;
      case 'military': return <Shield className="w-4 h-4" />;
      case 'social': return <Globe className="w-4 h-4" />;
      case 'environmental': return <Target className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'political': return 'text-blue-600 bg-blue-50';
      case 'economic': return 'text-green-600 bg-green-50';
      case 'military': return 'text-red-600 bg-red-50';
      case 'social': return 'text-purple-600 bg-purple-50';
      case 'environmental': return 'text-teal-600 bg-teal-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
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
            <Brain className="w-8 h-8 text-purple-600" />
            Scenario Simulation Engine
          </h1>
          <p className="text-gray-600 mt-2">
            Interactive geopolitical scenario modeling with AI-powered analysis
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            Scenario Templates
          </h2>
          
          <div className="space-y-3">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedScenario?.id === scenario.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{scenario.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{scenario.category}</span>
                </div>
                <p className="text-sm text-gray-600">{scenario.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {scenario.parameters.length} parameters
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Parameter Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-600" />
              Parameters
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowParameterModal(true)}
              className="text-orange-600 hover:text-orange-700"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          {selectedScenario && (
            <div className="space-y-4">
              {selectedScenario.parameters.map((param) => (
                <div key={param.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${getCategoryColor(param.category)}`}>
                        {getCategoryIcon(param.category)}
                      </div>
                      <span className="font-medium text-sm">{param.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {param.value}{param.unit}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      value={param.value}
                      onChange={(e) => updateParameter(param.id, Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div 
                      className="absolute top-0 h-2 bg-purple-500 rounded-lg pointer-events-none"
                      style={{ width: `${(param.value - param.min) / (param.max - param.min) * 100}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-gray-500">{param.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runSimulation}
              disabled={isRunning || !selectedScenario}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Pause className="w-5 h-5" />
                  </motion.div>
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run Simulation
                </>
              )}
            </motion.button>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Save className="w-4 h-4" />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-600" />
            Simulation Results
          </h2>

          {isRunning && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"
                />
                <span className="text-sm font-medium">
                  {['Initializing...', 'Analyzing parameters...', 'Running AI models...', 'Generating outcomes...', 'Finalizing results...'][currentStep]}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep + 1) * 20}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
          )}

          {simulationResults.length > 0 && !isRunning && (
            <div className="space-y-4">
              {simulationResults[0] && (
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium">Political Stability</div>
                      <div className="text-lg font-bold text-blue-900">
                        {simulationResults[0].outcomes.political_stability.toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs text-green-600 font-medium">Economic Impact</div>
                      <div className="text-lg font-bold text-green-900">
                        {simulationResults[0].outcomes.economic_impact.toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs text-purple-600 font-medium">Social Cohesion</div>
                      <div className="text-lg font-bold text-purple-900">
                        {simulationResults[0].outcomes.social_cohesion.toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-xs text-red-600 font-medium">Security Level</div>
                      <div className="text-lg font-bold text-red-900">
                        {simulationResults[0].outcomes.security_level.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-900">AI Analysis</span>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        {simulationResults[0].confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-yellow-800">{simulationResults[0].aiAnalysis}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-900">Key Risks</span>
                      </div>
                      <ul className="text-xs text-red-800 space-y-1">
                        {simulationResults[0].risks.slice(0, 2).map((risk, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-900">Opportunities</span>
                      </div>
                      <ul className="text-xs text-green-800 space-y-1">
                        {simulationResults[0].opportunities.slice(0, 2).map((opportunity, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {simulationResults.length === 0 && !isRunning && (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Run a simulation to see results</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScenarioSimulation;
