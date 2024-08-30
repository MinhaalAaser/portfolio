import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#f2ebfb',
      gray: '#e2dada',
      black: '#02010a',
      azp: {
        1: '#9d4edd',
        2: '#7b2cbf',
        3: '#5a189a',
        4: '#3c096c',
        5: '#240046',
      },
      azo: {
        1: '#ff9e00',
        2: '#ff9100',
        3: '#ff8500',
        4: '#ff7900',
        5: '#ff6d00',
      },
    },
  },
  plugins: [],
};
export default config;
