
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				bilbao: {
					50: '#e9ffe4',
					100: '#ccffc4',
					200: '#9eff90',
					300: '#5fff50',
					400: '#29fe1d',
					500: '#07e500',
					600: '#00b800',
					700: '#008000',
					800: '#076d08',
					900: '#0b5c0d',
					950: '#003404'
				},
				gold: {
					50: '#ffffe7',
					100: '#feffc1',
					200: '#fffd86',
					300: '#fff441',
					400: '#ffe60d',
					500: '#ffd700',
					600: '#d19e00',
					700: '#a67102',
					800: '#89580a',
					900: '#74480f',
					950: '#442604'
				},
				red: {
					50: '#fff0f0',
					100: '#ffdddd',
					200: '#ffc0c0',
					300: '#ff9494',
					400: '#ff5757',
					500: '#ff2323',
					600: '#ff0000',
					700: '#d70000',
					800: '#b10303',
					900: '#920a0a',
					950: '#500000'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'bounce-in': {
					'0%, 20%, 40%, 60%, 80%': {
						animationTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
					},
					'0%': {
						opacity: '0',
						transform: 'scale3d(.3, .3, .3)'
					},
					'20%': {
						transform: 'scale3d(1.1, 1.1, 1.1)'
					},
					'40%': {
						transform: 'scale3d(.9, .9, .9)'
					},
					'60%': {
						opacity: '1',
						transform: 'scale3d(1.03, 1.03, 1.03)'
					},
					'80%': {
						transform: 'scale3d(.97, .97, .97)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale3d(1, 1, 1)'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-in',
				'slide-up': 'slide-up 0.3s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
				banking: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif']
			},
			boxShadow: {
				'banking': 'var(--shadow-banking)',
				'banking-lg': '0 20px 40px 0 hsl(120 100% 25% / 0.15)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			},
			fontSize: {
				'2xs': '0.625rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '3.75rem'
			},
			letterSpacing: {
				'tighter': '-0.05em',
				'tight': '-0.025em'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
