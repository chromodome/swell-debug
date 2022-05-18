import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingPage = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  // { delay: 500 } promiseInProgress
  return (
    promiseInProgress && (
      <div
        className={`uk-width-1-1 uk-height-viewport kr-color-white uk-align-center uk-flex uk-flex-center kr-overlay-fixed ${
          props.modal ? 'kr-z-loading-top' : 'kr-z-loading-page'
        } kr-color-limbo my-0`}
      >
        <div
          className='uk-position-absolute uk-transform-center kr-center-middle kr-text-default'
          uk-spinner='ratio: 2'
        ></div>
      </div>
    )
  );
};

export default LoadingPage;
