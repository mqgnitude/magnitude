/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
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