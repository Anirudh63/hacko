
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
        // Cyberpunk theme colors
        cyber: {
          dark: '#0f1219',
          darker: '#090c14',
          darkest: '#04060a',
          blue: '#00f0ff',
          purple: '#7b5df2',
          pink: '#ff00d4',
          'blue-glow': 'rgba(0, 240, 255, 0.5)',
          'purple-glow': 'rgba(123, 93, 242, 0.5)',
          'pink-glow': 'rgba(255, 0, 212, 0.5)',
          green: '#00ff95',
          amber: '#ffbb00',
          red: '#ff3e5b',
          'green-glow': 'rgba(0, 255, 149, 0.5)',
          'amber-glow': 'rgba(255, 187, 0, 0.5)',
          'red-glow': 'rgba(255, 62, 91, 0.5)',
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
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        },
        'scanner': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' }
        },
        'rotate-center': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanner': 'scanner 2s ease-in-out infinite',
        'rotate-center': 'rotate-center 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear'
			},
      boxShadow: {
        'neon-blue': '0 0 5px theme("colors.cyber.blue"), 0 0 20px theme("colors.cyber.blue-glow")',
        'neon-purple': '0 0 5px theme("colors.cyber.purple"), 0 0 20px theme("colors.cyber.purple-glow")',
        'neon-pink': '0 0 5px theme("colors.cyber.pink"), 0 0 20px theme("colors.cyber.pink-glow")',
        'neon-green': '0 0 5px theme("colors.cyber.green"), 0 0 20px theme("colors.cyber.green-glow")',
        'neon-amber': '0 0 5px theme("colors.cyber.amber"), 0 0 20px theme("colors.cyber.amber-glow")',
        'neon-red': '0 0 5px theme("colors.cyber.red"), 0 0 20px theme("colors.cyber.red-glow")',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(123, 93, 242, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 93, 242, 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'neon-glow': 'radial-gradient(circle at center, rgba(123, 93, 242, 0.3) 0%, rgba(0, 240, 255, 0.2) 35%, rgba(10, 15, 30, 0) 70%)',
      },
      backgroundSize: {
        'cyber-grid': '30px 30px',
      },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
