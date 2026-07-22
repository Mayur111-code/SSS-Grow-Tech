import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

/**
 * use3DScroll - Hook for creating Apple-like 3D scroll-driven animations
 * 
 * @param {Object} options
 * @param {Array} options.offset - Scroll offset ['start end', 'end start']
 * @param {number} options.damping - Spring damping (default: 30)
 * @param {number} options.stiffness - Spring stiffness (default: 100)
 * 
 * Returns: { ref, scrollYProgress, scrollY, rotateX, rotateY, scale, opacity, translateZ }
 */
export const use3DScroll = (options = {}) => {
  const {
    offset = ['start end', 'end start'],
    damping = 30,
    stiffness = 100,
  } = options;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Smooth spring-based transforms
  const smoothProgress = useSpring(scrollYProgress, { damping, stiffness });

  return {
    ref,
    scrollYProgress,
    smoothProgress,
  };
};

/**
 * useScrollTransform - Creates multiple scroll-driven transforms at once
 * 
 * @param {Object} config - Configuration object with transform ranges
 */
export const useScrollTransforms = (ref, transforms = {}) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const result = {};

  for (const [key, { inputRange, outputRange, spring: springConfig }] of Object.entries(transforms)) {
    const raw = useTransform(scrollYProgress, inputRange, outputRange);
    if (springConfig) {
      result[key] = useSpring(raw, springConfig);
    } else {
      result[key] = raw;
    }
  }

  return result;
};

/**
 * useParallax - Simple parallax effect with configurable depth
 * 
 * @param {number} depth - Parallax depth factor (0.1 to 1.0)
 */
export const useParallax = (depth = 0.5) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-100 * depth}%`, `${100 * depth}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return { ref, y, opacity, scale };
};

/**
 * usePerspectiveScroll - Creates perspective-based 3D scroll effects
 * Similar to Apple product pages
 */
export const usePerspectiveScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero exit animation
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const heroRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

  // Content entry animation  
  const contentY = useTransform(scrollYProgress, [0.3, 0.6], ['100%', '0%']);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return {
    containerRef,
    heroY,
    heroOpacity,
    heroScale,
    heroRotateX,
    contentY,
    contentOpacity,
  };
};

export default use3DScroll;
