import { Link } from 'wouter';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* PrimeVibeMedia Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      {/* Animated Purple/Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-yellow-400/10 animate-pulse"></div>
      {/* Modern Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500 rotate-45 animate-spin"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-400 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-400 rounded-lg rotate-45 animate-float"></div>
      </div>
      {/* Premium 3D Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg rotate-45 animate-spin opacity-20"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-20"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rotate-12 animate-pulse opacity-15"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-white" style={{textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>Amplify Your</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent pt-[8px] pb-[8px]" 
                  style={{textShadow: '0 0 30px rgba(196,74,255,0.8)'}}>
              Digital Presence
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed">
            Premium media solutions that transform brands into industry leaders. We create viral content, drive engagement, and deliver measurable results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25">
                Start Your Journey
              </button>
            </Link>
            <button className="flex items-center gap-3 border-2 border-purple-500 text-purple-400 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25">
              <Play className="w-6 h-6" />
              View Our Work
            </button>
          </div>

          {/* Success Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">$100M+</div>
              <div className="text-blue-200">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">250%</div>
              <div className="text-blue-200">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">5★</div>
              <div className="text-blue-200">Client Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
