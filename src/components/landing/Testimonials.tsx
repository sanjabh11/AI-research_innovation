import React from 'react';
import { motion } from 'framer-motion';

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

export const Testimonials: React.FC = () => (
  <section className="py-16 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-serif font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What Users Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            className="rounded-2xl shadow-xl p-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="flex items-center mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <blockquote className="text-gray-800 dark:text-gray-100 italic mb-4">“{t.content}”</blockquote>
            <div className="font-bold text-gray-900 dark:text-white">{t.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}, {t.company}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
