import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          '50': '#f0f2fd',
          '100': '#e4e6fb',
          '200': '#cfd3f6',
          '300': '#b1b5f0',
          '400': '#9391e8',
          '500': '#766cdb',
          '600': '#6f5ccf',
          '700': '#604cb6',
          '800': '#4e4093',
          '900': '#433976',
          '950': '#282244',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
