module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', "./node_modules/flowbite/**/*.js"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
        plugins: [
        require('flowbite/plugin')
    ],
}