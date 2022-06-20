import React from 'react';

import Destination from './Destination';

function DestinationList({ destinations }) {
    const rtl = false;

    return (
        <div className="mt-16 mb-16 d-hdpi-2:mt-vw-16 d-hdpi-2:mb-vw-16">
            {destinations.length
                ? destinations.map((obj, index) => {
                      return (
                          <Destination
                              index={index}
                              key={`dest${index}`}
                              destInf={obj}
                              label={'text'}
                              icon="CHECK"
                              bullet="TRAIN"
                          />
                      );
                  })
                : null}
        </div>
    );
}

export default DestinationList;
