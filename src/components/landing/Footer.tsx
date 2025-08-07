import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => (
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
);
