import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'play' | 'view' | 'drag' | 'link'
  const [hidden, setHidden] = useState(true);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setHidden(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeaveWindow = () => setHidden(true);
    const handleMouseEnterWindow = () => setHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Dynamic hover listeners using mutation observer or event delegation
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
        if (type === 'play') setCursorText('PLAY');
        else if (type === 'view') setCursorText('VIEW');
        else if (type === 'drag') setCursorText('DRAG');
        else if (type === 'link') setCursorText('→');
        else setCursorText(type);
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  // Render cursor with morphing styling based on cursorType
  const getVariants = () => {
    switch (cursorType) {
      case 'play':
        return {
          width: 80,
          height: 80,
          backgroundColor: '#fc6f03',
          borderColor: 'transparent',
          color: '#ffffff',
          scale: 1.1
        };
      case 'view':
        return {
          width: 80,
          height: 80,
          backgroundColor: '#fc6f03',
          borderColor: 'transparent',
          color: '#ffffff',
          scale: 1.1
        };
      case 'drag':
        return {
          width: 85,
          height: 85,
          backgroundColor: '#e05800',
          borderColor: 'transparent',
          color: '#ffffff',
          scale: 1.1
        };
      case 'link':
        return {
          width: 50,
          height: 50,
          backgroundColor: 'rgba(252, 111, 3, 0.08)',
          borderColor: 'rgba(252, 111, 3, 0.3)',
          color: '#fc6f03',
          scale: 1.2
        };
      default:
        return {
          width: 28,
          height: 28,
          backgroundColor: 'transparent',
          borderColor: 'rgba(15, 23, 42, 0.2)',
          color: 'transparent',
          scale: 1
        };
    }
  };

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 border-2 rounded-full pointer-events-none z-[99999] flex items-center justify-center font-clash text-xs font-semibold tracking-wider overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={getVariants()}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorText}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-green-600 rounded-full pointer-events-none z-[99999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
