import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/auth/AuthModal';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, CheckCircle, Star, BookOpen, Shield, Lightbulb, Users, BarChart3, Rocket } from 'lucide-react';

// Feature list for mapping in Features section
const features = [
  {
    icon: BookOpen,
    title: 'AI-Powered Research',
    description: 'Conduct comprehensive literature reviews and identify research gaps with advanced AI analysis.',
    color: 'text-aria-blue-600',
    bgColor: 'bg-aria-blue-50'
  },
  {
    icon: Shield,
    title: 'Patent Intelligence',
    description: 'Navigate patent landscapes, identify white spaces, and assess IP opportunities.',
    color: 'text-aria-purple-600',
    bgColor: 'bg-aria-purple-50'
  },
  {
    icon: Lightbulb,
    title: 'Invention Generation',
    description: 'Generate novel, patentable inventions from research insights and market needs.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Users,
    title: 'Expert Collaboration',
    description: 'Connect with researchers, inventors, and industry experts worldwide.',
    color: 'text-aria-green-600',
    bgColor: 'bg-aria-green-50'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track research impact, patent performance, and innovation metrics.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Rocket,
    title: 'Commercialization',
    description: 'Accelerate technology transfer and identify licensing opportunities.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];
import { useAuthStore } from '../stores/authStore';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Testimonials } from '../components/landing/Testimonials';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);



  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Pharmaceutical Research Director',
      company: 'BioTech Innovations',
      content: 'ARIA reduced our drug discovery research time by 50% and helped us identify 3 breakthrough patent opportunities.',
      rating: 5
    },
    {
      name: 'Alex Martinez',
      role: 'Clean Tech Startup Founder',
      company: 'GreenEnergy Solutions',
      content: 'The patent landscape analysis was incredible. We found white spaces we never knew existed and filed 10 patents.',
      rating: 5
    },
    {
      name: 'Prof. Michael Thompson',
      role: 'Tech Transfer Officer',
      company: 'Stanford University',
      content: 'Our licensing revenue increased 300% after implementing ARIA for invention disclosure and partner matching.',
      rating: 5
    }
  ];

  const stats = [
    { value: '50%', label: 'Faster Research' },
    { value: '300%', label: 'More Patents' },
    { value: '40%', label: 'Higher Grant Rates' },
    { value: '100K+', label: 'Active Users' }
  ];

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <CTA onSignUp={handleSignUp} />
      <Footer />
      {/* Header */}
      <motion.header 
        className="border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">ARIA</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <motion.button 
              onClick={handleSignIn}
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" onClick={handleSignUp} className="aria-gradient text-white">
                Get Started
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Accelerate Scientific
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent"> Discovery</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              ARIA is your autonomous research assistant that transforms how you discover, 
              innovate, and protect intellectual property. From literature analysis to patent 
              generation, accelerate your path to breakthrough innovations.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white"
                  onClick={handleSignUp}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="text-lg px-8 py-4">
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features" 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Accelerate your research and innovation with AI-powered tools
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-aria-blue-200"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className={`p-4 rounded-lg ${feature.bgColor} inline-block mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        id="testimonials" 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Researchers and innovators are transforming their work with ARIA
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill={i < testimonial.rating ? "#FBBF24" : "none"} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        id="pricing" 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose the plan that fits your research needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: 'Free forever',
                description: 'Perfect for individual researchers',
                features: [
                  'Basic literature reviews',
                  '10 AI analyses per month',
                  'Limited patent searches',
                  'Single user account',
                  'Community support'
                ],
                cta: 'Start Free',
                popular: false
              },
              {
                name: 'Professional',
                price: '$49',
                period: 'per month',
                description: 'For serious researchers and inventors',
                features: [
                  'Advanced literature analysis',
                  'Unlimited AI analyses',
                  'Full patent landscape analysis',
                  'Invention generation',
                  'Team collaboration (up to 5)',
                  'Priority support'
                ],
                cta: 'Start Pro Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'tailored pricing',
                description: 'For organizations and research teams',
                features: [
                  'Everything in Professional',
                  'Unlimited team members',
                  'Custom AI model training',
                  'API access',
                  'Advanced analytics',
                  'Dedicated support',
                  'Custom integrations'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl overflow-hidden border ${
                  plan.popular 
                    ? 'border-aria-blue-200 shadow-xl relative' 
                    : 'border-gray-200 shadow-lg'
                }`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-aria-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-aria-blue-50 to-aria-purple-50' : 'bg-white'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'aria-gradient text-white' 
                          : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={handleSignUp}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </div>
                <div className="p-8 bg-white">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-aria-blue-600 via-aria-purple-600 to-aria-blue-700 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Research?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of researchers and innovators accelerating discovery with ARIA.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              
              className="bg-white text-aria-blue-700 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={handleSignUp}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ARIA</span>
              </div>
              <p className="text-gray-400">
                Accelerating scientific discovery and innovation through AI-powered research assistance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 ARIA Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
}