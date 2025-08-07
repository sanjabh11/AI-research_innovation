import React from 'react';
import { BookOpen, Shield, Lightbulb, Users, BarChart3, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

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

export const Features: React.FC = () => (
  <section className="py-16 px-4 md:px-0 bg-white">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-serif font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Key Features
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className={`rounded-2xl shadow-lg p-8 flex flex-col items-center ${feature.bgColor} ${feature.color} backdrop-blur-sm bg-opacity-70`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <feature.icon className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2 font-serif text-gray-900 dark:text-white drop-shadow-sm">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-100 text-base opacity-80 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
