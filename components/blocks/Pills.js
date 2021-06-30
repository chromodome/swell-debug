import Icons from 'components/blocks/Icons';
import { handleRowReverse } from 'helpers/FEutils';
import KnIcons from 'constants/KnIcons';

const Pill__Container = ({ edit, rtl, children, className }) => {
    return (
        <div
            className={`${className || ''} z-10 border-2 border-transparent ${
                edit && 'hover:border-kn-primary  cursor-pointer'
            } transition-colors ease-in-out duration-500 rounded-3xl flex flex-col lg:${
                handleRowReverse(rtl).flex
            } items-center justify-center p-2 px-4 lg:p-2 -mt-14 lg:-mt-12 lg:bg-white lg:w-max mx-auto  lg:rounded-full lg:shadow-2xl-green-400 lg:mb-8`}
        >
            {children}
        </div>
    );
};

const Pill__Icon = ({ icon, size }) => {
    return (
        <div className='w-24 h-16 lg:w-24 lg:h-12 flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-green-300 via-green-400 to-green-500 shadow-2xl-green-500'>
            {/* icon with coloring and size*/}
            <Icons
                iName={icon}
                iClasses='text-transparent bg-clip-text  bg-gradient-to-tr from-gray-900 to-blue-400 mix-blend-multiply'
            />
        </div>
    );
};

const Pill__Logo = ({ noshadow }) => {
    return (
        <div
            className={`w-8 h-12 flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-green-300 via-green-400 to-green-500 ${
                noshadow ? '' : 'shadow-2xl-green-500'
            }`}
        >
            <KnIcons
                icon='KnLogo2'
                size='26'
                className='text-gray-600 mix-blend-multiply'
            />
        </div>
    );
};

const Pill__Title = ({ title }) => {
    return (
        <div className='leading-8 text-2xl font-bold  lg:text-2xl pt-6 lg:py-0 lg:px-8 bg-clip-text text-transparent bg-gradient-to-tr from-black to-green-400'>
            {title}
        </div>
    );
};

const Pill__Experience = ({ label = 'Digital' }) => {
    return (
        <div className='uppercase rounded-full h-8 flex justify-center items-center bg-gray-900 text-xxs text-kn-primary tracking-widest px-6'>
            {label}
        </div>
    );
};

export {
    Pill__Icon,
    Pill__Title,
    Pill__Container,
    Pill__Logo,
    Pill__Experience,
};
