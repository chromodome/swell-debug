import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import Select from 'react-select';
const Select = dynamic(() => import('react-select'), { ssr: false });

function GenericSelectList({
    selectOptions,
    handleChange,
    keys = { id: 'id', label: 'label' },
    initialSelected,
    height = '3.5rem',
    bgColor = '#F3F4F6',
    width,
    panelHeight = '150px',
    placement = 'bottom',
    labelTextSize = '0.875rem',
    menuTextSize = '0.875rem',
    selectedValue,
    isLoading
}) {
    const colourStyles = {
        control: (styles, state) => ({
            ...styles,
            backgroundColor: state.isFocused ? 'white' : bgColor,
            borderRadius: '0.75rem',
            borderColor: state.isFocused ? '#34D399' : 'transparent',
            minHeight: height,
            boxShadow: state.isFocused ? '0 0 0 4px #D1FAE5' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#34D399' : 'transparent',
                boxShadow: '0 0 0 4px #A7F3D0',
                backgroundColor: 'white'
            }
        }),
        valueContainer: (styles) => ({
            ...styles,
            padding: '0 0.5rem 0 1.5rem',
            fontSize: labelTextSize
        }),
        singleValue: (styles) => ({
            ...styles
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            width: 0
        }),
        option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isDisabled ? '#F3F4F6' : 'white',
            borderRadius: '4px',
            color: '#111827',
            padding: '0.5rem 1.5rem',
            fontSize: menuTextSize,
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            '&:hover': {
                backgroundColor: '#D1FAE5',
                color: '#064E3B'
            }
        }),
        menu: (styles) => ({
            ...styles,
            overflow: 'hidden',
            borderRadius: '0.75rem',
            padding: '0.75rem 0',
            borderWidth: '5px',
            borderColor: 'transparent',
            boxShadow: '0 25px 50px -12px rgba(0, 128, 87, 0.25)'
            // maxHeight: '200px'
        }),
        menuList: (styles) => ({
            ...styles,

            maxHeight: panelHeight
        })
    };

    let initialIndex = 0;
    const options = selectOptions.map((val, index) => {
        if (typeof val === 'object') {
            if (initialSelected && val[keys.id] === initialSelected) {
                initialIndex = index;
            }
            return {
                value: val[keys.id],
                label: val[keys.label]
            };
        }
        if (initialSelected && val === initialSelected) {
            initialIndex = index;
        }

        return {
            value: val,
            label: val
        };
    });

    const findInitialValue = () => {
        if (selectedValue)
            return options[
                options.findIndex((elm) => elm.value === selectedValue)
            ];
        else return options[initialIndex];
    };

    const [value, setValue] = useState(null);
    const selectChange = (data) => {
        if (handleChange) {
            handleChange(data.value);
        }
        setValue(data);
    };

    useEffect(() => {
        setValue(findInitialValue());
    }, [isLoading]);

    return (
        <div className={`${width} flex-grow-0`}>
            <Select
                value={value}
                isClearable={false}
                options={options}
                onChange={selectChange}
                isSearchable
                styles={colourStyles}
                menuPlacement={placement}
            />
        </div>
    );
}

export default GenericSelectList;
