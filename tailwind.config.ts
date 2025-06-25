import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		gridTemplateColumns: {
  			'53': 'repeat(53, minmax(0, 1fr))',
  			'26': 'repeat(26, minmax(0, 1fr))',
  		}
  	}
  },
  plugins: [],
};
export default config;
