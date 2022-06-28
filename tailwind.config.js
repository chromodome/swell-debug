// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        groupLevel: 10,

        groupScope: 'scope',

        groupVariants: ['hover', 'focus'],

        fontFamily: {
            sans: ['Poppins', 'Tajawal', 'Mada', 'ui-sans-serif', 'system-ui'],
            serif: ['ui-serif', 'Georgia'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald'],
            body: ['Open Sans']
        },

        extend: {}
    },
    variants: {
        width: ['responsive', 'hover', 'focus', 'group-hover'],
        extend: {
            translate: ['group-hover'],
            opacity: ['disabled'],
            ringColor: ['group-hover', 'hover', 'active'],
            ringOpacity: ['group-hover', 'hover', 'active'],
            display: ['group-hover', 'hover'],
            margin: ['last'],
            padding: ['last', 'group-hover'],
            inset: ['group-hover', 'hover', 'focus'],
            justifyContent: ['hover', 'focus', 'group-hover'],
            borderRadius: ['hover', 'focus', 'focus-within']
        }
    },
    plugins: []
};
