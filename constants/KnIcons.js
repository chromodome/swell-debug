import React from 'react';

const defaultSize = '24';
const defaultStroke = '2';

const KnIcons = ({ icon, size, className, stroke }) => {
    return React.createElement(Map[icon], { size, className, stroke });
};

function KnHamoc({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M56.5,35.3125v17.79419l-35.3125,28.25v17.51831c0,50.62058 41.19192,91.8125 91.8125,91.8125c50.62058,0 91.8125,-41.19192 91.8125,-91.8125v-17.51831l-35.3125,-28.25v-17.79419h-14.125v17.79419l-35.3125,28.25v17.51831c0,23.48678 -18.88822,42.375 -42.375,42.375c-17.61094,0 -32.63486,-10.621 -39.05066,-25.83606c-2.14061,-5.07646 -3.32434,-10.6631 -3.32434,-16.53894h70.625v-17.51831l-35.3125,-28.25v-17.79419zM63.5625,65.54883l24.00147,19.20117h-48.00293zM162.4375,65.54883l24.00147,19.20117h-48.00294zM134.1875,98.875h56.5c0,42.98579 -34.70171,77.6875 -77.6875,77.6875c-22.73054,0 -42.69464,-10.05968 -56.88623,-25.56018c6.65953,2.77068 13.93075,4.37268 21.57373,4.37268c31.12047,0 56.5,-25.37953 56.5,-56.5z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnEntertainment({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M63.5625,35.3125c-11.6145,0 -21.1875,9.573 -21.1875,21.1875c0,11.6145 9.573,21.1875 21.1875,21.1875c11.6145,0 21.1875,-9.573 21.1875,-21.1875c0,-11.6145 -9.573,-21.1875 -21.1875,-21.1875zM155.375,35.3125c-11.6145,0 -21.1875,9.573 -21.1875,21.1875c0,11.6145 9.573,21.1875 21.1875,21.1875c11.6145,0 21.1875,-9.573 21.1875,-21.1875c0,-11.6145 -9.573,-21.1875 -21.1875,-21.1875zM190.9082,40.60938l-6.62109,26.26367l-17.87695,17.87695h-25.16016c-3.03466,0 -4.68994,1.07593 -6.17969,1.98633c-1.48974,0.9104 -2.67602,1.93116 -3.97266,3.08984c-2.62085,2.31738 -5.29687,5.18652 -7.72461,7.94531c-4.85547,5.54516 -9.04883,11.03516 -9.04883,11.03516l-0.66211,1.10352l-0.44141,1.32422l-7.0625,28.25l13.68359,3.53125l6.62109,-26.70508c0.57934,-0.77246 3.44848,-4.63477 7.50391,-9.26953c2.20703,-2.53809 4.552,-4.96582 6.40039,-6.62109c0.35864,-0.33105 0.57934,-0.41382 0.88281,-0.66211v34.42969l-9.26953,21.1875l-4.85547,35.3125h14.125l4.19336,-33.32617l9.93164,-23.17383v-35.3125h7.0625v35.3125l9.93164,23.17383l4.19336,33.32617h14.125l-4.85547,-35.3125l-9.26953,-21.1875v-39.28516l19.20117,-19.20117l1.32422,-1.54492l7.50391,-30.01562zM21.1875,42.375v31.11914l1.98633,2.20703l21.1875,21.1875l1.76563,1.54492c-4.41406,10.53858 -10.81445,26.81543 -10.81445,35.75391c0,9.32471 4.85547,41.35425 6.8418,56.5h14.3457c-2.2622,-17.10449 -7.0625,-48.38916 -7.0625,-56.5c0,-6.62109 6.56592,-23.64282 11.69727,-35.3125h5.95898l-10.15234,25.60156c-0.9104,2.2898 -0.60693,4.88305 0.88281,6.8418l19.42188,25.82227l-6.62109,33.54688h14.125l7.0625,-34.20898c0.33105,-1.90356 -0.16552,-3.75195 -1.32422,-5.29687l-18.98047,-25.16016l12.13867,-30.01562l20.30469,-20.30469l1.98633,-2.20703v-31.11914h-14.125v25.16016l-17.21484,17.21484h-22.07031l-17.21484,-17.21484v-25.16016zM63.5625,49.4375c3.97266,0 7.0625,3.08984 7.0625,7.0625c0,3.97266 -3.08984,7.0625 -7.0625,7.0625c-3.97266,0 -7.0625,-3.08984 -7.0625,-7.0625c0,-3.97266 3.08984,-7.0625 7.0625,-7.0625zM155.375,49.4375c3.97266,0 7.0625,3.08984 7.0625,7.0625c0,3.97266 -3.08984,7.0625 -7.0625,7.0625c-3.97266,0 -7.0625,-3.08984 -7.0625,-7.0625c0,-3.97266 3.08984,-7.0625 7.0625,-7.0625z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnRestaurant({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M49.4375,35.3125v49.4375c0,11.6145 9.573,21.1875 21.1875,21.1875v84.75h14.125v-84.75c11.6145,0 21.1875,-9.573 21.1875,-21.1875v-49.4375h-14.125v49.4375c0,4.00024 -3.06226,7.0625 -7.0625,7.0625v-56.5h-14.125v56.5c-4.00024,0 -7.0625,-3.06226 -7.0625,-7.0625v-49.4375zM134.1875,35.3125v155.375h14.125v-52.08594l28.25,-14.125v-53.85156c0,-19.42187 -15.89062,-35.3125 -35.3125,-35.3125zM148.3125,52.30664c7.86255,3.08984 14.125,9.29712 14.125,18.31836v45.02344l-14.125,7.0625z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnReservation({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M36.85742,56.5l-24.71875,98.875h36.19531l1.10352,8.16602l0.88281,5.95898h163.32031l-1.98633,-8.60742l-21.1875,-98.875l-1.10352,-5.51758zM50.54102,70.625h127.3457l18.31836,84.75h-133.52539zM40.38867,100.41992l5.95898,40.83008h-16.11133zM84.75,105.9375v14.125h77.6875v-14.125z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnGettingThere({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M21.1875,42.375c-11.6176,0 -21.1875,9.5699 -21.1875,21.1875v86.30871c0,6.44212 4.45724,12.13918 10.7041,13.69739l18.12524,4.52441c0.00091,0.00441 -0.00091,0.00938 0,0.01379c2.64903,12.83316 14.09182,22.58069 27.67065,22.58069c13.06799,0 24.05205,-9.06966 27.22925,-21.1875h65.604c3.1772,12.11784 14.16126,21.1875 27.22925,21.1875c13.06799,0 24.05205,-9.06966 27.22925,-21.1875h8.08325c7.71976,0 14.125,-6.40524 14.125,-14.125v-25.83606c0,-12.92418 -8.85697,-24.27186 -21.39441,-27.40857l-37.93335,-9.47644l-29.56043,-41.39563l-0.01379,-0.01379c-3.97048,-5.55862 -10.39893,-8.86951 -17.22864,-8.86951zM21.1875,56.5h49.4375v35.3125h-28.25h-28.25v-28.25c0,-3.99053 3.07197,-7.0625 7.0625,-7.0625zM42.375,91.8125c7.80102,0 14.125,-6.32398 14.125,-14.125c0,-7.80102 -6.32398,-14.125 -14.125,-14.125c-7.80102,0 -14.125,6.32398 -14.125,14.125c0,7.80102 6.32398,14.125 14.125,14.125zM84.75,56.5h35.11938c2.28838,0 4.41129,1.09058 5.73828,2.9519l23.10486,32.3606h-35.71253h-28.25zM113,91.8125c7.80102,0 14.125,-6.32398 14.125,-14.125c0,-7.80102 -6.32398,-14.125 -14.125,-14.125c-7.80102,0 -14.125,6.32398 -14.125,14.125c0,7.80102 6.32398,14.125 14.125,14.125zM14.125,105.9375h147.44348l39.60242,9.90405c6.31943,1.58104 10.7041,7.18557 10.7041,13.69739v25.83606h-8.08325c-3.1772,-12.11784 -14.16126,-21.1875 -27.22925,-21.1875c-13.06799,0 -24.05205,9.06966 -27.22925,21.1875h-65.604c-3.1772,-12.11784 -14.16126,-21.1875 -27.22925,-21.1875c-12.48236,0 -23.03168,8.28854 -26.73267,19.58741l-15.64233,-3.90369zM56.5,148.3125c7.88645,0 14.125,6.23855 14.125,14.125c0,7.88645 -6.23855,14.125 -14.125,14.125c-7.88645,0 -14.125,-6.23855 -14.125,-14.125c0,-7.88645 6.23855,-14.125 14.125,-14.125zM176.5625,148.3125c7.88645,0 14.125,6.23855 14.125,14.125c0,7.88645 -6.23855,14.125 -14.125,14.125c-7.88645,0 -14.125,-6.23855 -14.125,-14.125c0,-7.88645 6.23855,-14.125 14.125,-14.125z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnBestTime({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M113,28.25c-46.72173,0 -84.75,38.02827 -84.75,84.75c0,46.72173 38.02827,84.75 84.75,84.75c9.0899,0 17.82999,-1.5069 26.05676,-4.16577l30.45703,32.41577l47.1615,-50.19617c12.49356,-13.29869 12.42657,-33.56916 -0.15174,-46.15454c-5.21485,-5.22081 -11.91066,-8.30254 -19.11841,-9.18677c0.21442,-2.4605 0.34485,-4.94849 0.34485,-7.46253c0,-46.72173 -38.02827,-84.75 -84.75,-84.75zM113,42.375c39.08765,0 70.625,31.53735 70.625,70.625c0,3.02034 -0.25638,5.96795 -0.62073,8.8833c-4.73661,1.58706 -9.12423,4.12668 -12.7594,7.766l-0.73108,0.74487l-0.74487,-0.74487c-6.17969,-6.18675 -14.40286,-9.58679 -23.14623,-9.58679c-8.74337,0 -16.95276,3.40004 -23.13245,9.58679c-12.58537,12.58538 -12.65236,32.86291 -0.15173,46.15454l5.76587,6.13831c-4.87066,1.06329 -9.90286,1.68286 -15.10437,1.68286c-39.08765,0 -70.625,-31.53735 -70.625,-70.625c0,-39.08765 31.53735,-70.625 70.625,-70.625zM105.9375,56.5v49.4375h-35.3125v14.125h49.4375v-63.5625zM145.62268,134.1875c4.96494,0 9.6349,1.93789 13.17322,5.4762l0.74487,0.74487l10.04199,10.00061l9.95923,-10.08337l0.70349,-0.6897c3.51006,-3.51006 8.1807,-5.44861 13.14563,-5.44861c4.96494,0 9.63557,1.93148 13.14564,5.44861c7.15431,7.16137 7.08026,18.80004 -0.15174,26.49818l-36.87121,39.24377l-36.88501,-39.24377c-7.23906,-7.69813 -7.30604,-19.3368 -0.15174,-26.49818c3.51713,-3.51006 8.1807,-5.44861 13.14564,-5.44861z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnDuration({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M105.9375,28.25v35.3125h14.125v-19.86328c35.58838,3.66919 63.5625,32.71924 63.5625,69.30078c0,39.09204 -31.53296,70.625 -70.625,70.625c-39.09204,0 -70.625,-31.53296 -70.625,-70.625c0,-22.70484 10.56616,-42.89917 27.14648,-55.83789l-8.60742,-11.03516c-19.89087,15.5044 -32.66406,39.72656 -32.66406,66.87305c0,46.73389 38.01612,84.75 84.75,84.75c46.73389,0 84.75,-38.01611 84.75,-84.75c0,-46.73388 -38.01611,-84.75 -84.75,-84.75zM75.70117,65.54883l-10.15234,10.15234l42.375,42.375c1.26905,1.26905 3.11743,1.98633 5.07617,1.98633c3.88989,0 7.0625,-3.17261 7.0625,-7.0625c0,-1.95874 -0.71728,-3.80713 -1.98633,-5.07617z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnWallet({ size, className }) {
    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 226 226'
            width={size || defaultSize}
            height={size || defaultSize}
            className={className || ''}
        >
            <g
                fill='none'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
            >
                <path d='M0,226v-226h226v226z' fill='none'></path>
                <g fill='currentColor'>
                    <path d='M162.2168,28.25c-1.07593,0.02759 -2.20703,0.16553 -3.31055,0.44141l-114.76562,30.23633c-9.26953,2.42773 -15.89062,10.9248 -15.89062,20.52539v97.10938c0,11.6145 9.573,21.1875 21.1875,21.1875h127.125c11.6145,0 21.1875,-9.573 21.1875,-21.1875v-91.8125c0,-11.6145 -9.573,-21.1875 -21.1875,-21.1875h-94.46094l80.33594,-21.1875v14.125h14.125v-14.125c0,-7.94531 -6.75903,-14.23535 -14.3457,-14.125zM49.4375,77.6875h127.125c4.00024,0 7.0625,3.06226 7.0625,7.0625v91.8125c0,4.00024 -3.06226,7.0625 -7.0625,7.0625h-127.125c-4.00024,0 -7.0625,-3.06226 -7.0625,-7.0625v-91.8125c0,-4.00024 3.06226,-7.0625 7.0625,-7.0625zM158.90625,120.0625c-5.84863,0 -10.59375,4.74512 -10.59375,10.59375c0,5.84863 4.74512,10.59375 10.59375,10.59375c5.84863,0 10.59375,-4.74512 10.59375,-10.59375c0,-5.84863 -4.74512,-10.59375 -10.59375,-10.59375z'></path>
                </g>
            </g>
        </svg>
    );
}

function KnLogo2({ size, className, stroke }) {
    return (
        <svg
            height={size || defaultSize}
            width={size || defaultSize}
            viewBox='0 0 24 24.292'
            xmlns='http://www.w3.org/2000/svg'
            className={className || ''}
        >
            <g fill='currentColor'>
                <g id='kn_logo' transform='translate(6697 5251.146)'>
                    <path
                        id='empty_container'
                        d='M0 0h24v24H0z'
                        fill='none'
                        transform='translate(-6697 -5251)'
                    />
                    <g id='logo' transform='translate(2.203 .194)'>
                        <path
                            id='Path_419'
                            d='M-6682.644-5228.458l-8.564-7.4a1.393 1.393 0 0 1-.445-1 1.3 1.3 0 0 1 .445-1l8.564-7.4'
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth={stroke || defaultStroke}
                            data-name='Path 419'
                        />
                        <path
                            id='Path_421'
                            d='M-6682.547-5233.147l-4.326-3.708'
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth={stroke || defaultStroke}
                            data-name='Path 421'
                        />
                        <path
                            id='Path_420'
                            d='M-6682.935-5249.93l-9.268 7.967'
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeWidth={stroke || defaultStroke}
                            data-name='Path 420'
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
}

// export {
//     KnHamoc,
//     KnEntertainment,
//     KnRestaurant,
//     KnReservation,
//     KnGettingThere,
//     KnBestTime,
//     KnDuration,
//     KnWallet,
// };

const Map = {
    KnHamoc,
    KnEntertainment,
    KnRestaurant,
    KnReservation,
    KnGettingThere,
    KnBestTime,
    KnDuration,
    KnWallet,
    KnLogo2,
};

export default KnIcons;
