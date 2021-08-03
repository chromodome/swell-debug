import React, { useState } from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';
import ButtonLoad from '@/blocks/Button/ButtonLoad';

const BookingCard = ({
    handleSubmit = () => {},
    classes,
    children,
    setOpenBookingModal
}) => {
    const [data, setData] = useState({
        guests: 1,
        leave: 1
    });

    const handleChange = (e) => {
        setData((state) => ({
            ...state,
            [e.target.name]: Number(e.target.value)
        }));
    };

    return (
        <div
            className={`flex flex-col p-4 bg-kn-white rounded-lg shadow-lg ${classes} `}>
            <BlockTitle
                text="Booking window"
                component={3}
                classes="flex px-4 mb-4"
            />
            <form
                onSubmit={handleSubmit}
                className="h-full flex items-center flex-col justify-between">
                <div className="px-4 ">
                    <div className="flex justify-between w-full mb-10">
                        <label>Guests</label>
                        <input
                            className="w-16 h-8 text-center rounded-lg border border-kn-primary-600"
                            onChange={handleChange}
                            maxLength="3"
                            type="number"
                            name="guests"
                            value={data['guests']}></input>
                    </div>
                    <div className="flex column flex-wrap mb-4">
                        <label className="mb-4">
                            When do you want to leave?
                        </label>
                        <input
                            className="w-full h-8 text-center rounded-lg border border-kn-primary-600"
                            onChange={handleChange}
                            maxLength={3}
                            type="number"
                            name="leave"
                            value={data['leave']}></input>
                    </div>
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
