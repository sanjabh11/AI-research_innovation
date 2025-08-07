import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Languages,
  FileText,
  CheckCircle,
  AlertTriangle,
  Brain,
  Users,
  BarChart3,
  MessageCircle,
  Search,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Star,
  Eye,
  Settings,
  Zap
} from 'lucide-react';

interface LanguageDocument {
  id: string;
  title: string;
  originalLanguage: string;
  translatedLanguage: string;
  originalText: string;
  translatedText: string;
  credibilityScore: number;
  culturalContext: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  region: string;
  category: string;
  timestamp: string;
}

interface LanguageMetrics {
  totalDocuments: number;
  languagesSupported: number;
  averageCredibility: number;
  translationAccuracy: number;
  culturalFactors: number;
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

interface MultiLanguageIntelligenceProps {
  className?: string;
}

const MultiLanguageIntelligence: React.FC<MultiLanguageIntelligenceProps> = ({ className = '' }) => {
  const [documents, setDocuments] = useState<LanguageDocument[]>([]);
  const [metrics, setMetrics] = useState<LanguageMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'documents' | 'translation' | 'analysis'>('documents');

  // Mock data
  const mockDocuments: LanguageDocument[] = [
    {
      id: '1',
      title: 'Economic Policy Analysis - Europe',
      originalLanguage: 'German',
      translatedLanguage: 'English',
      originalText: 'Die wirtschaftliche Politik der Europäischen Union...',
      translatedText: 'The economic policy of the European Union shows significant changes in response to global market pressures...',
      credibilityScore: 87,
      culturalContext: ['European economic values', 'Germanic precision in policy', 'Historical context awareness'],
      sentiment: 'neutral',
      confidence: 0.92,
      region: 'Europe',
      category: 'Economic Policy',
      timestamp: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      title: 'Security Assessment - Asia Pacific',
      originalLanguage: 'Mandarin',
      translatedLanguage: 'English',
      originalText: '亚太地区的安全评估显示...',
      translatedText: 'Security assessment in the Asia-Pacific region shows increasing tensions requiring diplomatic intervention...',
      credibilityScore: 93,
      culturalContext: ['Eastern diplomatic approaches', 'Confucian hierarchy concepts', 'Regional harmony emphasis'],
      sentiment: 'negative',
      confidence: 0.89,
      region: 'Asia-Pacific',
      category: 'Security',
      timestamp: '2024-01-15T13:45:00Z'
    },
    {
      id: '3',
      title: 'Trade Relations Update - Latin America',
      originalLanguage: 'Spanish',
      translatedLanguage: 'English',
      originalText: 'Las relaciones comerciales en América Latina...',
      translatedText: 'Trade relations in Latin America demonstrate positive growth trends with increased regional cooperation...',
      credibilityScore: 81,
      culturalContext: ['Latin American cooperation', 'Regional trade partnerships', 'Cultural solidarity factors'],
      sentiment: 'positive',
      confidence: 0.85,
      region: 'Latin America',
      category: 'Trade',
      timestamp: '2024-01-15T12:20:00Z'
    }
  ];

  const mockMetrics: LanguageMetrics = {
    totalDocuments: 1247,
    languagesSupported: 24,
    averageCredibility: 85.3,
    translationAccuracy: 92.1,
    culturalFactors: 156,
    sentimentBreakdown: {
      positive: 423,
      negative: 387,
      neutral: 437
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1300));
      setDocuments(mockDocuments);
      setMetrics(mockMetrics);
      setLoading(false);
    };

    loadData();
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-yellow-600 bg-yellow-50';
    if (score >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesLanguage = selectedLanguage === 'all' || doc.originalLanguage === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.translatedText.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesLanguage && matchesCategory && matchesSearch;
  });

  const languages = ['all', 'German', 'Mandarin', 'Spanish', 'French', 'Arabic', 'Russian'];
  const categories = ['all', 'Economic Policy', 'Security', 'Trade', 'Diplomacy', 'Technology'];

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
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
            <Languages className="w-8 h-8 text-emerald-600" />
            Multi-Language Intelligence
          </h1>
          <p className="text-gray-600 mt-2">
            Document translation, cultural context analysis, and cross-language sentiment analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Analysis
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
            <div className="text-2xl font-bold text-gray-900">{metrics.totalDocuments.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-emerald-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.languagesSupported}</div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.averageCredibility.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Credibility</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.translationAccuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Translation Accuracy</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.culturalFactors}</div>
            <div className="text-sm text-gray-600">Cultural Factors</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-pink-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.sentimentBreakdown.positive}</div>
            <div className="text-sm text-gray-600">Positive Sentiment</div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit"
      >
        {[
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'translation', label: 'Translation', icon: Languages },
          { id: 'analysis', label: 'Analysis', icon: Brain }
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-emerald-600 shadow-sm'
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
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {languages.map(language => (
                  <option key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'documents' && (
          <motion.div
            key="documents"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{doc.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSentimentColor(doc.sentiment)}`}>
                        {doc.sentiment.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Languages className="w-4 h-4" />
                        {doc.originalLanguage} → {doc.translatedLanguage}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {doc.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {(doc.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCredibilityColor(doc.credibilityScore)}`}>
                      {doc.credibilityScore}% credible
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Original Text:</div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {doc.originalText}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Translation:</div>
                    <div className="text-sm text-gray-800 bg-emerald-50 p-3 rounded-lg">
                      {doc.translatedText}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Cultural Context:</div>
                  <div className="flex flex-wrap gap-2">
                    {doc.culturalContext.map((context, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {context}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{doc.category}</span>
                  <span>{new Date(doc.timestamp).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'translation' && (
          <motion.div
            key="translation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="text-center py-12">
              <Languages className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Translation Interface</h3>
              <p className="text-gray-600">Real-time document translation with cultural context analysis</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Start Translation
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                Language Distribution
              </h3>
              <div className="space-y-3">
                {['German', 'Mandarin', 'Spanish', 'French'].map((lang, i) => (
                  <div key={lang} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{lang}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${[85, 72, 68, 45][i]}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{[85, 72, 68, 45][i]}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                Sentiment Analysis
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Positive', value: 423, color: 'bg-green-500' },
                  { label: 'Negative', value: 387, color: 'bg-red-500' },
                  { label: 'Neutral', value: 437, color: 'bg-gray-500' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full`}
                          style={{ width: `${(item.value / 1247) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiLanguageIntelligence;
