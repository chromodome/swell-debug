import React from 'react';

const FormInput = props => {
  // Figure out width kr or uk
  let thisField = '';
  let btnWidth = `mt-6 uk-width-${props.data.size.slice(3)}@s`;
  if (props.data.size.slice(0, 2) === 'px')
    btnWidth = `mt-6 uk-width-1-1 kr-width-${props.data.size.slice(3)}@s`;

  return (
    <div className={`${thisField} ${btnWidth}`}>
      <label>{props.data.label}</label>
      <input
        onChange={props.onChange}
        className='uk-input'
        name={props.data.name}
        type={props.data.type}
        placeholder={props.data.placeholder}
        value={props.value}
      />
    </div>
  );
};

export default FormInput;
