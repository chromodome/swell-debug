import React, { useState } from 'react';

const GenericCheckBox = ({
    isChecked,
    setIsChecked,
    bgColor = 'bg-gray-100',
    ...props
}) => {
    const [isTouched] = useState(false);
    // const [isTouched, setIsTouched] = useState(false);

    const classFocus = !isChecked
        ? isTouched
            ? 'border-green-400  ring-red-200'
            : ''
        : 'border-green-400 ring-green-200';
    const onChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className=''>
            <div className='flex items-center '>
                <input
                    type={'checkbox'}
                    defaultValue={isChecked}
                    name={props.name}
                    className='opacity-0 absolute h-8 w-8 cursor-pointer'
                    onChange={onChange}
                />
                <div
                    className={`${classFocus} ${bgColor} border rounded-lg w-8 h-8 flex flex-shrink-0 justify-center items-center mr-4 ring-4 ring-transparent  border-transparent`}
                >
                    {isChecked && (
                        <svg
                            className='fill-current w-5 h-5 text-green-500 pointer-events-none'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                        >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenericCheckBox;
