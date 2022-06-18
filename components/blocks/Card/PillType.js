import classNames from 'classnames';

const PillType = ({ type, label }) => {
    return (
        <div
            className={classNames(
                type.toLowerCase() === 'digital'
                    ? 'bg-gray-900 text-kn-primary'
                    : 'bg-gradient-to-tr from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 font-semibold text-green-900 mix-blend-multiply',
                'uppercase rounded-full h-8 flex justify-center items-center text-xxs d-hdpi-2:text-vw-xxs tracking-widest px-6 whitespace-nowrap d-hdpi-2:h-vw-8 d-hdpi-2:px-vw-6'
            )}>
            {label || type}
        </div>
    );
};

export default PillType;
