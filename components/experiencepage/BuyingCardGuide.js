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
import {
    parseVariantDates,
    convertVariantNameDateToIso
} from '@/helpers/calander';
import { isSameDay, isBefore } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DatePicker } from 'react-nice-dates';
import PillType from '../blocks/Card/PillType';
import classNames from 'classnames';
import InputDate from '../blocks/InputDate';
import SkeletonText from '../blocks/Card/SkeletonText';
import SkeletonButton from '../blocks/Card/SkeletonButton';

const currencyOptions = {
    rounding: 0.001
};

const BuyingCardGuide = ({
    mobile,
    auth,
    productData,
    loading = true,
    // preferredCurrency = 'USD',
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
    const preferredCurrency = auth?.user?.profile?.currency ?? 'USD';

    const { values, currency, rate } = useXchangeRate(
        [price],
        'USD',
        preferredCurrency
    );
    const [digitalBtnInfo, setdigitalBtnInfo] = useState({
        showBuyBtn: true,
        showRmCartBtn: false
    });
    const productCartId = useRef(null);
    const productId = useRef(null);
    const { showBuyBtn, showRmCartBtn } = digitalBtnInfo;
    const [variants, setVariants] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [variantsReady, setVariantsReady] = useState(false);
    const [currentDate, setCurrentDate] = useState(null);
    const dateVariantIdLookup = useRef({});
    const [currentVariant, setCurrentVariant] = useState(null);
    const modifiersClassNames = {
        highlight: 'has-booking',
        disabledColor: 'date_used_already'
    };

    // Funcsconsole.log()
    const removeExpFromCart = () => {
        removeFromCart(productCartId.current);
    };

    const parseVariants = (rawVariants) => {
        const tmpVariants = {};

        rawVariants.forEach((variant) => {
            const { id } = variant;

            tmpVariants[id] = {
                ...variant,
                quantity: 0
            };
        });

        return tmpVariants;
    };

    const changeVariant = (date) => {
        setDate(date);
        setSelectedDate(
            dateVariantIdLookup.current[new Date(date).toISOString()]
        );
    };

    const addExpToCart = () => {
        const { id: variantId } = currentVariant;
        console.log('currentVariant', currentVariant);
        const { guided } = cart;

        if (guided[expId] && guided[expId][variantId]) {
            const { id: cartId } = guided[expId][variantId];

            if (!currentVariant.quantity) {
                removeFromCart(cartId);
            } else {
                updateCart(cartId, { quantity: currentVariant.quantity });
            }
        } else {
            addToCart(productId.current, variantId, currentVariant.quantity);
        }
        setVariantsReady(false);
    };

    const generateFormAttrs = (loading) => {
        const btnData = {
            btnLabel: 'Book Now',
            btnDisabled: false,
            cost: 0
        };
        if (!loading && currentVariant) {
            const { id: variantId } = currentVariant;
            const { guided } = cart;

            btnData.cost = currentVariant.quantity * currentVariant.price;
            if (guided[expId] && guided[expId][variantId]) {
                if (
                    guided[expId][variantId].quantity ===
                    currentVariant.quantity
                ) {
                    btnData.btnDisabled = true;
                    btnData.btnLabel = 'NA';
                } else {
                    btnData.btnDisabled = false;
                    btnData.btnLabel = 'Update Cart';
                }
            } else if (!currentVariant.quantity) {
                btnData.btnDisabled = true;
                btnData.btnLabel = 'Select number of guests';
            }
        }

        return btnData;
    };

    const updatePeople = (e) => {
        const { quantity, stock_level: stockLevel } = variants[selectedDate];
        const peopleCount = Number(e.target.value);

        if (peopleCount > -1 && peopleCount <= stockLevel) {
            setVariants({
                ...variants,
                [selectedDate]: {
                    ...variants[selectedDate],
                    quantity: peopleCount
                }
            });
        }
    };

    useEffect(() => {
        console.log('productDataproductData', productData);
        if (!loading && currentDate) {
            productId.current = productData.length
                ? productData[0].parent_id
                : null;

            // this will check if in cart but if already bought
            // do that check first
            setVariants(parseVariants(productData));
            setVariantsReady(true);
            const bookableDates = parseVariantDates(productData, currentDate);
            setDate(new Date(bookableDates[0]));
            dateVariantIdLookup.current = productData.reduce((prev, next) => {
                const { id, name } = next;
                const dateKey = convertVariantNameDateToIso(name);

                return { ...prev, [dateKey]: id };
            }, {});

            setSelectedDate(dateVariantIdLookup.current[bookableDates[0]]);

            setModifiers({
                disabled: (date) =>
                    isBefore(new Date(date), new Date(currentDate)) ||
                    !bookableDates.includes(date.toISOString()),
                highlight: (date) => bookableDates.includes(date.toISOString())
            });
        }
    }, [loading, currentDate]);

    useEffect(() => {
        getDate().then((data) => {
            if (!isNaN(Date.parse(data?.data))) {
                setCurrentDate(data.data);
            }
        });
    }, []);

    useEffect(() => {
        const { loading: cartLoading } = cart;

        if (cart !== null && !cartLoading && variantsReady) {
            const { guided } = cart;
            const tmpVariants = {};

            Object.keys(variants).forEach((key) => {
                tmpVariants[key] = {
                    ...variants[key],
                    quantity:
                        guided[expId] && guided[expId][key]
                            ? guided[expId][key].quantity
                            : 0
                };
            });
            setVariants(tmpVariants);
        }
    }, [cart, variantsReady]);

    const { cost, btnLabel, btnDisabled } = generateFormAttrs(loading);

    useEffect(() => {
        console.log(variants[selectedDate]);
        setCurrentVariant(variants[selectedDate]);
    }, [selectedDate, variants]);

    return (
        <div
            className={classNames(
                'relative flex flex-col px-4 xl:px-8 pt-8 pb-2 md:pb-4 xl:pb-8 xl:pt-8 bg-kn-white d-hdpi-2:pt-vw-8 d-hdpi-2:pb-vw-8 d-hdpi-2:px-vw-8',
                mobile
                    ? 'rounded-t-2xl d-hdpi-2:rounded-t-vw-2xl shadow-cards-top'
                    : 'rounded-2xl d-hdpi-2:rounded-vw-2xl shadow-cards',
                classes
            )}>
            {!loading && currentVariant ? (
                Object.keys(variants).length && !isNaN(date.getTime()) ? (
                    <>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                            <PillType type="guided" label="Buying Options" />
                        </div>
                        <div className="flex md:hidden lg:flex flex-col gap-4 d-hdpi-2:gap-2">
                            <div
                                className={classNames(
                                    'flex flex-col gap-2 d-hdpi-2:gap-1 rounded-xl d-hdpi-2:rounded-vw-xl bg-kn-gray-100 px-4 lg:px-8 py-4 d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-4'
                                )}>
                                <div className="flex items-center gap-2 d-hdpi-2:gap-1 text-2xl d-hdpi-2:text-vw-2xl font-semibold uppercase justify-center ">
                                    <div
                                        className={classNames(
                                            'flex items-center'
                                        )}>
                                        <span className="text-base">$</span>
                                        <span className="">
                                            {formatPrice(
                                                currentVariant?.price,
                                                'USD',
                                                window.navigator.language,
                                                currencyOptions
                                            )}
                                            {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                        </span>
                                    </div>

                                    {preferredCurrency !== 'USD' && (
                                        <>
                                            <i className="las la-equals text-green-500"></i>
                                            <span className="relative">
                                                {`~${formatPrice(
                                                    currentVariant?.price,
                                                    preferredCurrency,
                                                    window.navigator.language,
                                                    currencyOptions
                                                )}`}
                                                {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                            </span>
                                            <div className="text-sm d-hdpi-2:text-vw-sm">
                                                {currency.symbol}*
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 d-hdpi-2:gap-1 rounded-xl d-hdpi-2:rounded-vw-xl bg-kn-gray-100 px-4 lg:px-8 pt-4 pb-4 vk d-hdpi-2:px-vw-8 d-hdpi-2:pt-vw-4 d-hdpi-2:pb-vw-4">
                                <div className="flex items-center gap-2 d-hdpi-2:gap-1">
                                    <i className="ri-calendar-2-line text-xl d-hdpi-2:text-vw-xl text-green-500"></i>
                                    <div className="text-xs d-hdpi-2:text-vw-xs uppercase flex-none">
                                        Booking Date
                                    </div>
                                </div>
                                <DatePicker
                                    date={date}
                                    onDateChange={changeVariant}
                                    locale={enGB}
                                    modifiers={modifiers}
                                    modifiersClassNames={modifiersClassNames}>
                                    {({ inputProps, focused }) => (
                                        <div className="relative">
                                            <div className="ml-4 d-hdpi-2:ml-vw-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-xs d-hdpi-2:text-vw-xs text-gray-600 whitespace-nowrap">
                                                Check-in
                                            </div>

                                            <input
                                                className={classNames(
                                                    focused
                                                        ? ' input-focused'
                                                        : 'input',
                                                    'flex-1 w-full focus:outline-none text-sm d-hdpi-2:text-vw-sm h-10 d-hdpi-2:h-vw-10 rounded-xl d-hdpi-2:rounded-vw-xl pl-28 pr-4 d-hdpi-2:pl-vw-28 d-hdpi-2:pr-vw-4'
                                                )}
                                                {...inputProps}
                                            />
                                        </div>
                                    )}
                                </DatePicker>
                                <Block__InputSingle
                                    isDisabled={false}
                                    normal
                                    whiteBg
                                    bgColor="#ffffff"
                                    handleChange={updatePeople}
                                    id="price"
                                    iconText="Guests"
                                    iconClass="text-xs d-hdpi-2:text-vw-xs"
                                    iconPadding="pl-36 pr-2 d-hdpi-2:pl-vw-36 d-hdpi-2:pr-vw-2"
                                    width="w-full"
                                    height="h-10 d-hdpi-2:h-vw-10"
                                    margins=""
                                    value={currentVariant.quantity}
                                    placeholder=""
                                    //rtl={rtl}
                                    type={'number'}
                                    autoComplete={'off'}
                                />
                            </div>
                            <Button
                                disabled={btnDisabled}
                                label={btnLabel}
                                as="button"
                                handleClick={addExpToCart}
                                width="w-full"
                            />
                        </div>
                        <div className="hidden md:flex lg:hidden gap-4 d-hdpi-2:gap-2">
                            <div className="flex flex-col gap-2 d-hdpi-2:gap-1 w-1/2 justify-between h-max">
                                <div
                                    className={classNames(
                                        'flex flex-col gap-2 d-hdpi-2:gap-1 rounded-xl d-hdpi-2:rounded-vw-xl bg-kn-gray-100 px-4 lg:px-8 py-4 d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-4'
                                    )}>
                                    <div className="flex items-center gap-2 d-hdpi-2:gap-1 text-2xl d-hdpi-2:text-vw-2xl font-semibold uppercase justify-center ">
                                        <div
                                            className={classNames(
                                                'flex items-center'
                                            )}>
                                            <span className="text-base d-hdpi-2:text-vw-base">
                                                $
                                            </span>
                                            <span className="">
                                                {formatPrice(
                                                    currentVariant?.price,
                                                    'USD',
                                                    window.navigator.language,
                                                    currencyOptions
                                                )}
                                                {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                            </span>
                                        </div>

                                        {preferredCurrency !== 'USD' && (
                                            <>
                                                <i className="las la-equals text-green-500"></i>
                                                <span className="relative">
                                                    {`~${formatPrice(
                                                        currentVariant?.price,
                                                        preferredCurrency,
                                                        window.navigator
                                                            .language,
                                                        currencyOptions
                                                    )}`}
                                                    {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                                </span>
                                                <div className="text-sm d-hdpi-2:text-vw-sm">
                                                    {currency.symbol}*
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    disabled={btnDisabled}
                                    label={btnLabel}
                                    as="button"
                                    handleClick={addExpToCart}
                                    width="w-full"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2 d-hdpi-2:gap-1 rounded-xl d-hdpi-2:rounded-vw-xl bg-kn-gray-100 px-4 lg:px-8 pt-4 pb-4 d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-4">
                                <div className="flex items-center gap-2 d-hdpi-2:gap-1">
                                    <i className="ri-calendar-2-line text-xl d-hdpi-2:text-vw-xl text-green-500"></i>
                                    <div className="text-xs uppercase flex-none">
                                        Booking Date
                                    </div>
                                </div>
                                <DatePicker
                                    date={date}
                                    onDateChange={changeVariant}
                                    locale={enGB}
                                    modifiers={modifiers}
                                    modifiersClassNames={modifiersClassNames}>
                                    {({ inputProps, focused }) => (
                                        <div className="relative">
                                            <div className="ml-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 whitespace-nowrap">
                                                Check-in
                                            </div>

                                            <input
                                                className={classNames(
                                                    focused
                                                        ? ' input-focused'
                                                        : 'input',
                                                    'flex-1 w-full focus:outline-none text-sm h-10 rounded-xl pl-28 pr-4'
                                                )}
                                                {...inputProps}
                                            />
                                        </div>
                                    )}
                                </DatePicker>
                                <Block__InputSingle
                                    isDisabled={false}
                                    normal
                                    whiteBg
                                    bgColor="#ffffff"
                                    handleChange={updatePeople}
                                    id="price"
                                    iconText="Guests"
                                    iconClass="text-xs"
                                    iconPadding="pl-36 pr-2"
                                    width="w-full"
                                    height="h-10"
                                    margins=""
                                    value={currentVariant.quantity}
                                    placeholder=""
                                    //rtl={rtl}
                                    type={'number'}
                                    autoComplete={'off'}
                                />
                            </div>
                        </div>
                        {!mobile && (
                            <div className="flex flex-col mt-8 px-2 gap-4 d-hdpi-2:gap-2 d-hdpi-2:mt-vw-8 d-hdpi-2:px-vw-2">
                                <div className="flex flex-col text-sm d-hdpi-2:text-vw-sm">
                                    <div className="flex justify-between">
                                        <div className="flex gap-1 d-hdpi-2:gap-0.5">
                                            <span className="text-base d-hdpi-2:text-vw-base">
                                                $
                                            </span>
                                            <span className="">
                                                {formatPrice(
                                                    currentVariant?.price,
                                                    'USD',
                                                    window.navigator.language,
                                                    currencyOptions
                                                )}
                                                {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                            </span>
                                            <span>x</span>
                                            <span>
                                                {currentVariant.quantity}
                                            </span>
                                            <span>guests</span>
                                        </div>
                                        <div className="flex gap-1 d-hdpi-2:gap-0.5">
                                            <span className="text-base d-hdpi-2:text-vw-base">
                                                $
                                            </span>
                                            <span className="">
                                                {formatPrice(
                                                    cost,
                                                    'USD',
                                                    window.navigator.language,
                                                    currencyOptions
                                                )}
                                                {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-300"></div>
                                <div className="flex flex-col text-sm d-hdpi-2:text-vw-sm font-bold">
                                    <div className="flex justify-between">
                                        <div className="flex gap-1 d-hdpi-2:gap-0.5">
                                            <span className="text-base d-hdpi-2:text-vw-base">
                                                Total
                                            </span>
                                        </div>
                                        <div className="flex gap-1 d-hdpi-2:gap-0.5">
                                            <span className="text-base d-hdpi-2:text-vw-base">
                                                $
                                            </span>
                                            <span className="">
                                                {formatPrice(
                                                    cost,
                                                    'USD',
                                                    window.navigator.language,
                                                    currencyOptions
                                                )}
                                                {/* <span className="absolute top-1/2 transform -translate-y-1/2 inset-x-0 h-1 bg-red-500"></span> */}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* <div className="border-b border-green-600 border-opacity-20 pb-4 mt-4 px-2">
                            <p className="">{desc}</p>
                        </div>
                        <div className="mt-4 pb-4 px-2">
                            <div>
                                Avail places: {currentVariant.stock_level}
                            </div>
                        </div>
                        <div>cost: {cost}</div> */}
                        <div className="h-full flex items-center flex-col justify-between">
                            {children}
                        </div>
                    </>
                ) : (
                    <div>No Bookable dates avaialable</div>
                )
            ) : (
                <>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <PillType type="guided" label="Buying Options" />
                    </div>
                    <div className="flex flex-col pb-2  rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4 d-hdpi-2:rounded-vw-xl d-hdpi-2:px-vw-8 d-hdpi-2:py-vw-4 d-hdpi-2:pb-vw-2">
                        <div className="flex items-center gap-2 d-hdpi-2:gap-1 justify-center">
                            {/* <i className="ri-download-cloud-2-line text-xl text-green-500"></i> */}
                            <SkeletonText
                                width="w-6 d-hdpi-2:w-vw-6"
                                height="h-6 d-hdpi-2:h-vw-6"
                            />
                            <SkeletonText width="w-28 d-hdpi-2:w-vw-28" />
                            {/* <div className="text-xs uppercase">
                            Digital Access Price
                        </div> */}
                        </div>

                        <div className="justify-center flex items-center gap-2 d-hdpi-2:gap-1 text-2xl d-hdpi-2:text-vw-2xl font-semibold uppercase animate-pulse my-4 d-hdpi-2:my-vw-4">
                            <SkeletonText width="w-28 d-hdpi-2:w-vw-28" />
                            <SkeletonText width="w-16 d-hdpi-2:w-vw-16" />
                        </div>
                    </div>
                    <div className="flex flex-col  gap-4 d-hdpi-2:gap-2 rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-8 mt-4 d-hdpi-2:rounded-vw-xl d-hdpi-2:px-vw-8 d-hdpi-2:mt-vw-4 d-hdpi-2:py-vw-8">
                        <div className="flex items-center gap-2 d-hdpi-2:gap-1 justify-center ">
                            <SkeletonText width="w-48 d-hdpi-2:w-vw-48" />
                        </div>
                        <div className="flex items-center gap-2 d-hdpi-2:gap-1 justify-center ">
                            <SkeletonText width="w-48 d-hdpi-2:w-vw-48" />
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'h-full flex items-center flex-col justify-between',
                            'mt-4 d-hdpi-2:mt-vw-4'
                        )}>
                        <SkeletonButton width="w-full" />

                        {children}
                    </div>
                    {!mobile && (
                        <>
                            <div className="py-6 px-2 d-hdpi-2:py-vw-9 d-hdpi-2:px-vw-2">
                                <div className="flex flex-col gap-3 d-hdpi-2:gap-1.5 text-xs d-hdpi-2:text-vw-xs">
                                    <SkeletonText width="w-28 d-hdpi-2:w-vw-28" />
                                    <SkeletonText width="w-20 d-hdpi-2:w-vw-20" />
                                </div>
                            </div>
                            <div className="border-b border-gray-300 border-opacity-50 pb-4 mt-4 px-2 d-hdpi-2:pb-vw-4 d-hdpi-2:mt-vw-4 d-hdpi-2:px-vw-2">
                                <p className="">{desc}</p>
                            </div>
                            <div className="pt-6 px-2 d-hdpi-2:pt-vw-6 d-hdpi-2:px-vw-2">
                                <div className="flex flex-col gap-3 d-hdpi-2:gap-1.5 text-xs d-hdpi-2:text-vw-xs">
                                    <SkeletonText width="w-28 d-hdpi-2:w-vw-28" />
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
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
