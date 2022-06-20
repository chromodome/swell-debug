import React, { useState } from 'react';

import { useField } from 'formik';
import useDidMountEffect from '@/helpers/useDidMountEffect';

const Checkbox = ({ isChecked, setIsChecked, ...props }) => {
    const [field, meta] = useField(props);

    const [isTouched, setIsTouched] = useState(false);

    const classFocus = !isChecked
        ? isTouched
            ? 'border-red-400 ring-red-200'
            : ''
        : 'border-green-400 ring-green-200';

    const handleClick = () => {
        setIsChecked(!isChecked);
        setIsTouched(true);
    };

    useDidMountEffect(() => {
        setIsTouched(true);
    }, [meta.error]);

    return (
        <div className="mt-4 d-hdpi-2:mt-vw-4">
            <div className="flex items-center ">
                <input
                    name={props.name}
                    className="opacity-0 absolute h-8 w-8 d-hdpi-2:h-vw-8 d-hdpi-2:w-vw-8 cursor-pointer"
                    onClick={handleClick}
                    autoComplete="off"
                    {...field}
                />
                <div
                    className={`${classFocus} bg-gray-100 border rounded-lg d-hdpi-2:rounded-vw-lg w-8 h-8 d-hdpi-2:w-vw-8 d-hdpi-2:h-vw-8 flex flex-shrink-0 justify-center items-center mr-4 d-hdpi-2:mr-vw-4  ring-4 d-hdpi-2:ring-2 ring-transparent  border-transparent`}>
                    {isChecked && (
                        <svg
                            className="fill-current w-5 h-5 d-hdpi-2:w-vw-6 d-hdpi-2:h-vw-6 text-green-500 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                        </svg>
                    )}
                </div>
                <div
                    htmlFor="A3-yes"
                    className="text-xs d-hdpi-2:text-vw-xs text-gray-400">
                    <span className="mr-1 d-hdpi-2:mr-vw-1">
                        By signing up and creating an account, you agree to the
                    </span>
                    <a
                        className="underline"
                        href={`${process.env.REACT_APP_TOS}`}
                        target="_blank">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        className="underline"
                        href={`${process.env.REACT_APP_PRIVACY}`}
                        target="_blank">
                        Privacy Policy
                    </a>{' '}
                    of Konnect Travel.
                </div>
            </div>
        </div>
    );
};

export default Checkbox;
