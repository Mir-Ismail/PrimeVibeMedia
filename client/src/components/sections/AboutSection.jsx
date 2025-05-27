import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="shape-3d shape-sphere top-16 right-10 animate-floating3d opacity-5" style={{ animationDelay: '0s' }}></div>
      <div className="shape-3d shape-cube bottom-20 left-10 animate-spiral opacity-5" style={{ animationDelay: '1.5s' }}></div>
      <div className="shape-3d shape-pyramid top-1/2 right-1/4 animate-rotate3d opacity-5" style={{ animationDelay: '2s' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Trusted by Amazon's
              <span className="gradient-text"> Top Sellers</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Since 2018, we've helped ambitious entrepreneurs transform their Amazon businesses into million-dollar empires through data-driven strategies and cutting-edge PPC optimization.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-slate-700">Certified Amazon Advertising Partners</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-slate-700">AI-Powered Campaign Optimization</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span className="text-slate-700">24/7 Performance Monitoring</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional team working on Amazon strategies"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-[#2c5ddc]">340%</div>
              <div className="text-slate-600">Average Sales Growth</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
