import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getDate } from '@/helpers/apiServices/date';
import Button from 'components/blocks/Button/Button';
import Spinner from '@/components/blocks/Spinner';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';
import useXchangeRate from 'helpers/useXchangeRate2';
import { formatPrice } from 'helpers/LocaleHelper';
import { currenciesObject } from 'constants/currenciesObject';
import { Block__InputSingle } from '@/components/blocks/Blocks';
import { parseVariantDates } from '@/helpers/calander';

import { isSameDay, isBefore } from 'date-fns';
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'


const currencyOptions = {
    rounding: 0.001
};

const BuyingCardGuide = ({
    // auth: {
    //     user: {
    //         profile: { currency: preferredCurrency }
    //     }
    // },
    productData,
    loading=true,
    preferredCurrency="USD",
    classes,
    price = 50,
    desc = '',
    children,
    cart,
    expId,
    addToCart,
    removeFromCart,
    updateCart
}) => {
    const [date, setDate] = useState();
    const [modifiers, setModifiers] = useState(null);
    const { values, currency, rate } = useXchangeRate(
        [price],
        'USD',
        preferredCurrency
    );
    const [digitalBtnInfo, setdigitalBtnInfo] = useState({ showBuyBtn: true, showRmCartBtn: false });
    const productCartId = useRef(null);
    const productId = useRef(null);
    const { showBuyBtn, showRmCartBtn } = digitalBtnInfo;
    const [variants, setVariants] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [variantsReady, setVariantsReady] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const dateVariantIdLookup = useRef({});
    const  currentVariant = variants[selectedDate];


    // Funcsconsole.log()
    const removeExpFromCart = () => {
        removeFromCart(productCartId.current);
    }

    const parseVariants = (rawVariants) => {
        const tmpVariants = {};

        rawVariants.forEach((variant) => {
            const {id} = variant;

            tmpVariants[id] = {
                ...variant,
                quantity: 0
            };
        })

        return tmpVariants
    }

    const changeVariant = (date) => {
        setDate(date);
        console.log('complicated shit',dateVariantIdLookup.current[new Date(date).toISOString()])
        setSelectedDate(dateVariantIdLookup.current[new Date(date).toISOString()]) 
    }

    const addExpToCart = () => {
        const { id: variantId } = currentVariant;
        const { guided } = cart;

        if(guided[expId] && guided[expId][variantId]) {
            const { id: cartId } = guided[expId][variantId];

            if(!currentVariant.quantity) {
                removeFromCart(cartId);
            } else {
              //  updateCart(productData.id, variantId, currentVariant.quantity)
                updateCart(cartId, { quantity: currentVariant.quantity })
                console.log('update',currentVariant.quantity);
            }
                

        } else {
            console.log('add',currentVariant.quantity, currentVariant);
            console.log(productData)

            addToCart(productData.id, variantId, currentVariant.quantity);
        }
        setVariantsReady(false);
    }

    const generateFormAttrs = (loading) => {
        const btnData = {
            btnLabel: 'Add To Cart',
            btnDisabled: false,
            cost: 0
        }
        if(!loading && currentVariant) {
            const { id: variantId } = currentVariant;
            const { guided } = cart;

            btnData.cost = currentVariant.quantity * currentVariant.price
            if(guided[expId] && guided[expId][variantId]) {
                if(guided[expId][variantId].quantity === currentVariant.quantity) {
                    btnData.btnDisabled = true;
                    btnData.btnLabel =  'NA';
                } else {
                    btnData.btnDisabled = false;
                    btnData.btnLabel =  'Update Cart';
                }
            } else if (!currentVariant.quantity) {
                btnData.btnDisabled = true;
                btnData.btnLabel =  'NA';
            }
        }
        
        return btnData;
    }

    const updatePeople = (e) => {
        const { quantity, stock_level: stockLevel } = variants[selectedDate];
        const peopleCount = Number(e.target.value);

        if(peopleCount > -1 && peopleCount <= stockLevel) {
            setVariants({
                ...variants,
                [selectedDate]: {
                    ...variants[selectedDate],
                    quantity: peopleCount
                }
            });
        }

        // console.log(e.target.value, selectedDate?.id, quantity, stockLevel)
    }
console.log('variants', variants, currentVariant)
    useEffect(() => {
        if(!loading && currentDate) {
            const { id } = productData;
            productId.current = id;
            // this will check if in cart but if already bought 
            // do that check first
            setVariants(parseVariants(productData.variants.results));
            setVariantsReady(true);
            
            


            const bookableDates = parseVariantDates(productData?.variants?.results, currentDate);

            setDate(new Date(bookableDates[0]));

            

            dateVariantIdLookup.current = productData?.variants?.results.reduce((prev, next) => {
                const { id, name } = next;
                const dateKey = new Date(`${name.slice(0,2)}-${name.slice(2,4)}-${name.slice(4)}`).toISOString();

                return  { ...prev, [dateKey]: id }

            }, {});

            setSelectedDate(dateVariantIdLookup.current[bookableDates[0]]);

            setModifiers({
                disabled: (date) =>  isBefore(new Date(date), new Date(currentDate)) || !bookableDates.includes(date.toISOString()),
                highlight: (date) => bookableDates.includes(date.toISOString())
            });
            
        }
    }, [loading, currentDate]);

    useEffect(() => {
        getDate().then((data) => {
            if(!isNaN(Date.parse(data?.data))) {
                setCurrentDate(data.data);
            }
        })
    }, [])
    
console.log('currentDate', currentDate)
    const modifiersClassNames = {
        highlight: 'has-booking',
        disabledColor: 'date_used_already'
    };

    useEffect(() => {
        const { loading: cartLoading } = cart;

        if(cart !== null && !cartLoading && variantsReady) {
            const { guided } = cart;
            const tmpVariants = {};
            
            Object.keys(variants).forEach((key) => {
                tmpVariants[key] = {
                    ...variants[key],
                    quantity: guided[expId] && guided[expId][key] ? guided[expId][key].quantity : 0
                }
            })
            setVariants(tmpVariants);
        }
    }, [cart, variantsReady]);

    const {cost, btnLabel, btnDisabled} = generateFormAttrs(loading);

    return (
        <div
            className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards ${classes} `}>
            { !loading  
            ? Object.keys(variants).length && date ? <>
                <DatePicker
                    date={date}
                    onDateChange={changeVariant}
                    locale={enGB} 
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}>
                        {({ inputProps, focused }) => (
                            <input
                            className={'input' + (focused ? ' -focused' : '')}
                            {...inputProps}
                            />
                        )}
                </DatePicker>
                <div className="flex flex-col pb-2  rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4">
                    <div className="flex items-center gap-2 ">
                        <i className="ri-download-cloud-2-line text-xl text-green-500"></i>
                        <div className="text-xs uppercase">
                            Guide Access Price
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-2xl font-semibold uppercase  ">
                        <span className="relative">
                            {formatPrice(
                                currentVariant.price,
                                preferredCurrency,
                                window.navigator.language,
                                currencyOptions
                            )}
                            {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                        </span>

                        <div className="text-sm">{currency.symbol}*</div>
                        <i className="las la-long-arrow-alt-right text-green-500"></i>
                        {/* <div className="">FREE</div> */}
                    </div>
                </div>
                <div className="border-b border-green-600 border-opacity-20 pb-4 mt-4 px-2">
                    <p className="">{desc}</p>
                </div>
                <div className="mt-4 pb-4 px-2">
                    {/* <div className="flex items-center gap-1 text-xs">
                        <div className="">* Charged as</div>
                        <div className="">$US</div>
                        <span>
                            {formatPrice(
                                variants.current[selectedDate].price,
                                'USD',
                                window.navigator.language,
                                currencyOptions
                            )}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <div className="">** 1 $US ~ </div>

                        <span>
                            {formatPrice(
                                rate,
                                'USD',
                                window.navigator.language,
                                currencyOptions
                            )}
                        </span>
                        <div className="">
                            {currenciesObject[preferredCurrency].symbol}
                        </div>
                    </div> */}
                    <div>
                        Avail places: {currentVariant.stock_level}
                        <Block__InputSingle
                                isDisabled={false}
                                normal
                              //  error={priceError}
                                // handleChange={(e) =>
                                //     handleCapacityPriceChange(
                                //         e,
                                //         groupIndex,
                                //         key
                                //     )
                                // }
                                handleChange={updatePeople}
                                id='price'
                                iconText='Price per person'
                                iconClass='text-xs'
                                iconPadding='pl-36 pr-4'
                                width='w-60'
                                height='h-10'
                                margins=''
                                value={currentVariant.quantity}
                                placeholder=''
                                //rtl={rtl}
                                type={'number'}
                                autoComplete={"off"}
                            />
                        {/* <Block__InputSingle
                            // label='Price per person'
                            iconText='Price per person'
                            labelPos='left'
                            className='text-xs'
                            height='h-10'
                            width='w-full'
                            rounded='rounded-lg'
                            handleChange={null}
                            // handleChange={handleUpdateDefaults}
                            id={`price`}
                            name='price'
                            value={1}
                            type={'number'}
                        /> */}
                    </div>
                </div>
                <div>
                    cost: {cost}
                </div>
                <div className="h-full flex items-center flex-col justify-between">
                    <Button
                        disabled={btnDisabled}
                        label={btnLabel}
                        as="button"
                        handleClick={addExpToCart}
                        width="w-full"
                    />
                    {/* { showBuyBtn
                        && <Button
                                label="add to basket"
                                as="button"
                                handleClick={addExpToCart}
                                width="w-full"
                            />
                    }
                    { showRmCartBtn
                        && <Button
                                label="remove from basket"
                                as="button"
                                handleClick={removeExpFromCart}
                                width="w-full"
                            />
                    }
                    { (!showBuyBtn && !showRmCartBtn && <div>Already bought</div>)} */}

                    {children}
                </div>
            </> : <div>No Bookable dates avaialable</div>
                : <Spinner />
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    experienceDetails: state.experienceDetails,
    globalState: state.globalState,
    auth: state.auth,
    cart: state.cart // check what already in yhe cart
    // also once logged in check if they already booked this product
});

export default connect(mapStateToProps)(BuyingCardGuide);
