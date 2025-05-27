import { motion } from 'framer-motion';

export default function FloatingBackground3D() {
  const shapes = [
    { type: 'cube', size: 'w-12 h-12', position: 'top-20 left-16', animation: 'animate-rotate3d', delay: '0s' },
    { type: 'sphere', size: 'w-16 h-16', position: 'top-40 right-20', animation: 'animate-floating3d', delay: '1s' },
    { type: 'pyramid', size: 'w-10 h-10', position: 'bottom-32 left-1/4', animation: 'animate-spiral', delay: '2s' },
    { type: 'cube', size: 'w-8 h-8', position: 'top-1/2 right-1/3', animation: 'animate-orbit', delay: '3s' },
    { type: 'sphere', size: 'w-14 h-14', position: 'bottom-20 right-16', animation: 'animate-morphing', delay: '1.5s' },
    { type: 'pyramid', size: 'w-6 h-6', position: 'top-1/3 left-10', animation: 'animate-floating3d', delay: '2.5s' },
    { type: 'cube', size: 'w-10 h-10', position: 'bottom-40 left-1/2', animation: 'animate-spiral', delay: '4s' },
    { type: 'sphere', size: 'w-12 h-12', position: 'top-60 right-1/4', animation: 'animate-rotate3d', delay: '0.5s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`shape-3d shape-${shape.type} ${shape.size} ${shape.position} ${shape.animation} opacity-5`}
          style={{ animationDelay: shape.delay }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ 
            duration: 2, 
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  );
}