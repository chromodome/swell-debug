import React, { useMemo, useState } from 'react';
import Datepicker from '@/blocks/Datepicker';
import { Select } from '@/blocks/Select';
import { Button } from '@/blocks/Button/Buttons';

export default function BookingPickerBlock({ persons, days, onBuy, price }) {
    const personsNumber = Number(persons);
    const [disabledPicker, setDisabledPicker] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState(null);

    const items = useMemo(() => {
        let arr = [];

        for (let i = 0; personsNumber > i; i++) {
            const item = { value: i + 1, label: `${i + 1} Person` };
            arr = [...arr, item];
        }

        return arr;
    }, [personsNumber]);

    const currentPrice = useMemo(() => {
        if (selectedPersons?.value) {
            const nextPrice = selectedPersons.value * price;

            return nextPrice;
        }
    }, [selectedPersons, price]);

    const handleChange = (e) => setSelectedPersons(e);

    return (
        <div
            className="flex justify-center items-center
                flex-col py-6 px-4 max-w-xs	">
            <div className="mb-4 w-full">
                <label className="block mb-2">
                    Choose the number of person:
                </label>
                <Select
                    value={selectedPersons}
                    items={items}
                    handleChange={handleChange}
                />
            </div>
            <div className="mb-8 w-full">
                <label className="block mb-2">Choose date:</label>
                <Datepicker days={days} />
            </div>

            {selectedPersons?.value && price && (
                <div className="grid w-full grid-cols-2 grid-rows-3 mb-6 divide-y-1 divide-kn-primary-100">
                    <div>Person:</div>
                    <div className="text-right">{selectedPersons?.value}</div>
                    <div>Price:</div>
                    <div className="text-right">${price}</div>
                    <div className="font-bold border-t-2 border-kn-primary-100">
                        Total:{' '}
                    </div>
                    <div className="font-bold text-right border-t-2 border-kn-primary-100">
                        ${currentPrice}{' '}
                    </div>
                </div>
            )}

            <Button
                wrapperClasses="text-align"
                rounded="full"
                handleClick={onBuy}>
                Buy
            </Button>
        </div>
    );
}

BookingPickerBlock.defaultProps = {
    persons: 1,
    days: 1
};
