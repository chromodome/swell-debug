import React, { useState } from 'react';
import { BookingPickerBlock } from './';
import Modal from '@/blocks/Modal/Modal';

export default function BookingPickerModal({
    days,
    opened,
    onClose,
    persons,
    price
}) {
    // !!!!!!!!!
    // update onBuy<func>
    return (
        <Modal isOpen={opened} setIsClose={onClose}>
            <BookingPickerBlock
                onBuy={onClose}
                days={days}
                persons={persons}
                price={price}
            />
        </Modal>
    );
}
