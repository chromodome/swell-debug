import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ items, value, handleChange, classes }) => {
    return (
        <Select
            options={items}
            styles={customStyles}
            defaultValue={value}
            onChange={handleChange}
        />
    );
};

CustomSelect.defaultProps = {
    items: [],
    classesSelect: '',
    classesOption: '',
    value: '',
    handleChange: (e) => console.log('Select Component:', e.target.value)
};

const customStyles = {
    container: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 2rem',
        height: '3rem',
        cursor: 'pointer'
    }),
    control: (provided, { isFocused }) => ({
        ...provided,
        borderRadius: '2rem',
        boxShadow: isFocused ? '0 0 0 1px #31cf95' : '',
        borderColor: isFocused ? '#31cf95' : '#e5e5e7',
        '&:hover': {
            borderColor: '#E4F2F0'
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        width: 0
    }),
    option: (provided, { isSelected }) => ({
        ...provided,
        color: isSelected ? 'white' : 'black',
        fontSize: '1rem',
        borderRadius: '2rem',
        padding: '0.8rem 2rem',
        background: isSelected ? '#31cf95' : 'white',
        cursor: 'pointer',
        '&:active': {
            background: '#6ce6b6'
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '1.5rem'
    })
};

export { CustomSelect as Select };
