/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '10px'
        },
        extend: {
            fontFamily: {
               'jetbrains-mono': ['JetBrains Mono', 'monospace']
            }
        },
        plugins: [],
    },
};