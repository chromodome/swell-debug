import React, { useState, useEffect, useReducer, useRef } from 'react';
import PanelMarketing from './PanelMarketing';
import useXchangeRate from '@/helpers/useXchangeRate2';
import { formatPrice } from '@/helpers/LocaleHelper';
import { connect } from 'react-redux';

const MarketingBudget = ({
    experienceDetails: { budget_min, budget_max, budget_currency = 'USD' },
    auth: { user },
    globalState: { lang, siteData }
}) => {
    const preferredCurrency = user?.profile?.currency || 'USD';

    const [budgetCurrency, setBudgetCurrency] = useState(budget_currency);

    const { rate, currency: enteredCurrency } = useXchangeRate(
        [1],
        'USD',
        budgetCurrency
    );

    const { rate: preferredRate, currency: userCurrency } = useXchangeRate(
        [1],
        'USD',
        preferredCurrency
    );

    const formattedPricesEntered = {
        min: formatPrice(
            Number(budget_min * rate),
            budgetCurrency,
            window?.navigator?.language
        ),
        max: formatPrice(
            Number(budget_max * rate),
            budgetCurrency,
            window?.navigator?.language
        )
    };
    const formattedPricesUser = {
        min: formatPrice(
            budget_min * preferredRate,
            preferredCurrency,
            window?.navigator?.language
        ),
        max: formatPrice(
            budget_max * preferredRate,
            preferredCurrency,
            window?.navigator?.language
        )
    };

    return (
        <PanelMarketing title="Recommended Budget" padding="pt-4">
            <div className="flex flex-col w-max mx-auto mt-4 md:mt-0 md:mb-4">
                <div className="flex flex-col lg:flex-row justify-center items-center text-green-700 gap-2">
                    <div
                        className={`flex items-center gap-2 justify-center text-normal md:text-2xl font-semibold`}>
                        <span>{formattedPricesEntered.min}</span>
                        <span>
                            <i className="text-green-500 las la-long-arrow-alt-right text-2xl"></i>
                        </span>
                        <span>{formattedPricesEntered.max}</span>
                        <div className=" uppercase">
                            {enteredCurrency.symbol}
                        </div>
                    </div>
                    <div
                        className={`flex items-center justify-center text-xs uppercase font-normal `}>
                        {`(${enteredCurrency.name})`}
                    </div>
                </div>
                {preferredCurrency !== budgetCurrency && (
                    <div>
                        <div className="flex items-center justify-items py-4 opacity-75">
                            <span className="flex-1 border-b border-green-300 mr-3" />
                            <span className="flex-shrink-0 text-green-900 text-sm">
                                or
                            </span>
                            <span className="flex-1 border-b border-green-300 ml-3" />
                        </div>
                        <div className="flex flex-col lg:flex-row justify-center items-center text-green-700 gap-2">
                            <div
                                className={`flex items-center gap-2 justify-center text-sm font-semibold`}>
                                <span>{formattedPricesUser.min}</span>
                                <span>
                                    <i className="text-green-500 las la-long-arrow-alt-right text-2xl"></i>
                                </span>
                                <span>{formattedPricesUser.max}</span>
                                <div className=" uppercase">
                                    {userCurrency.symbol}
                                </div>
                            </div>
                            <div
                                className={`flex items-center justify-center text-xs uppercase font-normal `}>
                                {`(${userCurrency.name})`}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PanelMarketing>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

export default connect(mapStateToProps)(MarketingBudget);
