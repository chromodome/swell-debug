import React from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';
import ButtonLoad from '@/blocks/Button/ButtonLoad';

const BookingCard = ({
    handleSubmit = () => {},
    classes,
    price = 0,
    desc = '',
    children,
    setOpenBookingModal
}) => {
    return (
        <div
            className={`flex flex-col p-4 bg-kn-white rounded-lg shadow-lg ${classes} `}>
            <BlockTitle
                text="Buying window"
                component={3}
                classes="flex px-4 mb-4"
            />
            <form
                onSubmit={handleSubmit}
                className="h-full flex items-center flex-col justify-between">
                <div className="px-4 mb-4">
                    <p className="mb-4">Price: ${price}</p>
                    <p>{desc}</p>
                </div>
                <ButtonLoad
                    label="Wander NOW"
                    handleClick={setOpenBookingModal}
                />
                {children}
            </form>
        </div>
    );
};

export default BookingCard;
