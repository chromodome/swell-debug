import GenericSelectList from '@/components/blocks/GenericSelectList';
import { currenciesArray } from '@/constants/currenciesArray';

const currencyList = [
    {
        id: '000',
        label: 'Select currency'
    },

    ...currenciesArray.map((currency) => {
        return {
            id: currency.code,
            label: `${currency.name} - ${currency.symbol}`
        };
    })
];

const CurrencyList = ({
    responsive,
    selectedValue,
    handleChange,
    height,
    width,
    bgColor,
    panelHeight,
    placement,
    labelTextSize,
    menuTextSize,
    isLoading,
    labelPos = 'top',
    label,
    labelWidth = 'w-48',
    labelJustify = 'text-left',
    labelClass = 'text-xs px-2 text-gray-600 whitespace-nowrap',
    labelMargin = 'mb-2'
}) => {
    // console.log('id1', selectedValue);
    return (
        <div className={`flex-1`}>
            <div
                className={`${
                    labelPos === 'left'
                        ? responsive
                            ? 'flex flex-col'
                            : 'flex items-center '
                        : ''
                }`}>
                {label && (
                    <div
                        className={`${
                            responsive
                                ? 'mb-2 ml-2 text-xs text-gray-600 whitespace-nowrap'
                                : `${labelClass} ${labelWidth} ${labelJustify} ${labelMargin}`
                        } `}>
                        {label}
                    </div>
                )}
                <GenericSelectList
                    selectOptions={currencyList}
                    handleChange={handleChange}
                    keys={{ id: 'id', label: 'label' }}
                    selectedValue={selectedValue}
                    height={height}
                    width={width}
                    bgColor={bgColor}
                    panelHeight={panelHeight}
                    placement={placement}
                    labelTextSize={labelTextSize}
                    menuTextSize={menuTextSize}
                    label={label}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default CurrencyList;
