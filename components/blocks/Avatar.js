import React from 'react';

/**
 *
 * @param {{url: string, classesImg: string}} param0
 * @returns
 */

const Avatar = ({ url, classesImg }) => {
    return (
        <div>
            <img
                className={`w-8 h-8 rounded-2xl border ${classesImg}`}
                src={url}
                alt="avatar"
            />
        </div>
    );
};
export default Avatar;
