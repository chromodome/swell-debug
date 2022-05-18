/* eslint-disable react/jsx-pascal-case */
/* eslint-disable arrow-body-style */
import { connect } from 'react-redux';

import React, { useState } from 'react';

import ExpSubsection from '@/components/sections/ExpSubsection';
import ItineraryCard from '@/components/blocks/Card/ItineraryCard';

function SectionMarketingItinerary(props) {
    const {
        itinerary: { trip_days: ItineraryDaysList = [] }
    } = props;

    return (
        <ExpSubsection>
            <div className="marketing-title">Experience Itinerary</div>

            <div className="w-full">
                {ItineraryDaysList.map((dayContent, index) => {
                    return (
                        <ItineraryCard
                            key={`itin_${index}`}
                            data={dayContent}
                            index={index}
                        />
                    );
                })}
            </div>
        </ExpSubsection>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps, {})(SectionMarketingItinerary);
