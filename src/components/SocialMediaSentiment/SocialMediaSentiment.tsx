import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Globe,
  Users,
  MapPin,
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Eye,
  Clock,
  Hash,
  Smile,
  Frown,
  Meh,
  RefreshCw,
  Download
} from 'lucide-react';

interface SentimentPost {
  id: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'reddit';
  content: string;
  author: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  engagement: number;
  location: string;
  timestamp: string;
  hashtags: string[];
  mentions: string[];
  geopoliticalRelevance: number;
}

interface SentimentTrend {
  id: string;
  topic: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  volume: number;
  change: number;
  region: string;
  trending: boolean;
  keywords: string[];
}

interface SentimentMetrics {
  totalPosts: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  averageEngagement: number;
  topHashtags: { tag: string; count: number }[];
  regionalBreakdown: { region: string; sentiment: number }[];
}

interface SocialMediaSentimentProps {
  className?: string;
}

const SocialMediaSentiment: React.FC<SocialMediaSentimentProps> = ({ className = '' }) => {
  const [posts, setPosts] = useState<SentimentPost[]>([]);
  const [trends, setTrends] = useState<SentimentTrend[]>([]);
  const [metrics, setMetrics] = useState<SentimentMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRealTime, setIsRealTime] = useState(true);

  // Mock data
  const mockPosts: SentimentPost[] = [
    {
      id: '1',
      platform: 'twitter',
      content: 'The new trade agreement shows promising signs for economic cooperation between nations. This could be a positive step forward.',
      author: '@GeoPolicyExpert',
      sentiment: 'positive',
      confidence: 0.87,
      engagement: 234,
      location: 'Washington, DC',
      timestamp: '2024-01-15T14:30:00Z',
      hashtags: ['#TradeAgreement', '#EconomicCooperation', '#Diplomacy'],
      mentions: ['@TradeMinistry'],
      geopoliticalRelevance: 85
    },
    {
      id: '2',
      platform: 'reddit',
      content: 'Concerned about the escalating tensions in the region. The latest developments seem to be making things worse rather than better.',
      author: 'u/InternationalWatcher',
      sentiment: 'negative',
      confidence: 0.92,
      engagement: 156,
      location: 'London, UK',
      timestamp: '2024-01-15T13:45:00Z',
      hashtags: ['#GeopoliticalTensions', '#InternationalRelations'],
      mentions: [],
      geopoliticalRelevance: 78
    },
    {
      id: '3',
      platform: 'linkedin',
      content: 'Interesting analysis on the potential economic impacts of recent policy changes. The data suggests mixed results across different sectors.',
      author: 'Sarah Chen, Economic Analyst',
      sentiment: 'neutral',
      confidence: 0.75,
      engagement: 89,
      location: 'Singapore',
      timestamp: '2024-01-15T12:20:00Z',
      hashtags: ['#EconomicAnalysis', '#PolicyImpact'],
      mentions: [],
      geopoliticalRelevance: 65
    }
  ];

  const mockTrends: SentimentTrend[] = [
    {
      id: '1',
      topic: 'Trade Negotiations',
      sentiment: 'positive',
      volume: 15420,
      change: 12.3,
      region: 'North America',
      trending: true,
      keywords: ['agreement', 'cooperation', 'partnership', 'economic']
    },
    {
      id: '2',
      topic: 'Border Security',
      sentiment: 'negative',
      volume: 8734,
      change: -5.7,
      region: 'Europe',
      trending: false,
      keywords: ['tension', 'conflict', 'security', 'concern']
    },
    {
      id: '3',
      topic: 'Climate Summit',
      sentiment: 'positive',
      volume: 22110,
      change: 18.9,
      region: 'Global',
      trending: true,
      keywords: ['environmental', 'cooperation', 'progress', 'action']
    }
  ];

  const mockMetrics: SentimentMetrics = {
    totalPosts: 125473,
    positiveCount: 45612,
    negativeCount: 32874,
    neutralCount: 46987,
    averageEngagement: 156.7,
    topHashtags: [
      { tag: '#Geopolitics', count: 8934 },
      { tag: '#TradeWar', count: 6782 },
      { tag: '#Diplomacy', count: 5621 },
      { tag: '#Security', count: 4893 }
    ],
    regionalBreakdown: [
      { region: 'North America', sentiment: 72 },
      { region: 'Europe', sentiment: 68 },
      { region: 'Asia-Pacific', sentiment: 75 },
      { region: 'Middle East', sentiment: 45 }
    ]
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1100));
      setPosts(mockPosts);
      setTrends(mockTrends);
      setMetrics(mockMetrics);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        const shouldUpdate = Math.random() > 0.7;
        if (shouldUpdate) {
          setTrends(prev => 
            prev.map(trend => ({
              ...trend,
              volume: Math.max(1000, trend.volume + Math.floor((Math.random() - 0.5) * 500)),
              change: (Math.random() - 0.5) * 20
            }))
          );
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4" />;
      case 'negative': return <Frown className="w-4 h-4" />;
      case 'neutral': return <Meh className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-600 bg-blue-50';
      case 'facebook': return 'text-blue-800 bg-blue-100';
      case 'instagram': return 'text-pink-600 bg-pink-50';
      case 'linkedin': return 'text-blue-700 bg-blue-50';
      case 'reddit': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSentiment = selectedSentiment === 'all' || post.sentiment === selectedSentiment;
    const matchesPlatform = selectedPlatform === 'all' || post.platform === selectedPlatform;
    const matchesSearch = searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSentiment && matchesPlatform && matchesSearch;
  });

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
            <MessageCircle className="w-8 h-8 text-purple-600" />
            Social Media Sentiment Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring and analysis of geopolitical sentiment across social platforms
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRealTime(!isRealTime)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              isRealTime 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            Real-time {isRealTime ? 'ON' : 'OFF'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics Dashboard */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.totalPosts.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.positiveCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Positive</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.negativeCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Negative</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-gray-500">
            <div className="text-2xl font-bold text-gray-900">{metrics.averageEngagement.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
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
              placeholder="Search posts, hashtags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Sentiment:</span>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Platform:</span>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="reddit">Reddit</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Trending Topics
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            {trends.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{trend.topic}</h3>
                  {trend.trending && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                      TRENDING
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(trend.sentiment)}`}>
                    {getSentimentIcon(trend.sentiment)}
                    {trend.sentiment.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-600">{trend.volume.toLocaleString()} posts</span>
                  <div className={`flex items-center gap-1 text-xs ${
                    trend.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(trend.change).toFixed(1)}%
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {trend.keywords.slice(0, 3).map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              Recent Posts ({filteredPosts.length})
            </h2>
          </div>
          
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPlatformColor(post.platform)}`}>
                        {post.platform.toUpperCase()}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(post.sentiment)}`}>
                        {getSentimentIcon(post.sentiment)}
                        {post.sentiment.toUpperCase()}
                      </div>
                      <span className="text-xs text-gray-500">
                        {(post.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{post.geopoliticalRelevance}% relevant</span>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{post.author}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.engagement}
                      </span>
                    </div>
                    <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                  
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.hashtags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">
                          <Hash className="w-3 h-3" />
                          {tag.replace('#', '')}
                        </span>
                      ))}
                      {post.hashtags.length > 3 && (
                        <span className="text-xs text-gray-500">+{post.hashtags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialMediaSentiment;
