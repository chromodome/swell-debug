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

        borderRadius: {
            none: '0',

            DEFAULT: '0.25rem',
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            '4xl': '2rem',
            full: '9999px'
        },

        fontFamily: {
            sans: ['Poppins', 'Tajawal', 'Mada', 'ui-sans-serif', 'system-ui'],
            serif: ['ui-serif', 'Georgia'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald'],
            body: ['Open Sans'],
            'ar-display': ['Tajawal'],
            'ar-body': ['Tajawal']
        },
        fontSize: {
            xxs: '0.65rem',
            xs: '.75rem',
            sm: '.875rem',
            tiny: '.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem'
        },
        letterSpacing: {
            tightest: '-.075em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0',
            wide: '.1em',
            wider: '.2em',
            widest: '.3em'
        },
        screens: {
            // => @media (min-width: 390px) { ... }
            xs360: '360px',
            // => @media (min-width: 390px) { ... }
            xs390: '375px',
            // => @media (min-width: 390px) { ... }
            xs410: '410px',
            // => @media (min-width: 390px) { ... }
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px'
            // => @media (min-width: 1536px) { ... }
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
            '2xl-green': '0 25px 50px -12px rgba(30, 208, 151,  0.14)',
            '2xl-green-500': '0 11px 20px -6px rgba(30, 208, 151,  0.5)',
            '2xl-green-400': '0 25px 50px -12px rgba(0, 128, 87,  0.25)',
            '2xl-green-600': '0 25px 30px -12px rgba(0, 128, 87,  0.4)',
            '6xl-green-center': '0 0 30px 0 rgba(0, 128, 87,  0.4)',
            '2xl-top': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
            '3xl-top': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
            '2xl-green-top': '0 -25px 50px -12px rgba(30, 208, 151,  0.14)',
            '2xl-green-500-top': '0 -11px 20px -6px rgba(30, 208, 151,  0.5)',
            '2xl-green-400-top': '0 -25px 50px -12px rgba(0, 128, 87,  0.25)',
            '2xl-green-600-top': '0 -25px 30px -12px rgba(0, 128, 87,  0.4)',
            '2xl-green-600-rev': '0 -25px 30px -12px rgba(0, 128, 87,  0.14)',
            double: '0 25px 50px 0 rgba(0, 128, 87, 0.14), 0 15px 30px 0 rgba(0, 128, 87, 0.2)',
            cards: '0 25px 50px -12px rgba(0, 128, 87,  0.14)',
            images: '0 25px 40px -12px rgba(70, 128, 87,  0.4)',
            'cards-top': '0 -25px 50px -12px rgba(0, 128, 87,  0.14)',
            'images-top': '0 -25px 40px -12px rgba(70, 128, 87,  0.4)',
            'glass-images': '0 -10px 60px 0px rgba(40, 128, 87,  0.14)',
            'glass-images2': '0 -10px 80px -6px rgba(40, 128, 87,  0.14)',
            'over-image-green':
                '0 15px 30px 0 #328a6ec2, 0 15px 60px 0 #328a6ec2',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            none: 'none'
        },
        extend: {
            transitionProperty: {
                height: 'height',
                width: 'width'
            },
            transitionTimingFunction: {
                'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
                'out-expo-hard': 'cubic-bezier(0.07, 0.53, 0.25, 1)'
            },

            screens: {
                touch: { raw: '(hover: none)' },
                portrait: { raw: '(orientation: portrait)' }
                // => @media (orientation: portrait) { ... }
            },
            colors: {
                'kn-primary': '#00CC97',
                'kn-primary-25': '#ecfdf540',
                'kn-primary-50': '#ecfdf580',
                'kn-primary-75': '#ecfdf5',
                'kn-gray-100': '#F6F6F6',
                'kn-primary-100': '#F2F9F8',
                'kn-primary-200': '#E4F2F0',
                'kn-primary-300': '#C4E6E2',
                'kn-primary-400': '#91CCBD',
                'kn-primary-500': '#2AAB89',
                'kn-primary-600': '#004E3A',
                'kn-primary-700': '#003024',
                'kn-yellow': '#FFEE00',
                'kn-yellow-75': '#FFEE00BB',
                'kn-yellow-50': '#FFEE0088',
                'kn-yellow-25': '#FFEE0044',
                'kn-red': '#FF2121',
                'kn-blue': '#3021FF',
                'kn-black': '#000000',
                'kn-white': '#ffffff',
                'glass-25': '#ffffff44',
                'glass-50': '#ffffff88',
                'glass-75': '#ffffffBB',
                'modal-100': '#D5DCD9',

                cyan: colors.cyan,
                'light-blue': colors.lightBlue,
                teal: colors.teal
            },
            maxHeight: {
                'screen-10': '10vh',
                'screen-15': '15vh',
                'screen-1/5': '20vh',
                'screen-1/4': '25vh',
                'screen-1/3': '33vh',
                'screen-2/5': '40vh',
                'screen-1/2': '50vh',
                'screen-3/5': '60vh',
                'screen-2/3': '66vh',
                'screen-3/4': '75vh',
                'screen-4/5': '80vh',
                'screen-5/6': '85vh',
                'screen-5/6': '85vh',
                'screen-80': '80vh',
                'screen-90': '90vh',
                'screen-95': '95vh',
                'screen-100': '100vh'
            },
            maxWidth: {
                'screen-10': '10vw',
                'screen-15': '15vw',
                'screen-1/5': '20vw',
                'screen-1/4': '25vw',
                'screen-1/3': '33vw',
                'screen-2/5': '40vw',
                'screen-1/2': '50vw',
                'screen-3/5': '60vw',
                'screen-2/3': '66vw',
                'screen-3/4': '75vw',
                'screen-4/5': '80vw',
                'screen-5/6': '85vw',
                'screen-5/6': '85vw',
                'screen-90': '90vw',
                'screen-80': '80vw',
                'screen-95': '95vw',
                'screen-100': '100vw',
                'parent-120': '120%',
                'parent-150': '150%'
            },
            height: {
                128: '32rem',
                126: '30rem',
                160: '40rem',
                192: '49rem',
                256: '64rem',
                'screen-10': '10vh',
                'screen-15': '15vh',
                'screen-1/5': '20vh',
                'screen-1/4': '25vh',
                'screen-1/3': '33vh',
                'screen-2/5': '40vh',
                'screen-1/2': '50vh',
                'screen-3/5': '60vh',
                'screen-2/3': '66vh',
                'screen-3/4': '75vh',
                'screen-4/5': '80vh',
                'screen-5/6': '85vh',
                'screen-5/6': '85vh',
                'screen-80': '80vh',
                'screen-90': '90vh',
                'screen-95': '95vh',
                'screen-100': '100vh',
                'screen-150': '150vh',
                'screen-200': '200vh'
            },
            width: {
                128: '32rem',
                160: '40rem',
                192: '49rem',
                256: '64rem',
                'screen-10': '10vw',
                'screen-15': '15vw',
                'screen-1/5': '20vw',
                'screen-1/4': '25vw',
                'screen-1/3': '33vw',
                'screen-2/5': '40vw',
                'screen-1/2': '50vw',
                'screen-3/5': '60vw',
                'screen-2/3': '66vw',
                'screen-3/4': '75vw',
                'screen-4/5': '80vw',
                'screen-5/6': '85vw',
                'screen-5/6': '85vw',
                'screen-90': '90vw',
                'screen-95': '95vw',
                'screen-100': '100vw',
                'parent-120': '120%',
                'parent-150': '150%'
            },
            scale: {
                10: '0.1',
                20: '0.2',
                25: '0.25',
                30: '0.3',
                40: '0.4',
                60: '0.6',
                65: '0.65',
                70: '0.7',
                80: '0.8',
                85: '0.85',
                115: '1.15',
                120: '1.2',
                130: '1.3',
                135: '1.35',
                140: '1.4',
                145: '1.45',
                175: '1.75',
                225: '2.25',
                250: '2.5',
                275: '2.75',
                300: '3'
            },
            lineClamp: {
                7: '7',
                8: '8',
                9: '9',
                10: '10'
            },
            minHeight: {
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            minWidth: {
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            maxHeight: {
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            maxWidth: {
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            }
        }
    },
    variants: {
        width: ['responsive', 'hover', 'focus'],
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
    plugins: [
        require('tailwind-scrollbar'),
        require('tailwindcss-nested-groups'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio')
    ]
};
