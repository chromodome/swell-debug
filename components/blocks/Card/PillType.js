import classNames from 'classnames';

const PillType = ({ type, label }) => {
    return (
        <div
            className={classNames(
                type.toLowerCase() === 'digital'
                    ? 'bg-gray-900 text-kn-primary'
                    : 'bg-gradient-to-tr from-green-300 via-green-400 to-green-500 shadow-2xl-green-500 font-semibold text-green-900 mix-blend-multiply',
                'uppercase rounded-full h-8 flex justify-center items-center text-xxs tracking-widest px-6 whitespace-nowrap'
            )}>
            {label || type}
        </div>
    );
};

export default PillType;
