import React from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';
import ButtonLink from '@/blocks/Button/ButtonLink';
import Button from '../Button/Button';

const BookingCard = ({
    classes,
    price = 0,
    desc = '',
    children,
    setOpenModal,
    expId,
    auth: { isAuthenticated, isProfile }
}) => {
    return (
        <div
            className={`flex flex-col p-8 bg-kn-white rounded-2xl shadow-cards ${classes} `}>
            <BlockTitle
                text="Digital Download"
                component={3}
                classes="flex px-4 mb-4"
            />
            <div className="h-full flex items-center flex-col justify-between">
                <div className="px-4 mb-4 text-sm">
                    <p className="mb-4">Price: ${price}</p>
                    <p>{desc}</p>
                </div>

                {isAuthenticated && isProfile ? (
                    <Button
                        label="Try it Now"
                        as="url"
                        url={`https://kreator.viakonnect.com/experience/${expId}/0`}
                    />
                ) : (
                    <Button
                        label="Sign in to try"
                        as="button"
                        handleClick={setOpenModal}
                    />
                )}

                {children}
            </div>
        </div>
    );
};

export default BookingCard;
