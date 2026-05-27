import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Magnet({ children, range = 40, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center to mouse
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Check if mouse is in range
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < range) {
      // Apply pull strength
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
