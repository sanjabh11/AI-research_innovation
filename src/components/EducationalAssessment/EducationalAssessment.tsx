import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Brain,
  Award,
  TrendingUp,
  Users,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Star,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Share2,
  Settings,
  Eye,
  Lightbulb,
  Zap
} from 'lucide-react';

interface Question {
  id: string;
  category: 'game-theory' | 'geopolitics' | 'economics' | 'strategy' | 'analysis';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  type: 'multiple-choice' | 'true-false' | 'scenario-analysis' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation: string;
  points: number;
  timeLimit: number; // in seconds
  tags: string[];
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  estimatedDuration: number;
  prerequisites: string[];
  learningObjectives: string[];
}

interface UserProgress {
  assessmentId: string;
  currentQuestion: number;
  answers: { [questionId: string]: any };
  score: number;
  timeSpent: number;
  completed: boolean;
  passed: boolean;
  attempts: number;
  startTime: string;
}

interface EducationalAssessmentProps {
  className?: string;
}

const EducationalAssessment: React.FC<EducationalAssessmentProps> = ({ className = '' }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'assessment' | 'results'>('overview');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock data
  const mockAssessments: Assessment[] = [
    {
      id: '1',
      title: 'Game Theory Fundamentals',
      description: 'Test your understanding of basic game theory concepts and applications in geopolitical scenarios.',
      category: 'Game Theory',
      difficulty: 'Beginner',
      timeLimit: 1800, // 30 minutes
      passingScore: 70,
      estimatedDuration: 25,
      prerequisites: ['Basic Economics', 'Introduction to Strategy'],
      learningObjectives: [
        'Understand Nash equilibrium',
        'Identify dominant strategies',
        'Apply game theory to real-world scenarios'
      ],
      questions: [
        {
          id: 'q1',
          category: 'game-theory',
          difficulty: 'beginner',
          type: 'multiple-choice',
          question: 'What is a Nash equilibrium in game theory?',
          options: [
            'A situation where no player can improve their outcome by unilaterally changing their strategy',
            'The optimal strategy for maximizing individual payoffs',
            'A cooperative solution that maximizes total welfare',
            'A random strategy that ensures fair outcomes'
          ],
          correctAnswer: 0,
          explanation: 'A Nash equilibrium is a solution concept where no player can improve their outcome by unilaterally changing their strategy, given the strategies of other players.',
          points: 10,
          timeLimit: 120,
          tags: ['nash-equilibrium', 'strategy', 'fundamentals']
        },
        {
          id: 'q2',
          category: 'game-theory',
          difficulty: 'beginner',
          type: 'scenario-analysis',
          question: 'In the Prisoner\'s Dilemma, two countries are deciding whether to cooperate on environmental policies or act independently. What is the likely outcome?',
          options: [
            'Both countries will cooperate for mutual benefit',
            'Both countries will act independently despite mutual losses',
            'One country will cooperate while the other acts independently',
            'The outcome depends on communication between countries'
          ],
          correctAnswer: 1,
          explanation: 'In the classic Prisoner\'s Dilemma, rational actors tend to defect (act independently) even though mutual cooperation would yield better outcomes for both parties.',
          points: 15,
          timeLimit: 180,
          tags: ['prisoners-dilemma', 'cooperation', 'environmental-policy']
        }
      ]
    },
    {
      id: '2',
      title: 'Geopolitical Risk Analysis',
      description: 'Advanced assessment covering risk assessment methodologies and geopolitical forecasting techniques.',
      category: 'Risk Analysis',
      difficulty: 'Advanced',
      timeLimit: 2700, // 45 minutes
      passingScore: 75,
      estimatedDuration: 40,
      prerequisites: ['Game Theory Fundamentals', 'International Relations'],
      learningObjectives: [
        'Master risk assessment frameworks',
        'Analyze geopolitical scenarios',
        'Develop forecasting skills'
      ],
      questions: [
        {
          id: 'q3',
          category: 'analysis',
          difficulty: 'advanced',
          type: 'multiple-choice',
          question: 'Which factor is most critical when assessing geopolitical risk in emerging markets?',
          options: [
            'Economic growth rates',
            'Political stability and governance quality',
            'Natural resource availability',
            'Military spending levels'
          ],
          correctAnswer: 1,
          explanation: 'Political stability and governance quality are fundamental to geopolitical risk assessment as they affect all other factors including economic performance and security.',
          points: 20,
          timeLimit: 150,
          tags: ['risk-assessment', 'emerging-markets', 'political-stability']
        }
      ]
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAssessments(mockAssessments);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const startAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setUserProgress({
      assessmentId: assessment.id,
      currentQuestion: 0,
      answers: {},
      score: 0,
      timeSpent: 0,
      completed: false,
      passed: false,
      attempts: 1,
      startTime: new Date().toISOString()
    });
    setTimeRemaining(assessment.timeLimit);
    setIsTimerActive(true);
    setActiveView('assessment');
  };

  const submitAnswer = () => {
    if (!currentAssessment || !userProgress || selectedAnswer === null) return;

    const currentQuestion = currentAssessment.questions[userProgress.currentQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const updatedProgress = {
      ...userProgress,
      answers: {
        ...userProgress.answers,
        [currentQuestion.id]: selectedAnswer
      },
      score: isCorrect ? userProgress.score + currentQuestion.points : userProgress.score
    };

    setUserProgress(updatedProgress);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!currentAssessment || !userProgress) return;

    const nextQuestionIndex = userProgress.currentQuestion + 1;
    if (nextQuestionIndex >= currentAssessment.questions.length) {
      completeAssessment();
    } else {
      setUserProgress({
        ...userProgress,
        currentQuestion: nextQuestionIndex
      });
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const completeAssessment = () => {
    if (!userProgress || !currentAssessment) return;

    const totalPoints = currentAssessment.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = (userProgress.score / totalPoints) * 100;
    const passed = percentage >= currentAssessment.passingScore;

    setUserProgress({
      ...userProgress,
      completed: true,
      passed
    });
    setIsTimerActive(false);
    setActiveView('results');
  };

  const handleTimeUp = () => {
    completeAssessment();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-orange-600 bg-orange-50';
      case 'expert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'game theory': return 'text-blue-600 bg-blue-50';
      case 'risk analysis': return 'text-red-600 bg-red-50';
      case 'economics': return 'text-green-600 bg-green-50';
      case 'strategy': return 'text-purple-600 bg-purple-50';
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
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
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
            <BookOpen className="w-8 h-8 text-green-600" />
            Educational Assessment
          </h1>
          <p className="text-gray-600 mt-2">
            Interactive learning assessments with personalized feedback and progress tracking
          </p>
        </div>
        
        {activeView !== 'overview' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView('overview')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Overview
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Overview */}
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Assessments Available</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Advanced</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Assessments */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  Available Assessments
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                {assessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{assessment.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(assessment.category)}`}>
                            {assessment.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                            {assessment.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{assessment.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{assessment.estimatedDuration} min</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Target className="w-4 h-4" />
                            <span>{assessment.questions.length} questions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4" />
                            <span>{assessment.passingScore}% to pass</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4" />
                            <span>{assessment.questions.reduce((sum, q) => sum + q.points, 0)} points</span>
                          </div>
                        </div>

                        {assessment.prerequisites.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">Prerequisites:</div>
                            <div className="flex flex-wrap gap-2">
                              {assessment.prerequisites.map((prereq, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {prereq}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startAssessment(assessment)}
                        className="ml-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Assessment
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Assessment View */}
        {activeView === 'assessment' && currentAssessment && userProgress && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Assessment Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{currentAssessment.title}</h2>
                  <p className="text-gray-600">Question {userProgress.currentQuestion + 1} of {currentAssessment.questions.length}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className={timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-gray-900">{userProgress.score} pts</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((userProgress.currentQuestion + 1) / currentAssessment.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            {currentAssessment.questions[userProgress.currentQuestion] && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentAssessment.questions[userProgress.currentQuestion].difficulty)}`}>
                      {currentAssessment.questions[userProgress.currentQuestion].difficulty.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {currentAssessment.questions[userProgress.currentQuestion].points} points
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {currentAssessment.questions[userProgress.currentQuestion].question}
                  </h3>
                </div>

                {/* Answer Options */}
                <div className="space-y-3 mb-6">
                  {currentAssessment.questions[userProgress.currentQuestion].options?.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedAnswer === index
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      } ${showExplanation ? 'opacity-75' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswer === index ? 'border-green-500 bg-green-500' : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                    >
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900 mb-2">Explanation</div>
                          <p className="text-blue-800 text-sm">
                            {currentAssessment.questions[userProgress.currentQuestion].explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView('overview')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Exit Assessment
                  </motion.button>
                  
                  <div className="flex gap-3">
                    {!showExplanation ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={submitAnswer}
                        disabled={selectedAnswer === null}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextQuestion}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        {userProgress.currentQuestion + 1 < currentAssessment.questions.length ? (
                          <>Next Question <ChevronRight className="w-4 h-4" /></>
                        ) : (
                          <>Complete Assessment <CheckCircle className="w-4 h-4" /></>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Results View */}
        {activeView === 'results' && currentAssessment && userProgress && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-6">
                {userProgress.passed ? (
                  <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
                )}
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {userProgress.passed ? 'Congratulations!' : 'Assessment Complete'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {userProgress.passed 
                    ? 'You have successfully passed the assessment!'
                    : 'You can retake the assessment to improve your score.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {Math.round((userProgress.score / currentAssessment.questions.reduce((sum, q) => sum + q.points, 0)) * 100)}%
                  </div>
                  <div className="text-blue-700 font-medium">Final Score</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-900 mb-2">
                    {userProgress.score}
                  </div>
                  <div className="text-green-700 font-medium">Points Earned</div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-900 mb-2">
                    {formatTime(currentAssessment.timeLimit - timeRemaining)}
                  </div>
                  <div className="text-purple-700 font-medium">Time Taken</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('overview')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
              >
                Back to Overview
              </motion.button>
              
              {!userProgress.passed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startAssessment(currentAssessment)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Assessment
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationalAssessment;
