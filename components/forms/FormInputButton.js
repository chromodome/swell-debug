import React from 'react';
import FormInput from './FormInput';

const FormInputButton = (props) => {
  // Figure out width kr or uk

  const data = {
    size: 'pc-3-4',
    name: 'scrapeUrl',
    placeholder: 'Paste your URL',
  };

  let btnText = 'Pull Data';
  if (props.isLoading) {
    btnText = <span uk-spinner='ratio: 0.5'></span>;
  }

  return (
    <React.Fragment>
      <div className='mb-5'>
        <form
          onSubmit={props.onPull.bind(this)}
          id='scrapeForm'
          className='uk-form-stacked uk-grid-small kr-form-control'
          uk-grid=''
        >
          <FormInput
            data={data}
            onChange={props.onChange}
            type='url'
            url={true}
          />
          <div className='uk-width-1-4@s mt-6@s'>
            <button
              type='submit'
              form='scrapeForm'
              className='uk-button kr-btn kr-color-green kr-hover-cyan uk-width-1-1 py-6 py-3@s kr-card-hover kr-card-move-hover-t-5'
            >
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormInputButton;
