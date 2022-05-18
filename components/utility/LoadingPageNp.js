import Spinner from 'components/blocks/Spinner';
import React from 'react';

const LoadingPageNp = () => {
    return (
        <div className='w-full bg-gray-200 h-screen absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Spinner />
        </div>
    );
};

export default LoadingPageNp;
