import React from 'react';
import BlockTitle from '@/blocks/Title/BlockTitle';

const JourneyDayContent = ({ title, subtitle, desc }) => {
    return (
        <div>
            <BlockTitle text={title} component={5} classes="mb-4" />
            <p>{subtitle}</p>
            <hr className="w-12 mt-2 mb-4" />
            <p className="">{desc}</p>
        </div>
    );
};

export default JourneyDayContent;
