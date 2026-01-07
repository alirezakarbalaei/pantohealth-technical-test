export const designSystem = {
  colors: {
    // Success Green palette - cozy and inviting
    'success-green-50': '#f0fdf4',
    'success-green-100': '#dcfce7',
    'success-green-200': '#bbf7d0',
    'success-green-300': '#86efac',
    'success-green-400': '#4ade80',
    'success-green-500': '#22c55e',
    'success-green-600': '#16a34a',
    'success-green-700': '#15803d',
    'success-green-800': '#166534',
    'success-green-900': '#14532d',
    
    // Cozy background colors
    'cozy-cream': '#fdf8f0',
    'cozy-beige': '#f5f1e8',
    'cozy-warm-gray': '#e8e2d8',
    
    // Glassmorphism effects
    'glassmorphism-bg': 'rgba(240, 253, 244, 0.8)',
    'glassmorphism-border': 'rgba(255, 255, 255, 0.1)',
    'glassmorphism-backdrop': 'blur(10px)',
  },
  
  // Typography with cozy feel
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Georgia', 'ui-serif', 'serif'],
  },
  
  // Spacing with cozy proportions
  spacing: {
    'cozy-sm': '0.75rem',
    'cozy-md': '1.25rem',
    'cozy-lg': '2rem',
    'cozy-xl': '3rem',
  },
  
  // Border radius for soft, inviting edges
  borderRadius: {
    'cozy-sm': '0.375rem',
    'cozy-md': '0.5rem',
    'cozy-lg': '0.75rem',
    'cozy-xl': '1rem',
    'cozy-full': '9999px',
  },
  
  // Box shadows for depth and coziness
  boxShadow: {
    'cozy-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'cozy-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'cozy-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'cozy-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    'glassmorphism': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  
  // Transitions for smooth interactions
  transition: {
    'cozy-default': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    'cozy-slow': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type DesignSystem = typeof designSystem;