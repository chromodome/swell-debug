import { useState } from 'react';
import Button from '@/components/blocks/Button/Button';
import Layout from '@/components/layouts/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpSubsection from '@/components/sections/ExpSubsection';
import { currenciesObject } from '@/constants/currenciesObject';
import { getCheckoutData } from '@/helpers/apiServices/checkout';
import moment from 'moment';
import {
    calculateCheckout,
    capitalize,
    kreatorName,
    pluralize
} from '@/helpers/FEutils';
import {
    country,
    findLowestPrice,
    formatPrice,
    getBrowserLocale
} from '@/helpers/LocaleHelper';
import useXchangeRate from '@/helpers/useXchangeRate';
import { User, Clock, MapPin, Users, Layers } from 'lucide-react';

import { regexString } from '@/helpers/regexPatterns';

import FormIkInput from '@/components/forms/FormIkInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CountryList from '@/components/blocks/CountryList';
import { submitPayment, clearPaymentErrors } from '@/store/actions/payment';
import ButtonLoad from '@/components/blocks/ButtonLoad';
import FormIkPayment from '@/components/forms/FormIkPayment';
import { CardAmex, CardMastercard, CardVisa } from '@/components/svg/BankCards';

// book/experiences/:id?sku=123&guests=3&isPrivate=false

const currencyOptions = {
    rounding: 0.001
};

