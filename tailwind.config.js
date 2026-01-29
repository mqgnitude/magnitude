/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'shooting-star': 'shoot 5s linear infinite',
                'shooting-star-delayed': 'shoot 12s linear infinite 5s',
            },
            keyframes: {
                shoot: {
                    '0%': { transform: 'translateX(0) translateY(0)', opacity: 1 },
                    '20%': { transform: 'translateX(-500px) translateY(500px)', opacity: 0 },
                    '100%': { transform: 'translateX(-500px) translateY(500px)', opacity: 0 },
                }
            },
            colors: {
                bg: "#080808",
                surface: "#121212",
                glass: "rgba(255, 255, 255, 0.05)",
                mag: {
                    1: "#00ff41", // Green (Safe)
                    2: "#00d8ff", // Blue (UI)
                    3: "#fcee0a", // Yellow (Warning)
                    4: "#ff0055", // Red (Danger)
                    9: "#bd00ff", // Purple (Grade 9)
                }
            },
            fontFamily: {
                mono: ['"Courier New"', 'monospace'],
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}