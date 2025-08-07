import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => (
  <section className="py-16 px-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-2xl mx-auto text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-serif font-bold mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ready to Transform Your Research?
      </motion.h2>
      <motion.p
        className="text-xl mb-8 max-w-xl mx-auto opacity-90"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Join thousands of researchers and innovators accelerating discovery with ARIA.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          className="bg-white text-aria-blue-700 hover:bg-gray-100 text-lg px-8 py-6"
          onClick={onSignUp}
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  </section>
);
