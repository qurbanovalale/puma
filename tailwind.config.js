/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],

    theme: {
        extend: {
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xlcustom': '1100px', // <== 1024-dən sonra gəlir, düz sıralanmalıdır
                'xl': '1280px',

            },
        },
    },

    plugins: [],
}
