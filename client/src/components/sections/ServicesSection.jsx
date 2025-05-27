import { Target, Search, TrendingUp, BarChart, Shield, Monitor, Check, Video, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const services = [
    {
      icon: Video,
      title: 'Viral Content Creation',
      description: 'AI-powered content strategies that generate massive engagement',
      price: '$2,500',
      color: 'primary',
      features: [
        'Viral Video Production',
        'Trending Content Strategy',
        'Platform Optimization',
        'Performance Analytics'
      ]
    },
    {
      icon: Users,
      title: 'Brand Amplification',
      description: 'Strategic campaigns that transform reach into loyal audiences',
      price: '$1,500',
      color: 'accent',
      features: [
        'Multi-Platform Strategy',
        'Influencer Partnerships',
        'Content Distribution',
        'Audience Growth'
      ]
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Complete brand evolution for the modern digital landscape',
      price: '$3,000',
      color: 'purple',
      features: [
        'Brand Identity Redesign',
        'Digital Strategy Planning',
        'Market Positioning',
        'Growth Acceleration'
      ]
    },
    {
      icon: BarChart,
      title: 'Performance Analytics',
      description: 'Advanced data insights and performance tracking',
      price: '$1,000',
      color: 'green',
      features: [
        'Custom Dashboards',
        'ROI Tracking',
        'Competitor Analysis',
        'Monthly Reports'
      ]
    },
    {
      icon: Shield,
      title: 'Brand Registry & IP',
      description: 'Protect your brand and intellectual property',
      price: '$800',
      color: 'orange',
      features: [
        'Brand Registry Setup',
        'IP Protection',
        'Trademark Support',
        'Violation Monitoring'
      ]
    },
    {
      icon: Monitor,
      title: 'Amazon DSP Advertising',
      description: 'Programmatic display advertising campaigns',
      price: '$2,000',
      color: 'red',
      features: [
        'Campaign Setup',
        'Audience Targeting',
        'Creative Development',
        'Performance Optimization'
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      },
      accent: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      },
      purple: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      },
      green: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      },
      orange: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      },
      red: {
        iconBg: 'bg-purple-600/20',
        iconColor: 'text-purple-400',
        price: 'text-purple-400',
        cardBg: 'bg-purple-600',
        button: 'text-purple-600'
      }
    };
    return colors[color];
  };

  return (
    <section className="py-20 bg-slate-100 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="shape-3d shape-cube top-10 left-10 animate-rotate3d opacity-5" style={{ animationDelay: '0s' }}></div>
      <div className="shape-3d shape-sphere top-1/3 right-10 animate-floating3d opacity-5" style={{ animationDelay: '1s' }}></div>
      <div className="shape-3d shape-pyramid bottom-20 left-1/4 animate-spiral opacity-5" style={{ animationDelay: '2s' }}></div>
      <div className="shape-3d shape-cube top-1/2 right-1/3 animate-orbit opacity-5" style={{ animationDelay: '3s' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive Amazon growth solutions designed to maximize your ROI and scale your business to new heights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colors = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-3d relative h-80 group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                {/* Front of card */}
                <div className="card-face card-front absolute inset-0 bg-gray-800 rounded-2xl shadow-lg p-8 border border-purple-500/20 group-hover:border-purple-500/60 group-hover:bg-gray-750 transition-all duration-500">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 ${colors.iconBg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <IconComponent className={`w-8 h-8 ${colors.iconColor} group-hover:text-purple-300 transition-colors duration-500`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className={`text-3xl font-bold ${colors.price}`}>
                      {service.price}
                      <span className="text-base text-gray-400">/month</span>
                    </div>
                  </div>
                </div>
                {/* Back of card */}
                <div className="card-face card-back absolute inset-0 bg-primary-600 rounded-2xl shadow-lg p-8 text-[#0c0c0d]">
                  <h3 className="text-xl font-bold mb-4">What's Included:</h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full bg-white ${colors.button} py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors`}>
                    Learn More
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
