import { animate, stagger } from 'animejs';

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Staggered entrance animation for cards, list items, and containers
 */
export const animateStaggeredEntrance = (targets, options = {}) => {
  if (prefersReducedMotion() || !targets) return null;

  const {
    delay = 0,
    staggerDelay = 45,
    duration = 450,
    yOffset = 14,
    ease = 'outCubic',
    onComplete
  } = options;

  return animate(targets, {
    opacity: [0, 1],
    translateY: [yOffset, 0],
    duration,
    delay: stagger(staggerDelay, { start: delay }),
    ease,
    onComplete
  });
};

/**
 * Numeric counter animation for latency, confidence, or document count
 */
export const animateNumericCounter = (onValueUpdate, startValue, endValue, options = {}) => {
  if (prefersReducedMotion()) {
    onValueUpdate(endValue);
    return null;
  }

  const {
    duration = 750,
    decimals = 0,
    ease = 'outQuad'
  } = options;

  const state = { val: Number(startValue) || 0 };

  return animate(state, {
    val: Number(endValue) || 0,
    duration,
    ease,
    onUpdate: () => {
      const formatted = decimals > 0 
        ? state.val.toFixed(decimals) 
        : Math.round(state.val).toString();
      onValueUpdate(formatted);
    }
  });
};

/**
 * Micro-highlight pulse for newly focused or selected legal elements
 */
export const animatePulse = (target, options = {}) => {
  if (prefersReducedMotion() || !target) return null;

  return animate(target, {
    scale: [1, 1.02, 1],
    duration: 300,
    ease: 'outQuad',
    ...options
  });
};
