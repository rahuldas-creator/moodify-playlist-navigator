
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
				mood: {
					happy: "#FFD166",
					sad: "#118AB2",
					nostalgic: "#9B5DE5",
					energized: "#EF476F",
					calm: "#06D6A0",
					focused: "#073B4C",
					romantic: "#e84a5f",
					relaxed: "#5aaa95",
					groovy: "#f9c74f",
					melancholic: "#577590",
					intense: "#d62828",
					creative: "#8ac926"
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Poppins', 'sans-serif'],
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
				'pulse-soft': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'gradient-move': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'morphing': {
					'0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
					'50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
					'100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'gradient-move': 'gradient-move 15s ease infinite',
				'morphing': 'morphing 8s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-happy': 'linear-gradient(135deg, #FFD166 0%, #FFECB3 100%)',
				'gradient-sad': 'linear-gradient(135deg, #118AB2 0%, #A2D5F2 100%)',
				'gradient-nostalgic': 'linear-gradient(135deg, #9B5DE5 0%, #D3B3FC 100%)',
				'gradient-energized': 'linear-gradient(135deg, #EF476F 0%, #FFA7BD 100%)',
				'gradient-calm': 'linear-gradient(135deg, #06D6A0 0%, #B3FCE4 100%)',
				'gradient-focused': 'linear-gradient(135deg, #073B4C 0%, #40798C 100%)',
				'gradient-romantic': 'linear-gradient(135deg, #e84a5f 0%, #ff847c 100%)',
				'gradient-relaxed': 'linear-gradient(135deg, #5aaa95 0%, #a8e6cf 100%)',
				'gradient-groovy': 'linear-gradient(135deg, #f9c74f 0%, #faedca 100%)',
				'gradient-melancholic': 'linear-gradient(135deg, #577590 0%, #a3cef1 100%)',
				'gradient-intense': 'linear-gradient(135deg, #d62828 0%, #f77f00 100%)',
				'gradient-creative': 'linear-gradient(135deg, #8ac926 0%, #e9f5db 100%)',
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