const Checkout = ({
    submitPayment,
    clearPaymentErrors,
    payment: { processing },
    globalState: { loading },
    checkoutTotals,
    checkoutData: { skus },
    auth
}) => {
    let preferredCurrency = auth?.user?.profile?.currency || 'USD';

    const {
        booking_date,
        capacity,
        id: sku_id,
        inventory,
        price,
        product: {
            days,
            experience_id,
            type,
            places_lists,
            short_content,
            user: { username, profile }
        }
    } = skus[0];

    const {
        unitPrice,
        qty,
        subTotal,
        discountTotal,
        discountArr,
        taxRate,
        tax,
        total
    } = checkoutTotals;

    const { rate } = useXchangeRate({ from: 'USD', to: preferredCurrency });

    // start of some JSX needed consts

    const lineItemJSX = {
        lineItem: `${formatPrice(
            (unitPrice * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )} ${
            type == 'GUIDED'
                ? ` x ${pluralize(qty, 'guest')}`
                : ' (Digital Access)'
        }`,
        amount: `${formatPrice(
            (subTotal * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )}`
    };

    const subtotalJSX = {
        lineItem: `Subtotal (${preferredCurrency})`,
        amount: `${formatPrice(
            (subTotal * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )}`
    };

    const discountTotalJSX = {
        lineItem: `Discount (${preferredCurrency})`,
        amount: `${formatPrice(
            (discountTotal * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )}`
    };

    const taxJSX = {
        lineItem: `Tax (${taxRate.toFixed(2)})%`,
        amount: `${formatPrice(
            (tax * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )}`
    };

    const totalJSX = {
        lineItem: `Total (${preferredCurrency})`,
        amount: `${formatPrice(
            (total * rate) / 100,
            preferredCurrency,
            getBrowserLocale(),
            currencyOptions,
            'currency'
        )}`
    };

    // end of JSX

    // handle form submission

    const [selectedCountry, setSelectedCountry] = useState('FR');
    const handleCountryChange = (val) => {
        setSelectedCountry(val);
        // console.log('profile', profileDataObj);
    };

    const handleSubmit = (values, actions) => {
        submitPayment({ ...values, ccCountry: selectedCountry });
        console.log('values =', { ...values, ccCountry: selectedCountry });
        actions.setSubmitting(false);
    };

    // end form submission

    return (
        <>
            <Layout>
                <div
                    className={` mb-12 mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl `}>
                    <div className={``}>
                        <div className="inline-block text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold text-3xl tracking-tight leading-none pb-8">
                            Checkout
                        </div>
                    </div>

                    <main className={`flex items-start lg:gap-16 xl:gap-24 `}>
                        <section className="w-96 lg:w-3/5 mb-24">
                            {type == 'GUIDED' && (
                                <>
                                    <ExpSubsection
                                        padding="pb-8"
                                        margins="mb-8">
                                        <div className="text-green-400 text-2xl font-bold mb-4">
                                            Your booking
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-bold">
                                                    Date
                                                </div>
                                                <div>
                                                    {moment(
                                                        booking_date
                                                    ).format('MMMM Do YYYY')}
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold">
                                                    Guests
                                                </div>
                                                <div>Dropdown here</div>
                                            </div>
                                        </div>
                                    </ExpSubsection>

                                    <ExpSubsection
                                        padding="pb-8"
                                        margins="mb-8">
                                        <div className="text-green-400 text-2xl font-bold mb-4">
                                            Guest info
                                        </div>
                                        <div>
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Cumque
                                            culpa ipsam ducimus ullam
                                            consequatur exercitationem, atque
                                            ratione officia autem temporibus.
                                        </div>
                                    </ExpSubsection>
                                </>
                            )}
                            <ExpSubsection padding="pb-8" margins="mb-8">
                                <div className="text-green-400 text-2xl font-bold mb-4">
                                    Summary
                                </div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Cumque culpa ipsam ducimus
                                    ullam consequatur exercitationem, atque
                                    ratione officia autem temporibus. Lorem
                                    ipsum, dolor sit amet consectetur
                                    adipisicing elit. Cumque culpa ipsam ducimus
                                    ullam consequatur exercitationem, atque
                                    ratione officia autem temporibus. Lorem
                                    ipsum, dolor sit amet consectetur
                                    adipisicing elit. Cumque culpa ipsam ducimus
                                    ullam consequatur exercitationem, atque
                                    ratione officia autem temporibus. Lorem
                                    ipsum, dolor sit amet consectetur
                                </div>
                            </ExpSubsection>
                            <ExpSubsection padding="pb-8" margins="mb-8">
                                <div className="text-green-400 text-2xl font-bold mb-4">
                                    Payment info
                                </div>
                                <div>
                                    <div>
                                        <Formik
                                            initialValues={{
                                                ccName: '',
                                                ccNb: '',
                                                ccExpiry: '',
                                                ccCode: '',
                                                ccCountry: 'FR'
                                            }}
                                            validationSchema={Yup.object({
                                                ccName: Yup.string()
                                                    .min(2, 'Min 2 characters')
                                                    .max(
                                                        50,
                                                        'Max 50 characters'
                                                    )

                                                    .matches(
                                                        regexString,
                                                        'Numbers and special characters are not allowed.'
                                                    )
                                                    .required(
                                                        'Name is a required field'
                                                    ),

                                                ccNb: Yup.string()
                                                    .min(
                                                        15,
                                                        'Card number should have 15 digits for Amex, 16 for MC/Visa and 19 for Meeza'
                                                    )
                                                    .max(
                                                        19,
                                                        'Card number should have 15 digits for Amex, 16 for MC/Visa and 19 for Meeza'
                                                    )
                                                    .required(
                                                        'Card number is a required field'
                                                    ),
                                                ccExpiry: Yup.string()
                                                    .length(4, 'Invalid Date')
                                                    .required(
                                                        'Expiry is a required field'
                                                    ),
                                                ccCode: Yup.string()

                                                    .matches(
                                                        /^[0-9]+$/,
                                                        'only digits'
                                                    )
                                                    .min(
                                                        3,
                                                        'CVC Must be at least 3 digits'
                                                    )
                                                    .max(4, 'Max 4 digits')
                                                    .required(
                                                        'CVC is a required field'
                                                    )
                                            })}
                                            onSubmit={handleSubmit}>
                                            {(props) => (
                                                <Form id="paymentForm">
                                                    <div className="flex flex-col md:flex-row lg:flex-col mt-6 gap-12 lg:gap-0">
                                                        <div className="md:w-1/2 lg:w-full flex-1 flex flex-col">
                                                            <div className="flex items-center justify-end gap-6 mb-2 mr-4">
                                                                <span className="text-xs">
                                                                    We accept
                                                                </span>
                                                                <div className="flex items-center gap-4 ">
                                                                    <CardAmex />
                                                                    <CardVisa />
                                                                    <CardMastercard />
                                                                </div>
                                                            </div>
                                                            <div className="w-full flex flex-col rounded-xl border-gray-3001 gap-1 relative mb-8 ">
                                                                <FormIkPayment
                                                                    name="ccName"
                                                                    label="Cardholder's name"
                                                                    placeholder="Samy Tai"
                                                                    radius="rounded-xl"
                                                                    radiusActive="rounded-xl"
                                                                    autoComplete="off"
                                                                    icon="ri-user-3-line"
                                                                />
                                                            </div>
                                                            <div
                                                                className={`w-full flex flex-col rounded-xl border-gray-3001 mb-8 gap-1 relative`}>
                                                                <FormIkPayment
                                                                    name="ccNb"
                                                                    label="Card number"
                                                                    placeholder="0000 0000 0000 0000"
                                                                    radius="rounded-t-xl"
                                                                    radiusActive="rounded-xl"
                                                                    autoComplete="off"
                                                                    options={{
                                                                        creditCard: true
                                                                    }}
                                                                    icon="ri-bank-card-line"
                                                                    filterMode={
                                                                        true
                                                                    }
                                                                    cardMode
                                                                />
                                                                <div
                                                                    className={`w-full flex gap-1`}>
                                                                    <FormIkPayment
                                                                        name="ccExpiry"
                                                                        type="text"
                                                                        label="Expiry"
                                                                        placeholder="MM/YY"
                                                                        radius="rounded-bl-xl"
                                                                        radiusActive="rounded-xl"
                                                                        autoComplete="off"
                                                                        options={{
                                                                            date: true,
                                                                            datePattern:
                                                                                [
                                                                                    'm',
                                                                                    'y'
                                                                                ]
                                                                        }}
                                                                        icon="ri-calendar-check-line"
                                                                        filterMode
                                                                    />
                                                                    <FormIkPayment
                                                                        name="ccCode"
                                                                        type="text"
                                                                        label="CVC"
                                                                        placeholder="345"
                                                                        radius="rounded-br-xl"
                                                                        radiusActive="rounded-xl"
                                                                        autoComplete="off"
                                                                        options={{
                                                                            blocks: [
                                                                                4
                                                                            ],

                                                                            numericOnly: true
                                                                        }}
                                                                        icon="ri-more-fill"
                                                                        filterMode
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* <CountryList
                                                                handleChange={
                                                                    handleCountryChange
                                                                }
                                                                selectedValue={
                                                                    selectedCountry
                                                                }
                                                                height="3.43rem"
                                                                width="w-full"
                                                                bgColor="white"
                                                                panelHeight="150px"
                                                                label="Country"
                                                                labelTextSize="0.875rem"
                                                                menuTextSize="0.75rem"
                                                                isLoading={
                                                                    false
                                                                }
                                                            /> */}

                                                            {/* <Checkbox
                                                                name="terms"
                                                                isChecked={
                                                                    termsChecked
                                                                }
                                                                setIsChecked={
                                                                    setTermsChecked
                                                                }
                                                            /> */}
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </ExpSubsection>
                        </section>

                        <aside className="lg:w-2/5 sticky top-24 py-4 pb-24">
                            <div
                                className={`flex flex-col px-4 xl:px-8 pt-4 pb-4  xl:pb-8 xl:pt-8 bg-kn-white rounded-2xl shadow-cards`}>
                                <div className="flex flex-col md:flex-row gap-4 border-b border-green-600 border-opacity-20 pb-6">
                                    <div className="md:w-32 overflow-hidden rounded-lg">
                                        <img
                                            alt=""
                                            className="object-cover object-center w-full h-full"
                                            data-blink-src={
                                                short_content.featured_image
                                            }
                                        />
                                    </div>
                                    <div>
                                        <div className="border-b border-green-600 border-opacity-20 pb-2">
                                            <div className="text-sm">
                                                {short_content.title}
                                            </div>
                                            <div className="mt-2 flex flex-wrap items-center font-sans text-xs text-gray-900">
                                                <div className="flex  mr-8 py-1">
                                                    <span className="text-green-400 mr-2">
                                                        <MapPin size={18} />
                                                    </span>

                                                    <span className="flex flex-wrap items-center">
                                                        {places_lists?.length >
                                                        0 ? (
                                                            places_lists.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                    itemArray
                                                                ) => {
                                                                    return (
                                                                        <span
                                                                            key={`${item}_${index}`}>
                                                                            <span className="whitespace-nowrap">
                                                                                {country(
                                                                                    'en',
                                                                                    item.code
                                                                                )}
                                                                            </span>
                                                                            {index <
                                                                                itemArray.length -
                                                                                    1 && (
                                                                                <span className="px-1">
                                                                                    .
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    );
                                                                }
                                                            )
                                                        ) : (
                                                            <span className="w-20 bg-gray-300 rounded-full h-2" />
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center mr-8 py-1">
                                                    <span className="text-green-400 mr-2">
                                                        <Clock size={18} />
                                                    </span>
                                                    {pluralize(days, 'Day')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs mt-4 flex flex-wrap gap-x-1">
                                            <span>
                                                {`A ${capitalize(
                                                    type
                                                )} Experience by`}
                                            </span>
                                            <span className="underline font-semibold text-green-700">
                                                {`${kreatorName(profile)}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-green-600 border-opacity-20  py-6 pb-4">
                                    <div className="flex flex-col rounded-xl bg-kn-gray-100 px-4 lg:px-8 py-4">
                                        <div className=" mb-4 font-semibold">
                                            Price details
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex text-xs items-center justify-between border-b-2 pb-2 border-gray-300 border-dotted">
                                                <span className="relative">
                                                    {lineItemJSX.lineItem}
                                                </span>
                                                <span className="relative">
                                                    {lineItemJSX.amount}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-2 border-b-2 pb-2 border-gray-300 border-dotted">
                                                <div className="flex text-xs items-center justify-between ">
                                                    <span className="relative">
                                                        {subtotalJSX.lineItem}
                                                    </span>
                                                    <span className="relative">
                                                        {subtotalJSX.amount}
                                                    </span>
                                                </div>
                                                {false && (
                                                    <div className="flex text-xs items-center justify-between">
                                                        <span className="flex items-center gap-2">
                                                            <span className="relative">
                                                                {
                                                                    discountTotalJSX.lineItem
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="relative">
                                                            {
                                                                discountTotalJSX.amount
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {discountArr.length > 0 &&
                                                    discountArr.map(
                                                        (single, index) => {
                                                            return (
                                                                <div
                                                                    key={`discount_${index}`}
                                                                    className="flex text-xs items-center justify-between">
                                                                    <span className="flex items-center gap-2">
                                                                        <span>
                                                                            Coupon
                                                                        </span>
                                                                        <span className="bg-green-200 rounded-xl px-2 py-0.5 text-xxs">
                                                                            {
                                                                                single.code
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                    <span className="relative">
                                                                        {`${formatPrice(
                                                                            (single.discount *
                                                                                rate) /
                                                                                100,
                                                                            preferredCurrency,
                                                                            getBrowserLocale(),
                                                                            currencyOptions,
                                                                            'currency'
                                                                        )}`}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                {tax > 0 && (
                                                    <div className="flex text-xs items-center justify-between">
                                                        <span className="relative">
                                                            {taxJSX.lineItem}
                                                        </span>
                                                        <span className="relative">
                                                            {taxJSX.amount}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex text-sm font-semibold items-center justify-between pt-2 ">
                                                <span className="flex">
                                                    <span className="relative">
                                                        {totalJSX.lineItem}
                                                    </span>
                                                    {preferredCurrency !=
                                                        'USD' && (
                                                        <span className="text-xs">
                                                            *
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="flex">
                                                    <span className="relative">
                                                        {totalJSX.amount}
                                                    </span>
                                                    {preferredCurrency !=
                                                        'USD' && (
                                                        <span className="text-xs">
                                                            **
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {preferredCurrency !== 'USD' && (
                                        <div className="px-2 mt-4">
                                            <div className="flex items-center gap-1 text-xs">
                                                <div className="">
                                                    * 1 USD ~{' '}
                                                </div>
                                                <span>
                                                    {formatPrice(
                                                        rate,
                                                        'USD',
                                                        getBrowserLocale(),
                                                        currencyOptions
                                                    )}
                                                </span>
                                                <div className="">
                                                    {preferredCurrency}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs">
                                                <div className="">
                                                    ** You will be charged
                                                </div>
                                                <div className="">$US</div>
                                                <span>
                                                    {formatPrice(
                                                        total / 100,
                                                        'USD',
                                                        getBrowserLocale(),
                                                        currencyOptions
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="px-2 mt-4 text-xs">
                                        Charges will appear as Amazon Payment
                                        Services
                                    </div>
                                </div>
                                <div className="border-b border-green-600 border-opacity-20  py-4">
                                    <div className="px-2 text-xs">
                                        To learn about our cancellation and
                                        refund policy{' '}
                                        <a
                                            className="underline font-semibold text-green-700"
                                            target="_blank"
                                            href={`${process.env.NEXT_PUBLIC_URL}/help/article/4002`}>
                                            click here
                                        </a>
                                    </div>
                                </div>

                                <div className="h-full flex items-center flex-col justify-between">
                                    <ButtonLoad
                                        // handleClick={handleClick}
                                        isLoading={processing}
                                        label="Confirm and Pay"
                                        width="w-full"
                                        // handleClick={handleSubmit}
                                        form="paymentForm"
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </aside>
                    </main>
                </div>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    payment: state.payment,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitPayment,
            clearPaymentErrors
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

export async function getServerSideProps({ query }) {
    const {
        data: { data: checkoutData }
    } = await getCheckoutData(query);

    console.log('data is', query);
    const checkoutTotals = calculateCheckout(checkoutData.skus[0], query);

    // const checkoutTotals = {};
    return {
        props: {
            checkoutData,
            checkoutTotals
        }
    };
}
