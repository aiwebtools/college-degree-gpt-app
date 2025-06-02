
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
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
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
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
        rebellion: {
          red: '#ea384c',
          darkred: '#8B0000',
          blue: '#1EAEDB',
          darkblue: '#0A4D68',
          black: '#000000e6',
          gray: '#221F26',
        },
        divine: {
          purple: '#7c77c6',
          pink: '#ff77c6',
          blue: '#77c8ff',
          gold: '#ffd700',
          silver: '#c0c0c0',
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'33%': { transform: 'translateY(-15px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				drift: {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '700px 700px' }
				},
        'chain-break': {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-8px) rotate(-3deg)' },
          '75%': { transform: 'translateX(8px) rotate(3deg)' },
          '100%': { transform: 'translateX(0)' }
        },
        'divine-shimmer': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%, 100% 50%, 50% 0%',
            filter: 'hue-rotate(0deg) brightness(1)'
          },
          '25%': { 
            backgroundPosition: '25% 75%, 75% 25%, 25% 25%',
            filter: 'hue-rotate(90deg) brightness(1.1)'
          },
          '50%': { 
            backgroundPosition: '100% 50%, 0% 50%, 50% 100%',
            filter: 'hue-rotate(180deg) brightness(1.05)'
          },
          '75%': { 
            backgroundPosition: '75% 25%, 25% 75%, 75% 75%',
            filter: 'hue-rotate(270deg) brightness(1.1)'
          }
        },
        'divine-glow': {
          '0%, 100%': { backgroundPosition: '0% 50%, 0% 0%, 100% 100%' },
          '50%': { backgroundPosition: '100% 50%, 50% 50%, 0% 0%' }
        },
        'spark': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(239, 68, 68, 0.8)' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.6s ease-out forwards',
				'float': 'float 8s ease-in-out infinite',
				'drift': 'drift 80s linear infinite',
        'chain-break': 'chain-break 3s ease-in-out infinite',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'divine-shimmer': 'divine-shimmer 15s ease-in-out infinite',
        'divine-glow': 'divine-glow 20s ease-in-out infinite',
        'spark': 'spark 2s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'8\' height=\'8\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 8 0 L 0 0 0 8\' fill=\'none\' stroke=\'%23f0f0f0\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23smallGrid)\'/%3E%3C/svg%3E")',
				'starry-night': 'radial-gradient(circle at center, rgba(37, 38, 43, 0.7) 0%, rgba(2, 8, 23, 1) 100%)',
        'liberation-night': 'radial-gradient(circle at center, rgba(43, 37, 37, 0.7) 0%, rgba(23, 2, 2, 1) 100%)',
			},
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
