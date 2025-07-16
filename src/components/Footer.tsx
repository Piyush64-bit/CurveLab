// Footer.tsx
import React from "react";
import { Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/[0.08] py-12 px-6 bg-black relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="/home" className="inline-block">
              <h4 className="text-lg font-medium mb-4 text-white hover:text-gray-200 transition-colors">
                CurveLab
              </h4>
            </a>
            <p className="text-gray-400 text-sm font-light max-w-md">
              A mathematical curve visualization tool designed for artists, educators, and enthusiasts exploring the intersection of mathematics and visual art.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-300">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-300">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/U1000000000000" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ujjvalagarwal/" className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/[0.08] text-center text-sm text-gray-400">
          <p>© 2025 CurveLab. Crafted with precision and care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
