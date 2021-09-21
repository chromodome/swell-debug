import React from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';
import ButtonLink from '@/blocks/Button/ButtonLink';

const BookingCard = ({
    handleSubmit = () => {},
    classes,
    price = 0,
    desc = '',
    children,
    setOpenBookingModal,
    expId
}) => {
    return (
        <div
            className={`flex flex-col p-8 bg-kn-white rounded-2xl shadow-cards ${classes} `}>
            <BlockTitle
                text="Digital Download"
                component={3}
                classes="flex px-4 mb-4"
            />
            <form
                onSubmit={handleSubmit}
                className="h-full flex items-center flex-col justify-between">
                <div className="px-4 mb-4 text-sm">
                    <p className="mb-4">Price: ${price}</p>
                    <p>{desc}</p>
                </div>
                <ButtonLink
                    label="Try it Now"
                    handleClick={setOpenBookingModal}
                    expId={expId}
                />
                {children}
            </form>
        </div>
    );
};

export default BookingCard;
