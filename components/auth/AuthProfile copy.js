import React, { useState, useEffect } from 'react';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import translations from 'constants/translations';
import uiStruct from 'constants/uiStruct';

import { handleRowReverse } from 'helpers/FEutils';
import { ReactComponent as KLogoIcon } from '@/components/svg/kn_logoicon.svg';
import { ReactComponent as KLogoText } from '@/components/svg/kn_logotext.svg';
import ButtonLoad from '@/components/blocks/ButtonLoad';
import { animateIn } from 'helpers/FEutils';
import { buildCountryData } from 'helpers/LocaleHelper';

import { createProfile, logout, clearLoginErrors } from 'store/actions/auth';
import FormIkInput from '@/components/forms/FormIkInput';
import { regexString } from '@/components/utility/regexPatterns';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as ui from '@/components/translations/componentNames.json';
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// import LoadingPageNp from '@/components/utility/LoadingPageNp';
import MadeWithLove from '@/components/blocks/MadeWithLove';
import ListBoxGeneric from '@/components/blocks/ListBoxGeneric';

// const targetElement = document.querySelector('#root');

const AuthProfile = ({ auth, globalState: { lang }, ...props }) => {
    const handleLogout = () => {
        props.logout();
    };

    const handleSubmit = (values, actions) => {
        const profile = {
            ...values,
            country: selectedCountry.id,
            user: auth.user._id,
        };
        props.createProfile(profile);
        actions.setSubmitting(false);
        // trackPromise(this.postAxiosData(values, actions, this.props.type));
    };

    useEffect(() => {
        // props.clearLoginErrors();
        // animateIn('.kn-slide');
        // disableBodyScroll(targetElement, { reserveScrollBarGap: true });

        // return () => {
        //     clearAllBodyScrollLocks();
        // };
    }, []);

    const rtl = !!translations[lang].rtl;

    const countryList = buildCountryData(lang);
    // console.log(countryList);

    const [selectedCountry, setSelectedCountry] = useState({
        id: 'US',
        name: 'USA',
    });

    // if (auth.isAuthenticated == null) {
    //     return <LoadingPageNp />;
    // }

    return auth.isAuthenticated ? (
        auth.isProfile ? (
            // <Redirect to='/c' />
            <div>helo </div>
        ) : (
            <div className='relative kn-slide h-screen bg-white'>
                <div className=' relative px-12 py-12 lg:fixed w-full lg:w-7/12 lg:min-h-screen inset-0 lg:px-16 xl:px-32 2xl:px-48 lg:py-32'>
                    <img
                        data-blink-src='https://ucarecdn.com/a0a2306c-88da-49cd-b08b-f1ef913d1864/kalenemsleykGSapVfg8Kwunsplash.jpg'
                        className='object-cover w-full h-80 lg:h-full rounded-3xl overflow-hidden shadow-3xl '
                    />
                </div>
                 <div className='w-full lg:w-5/12 ml-auto rounded-3xl lg:rounded-none bg-white shadow-2xl-green-600-rev lg:shadow-2xl-green-600'>
                    <div
                        className={`flex flex-col px-12 lg:px-16 xl:px-24 2xl:px-32 py-16 lg:h-screen  overflow-y-scroll`}
                    >
                        <div
                            className={`flex items-center gap-3 ${
                                handleRowReverse(rtl).flex
                            }`}
                        >
                            <KLogoIcon />
                            <KLogoText />
                            <span className='text-xs mt-1'>(for Kreators)</span>
                        </div>
                        <div className='flex'>
                            <div className='flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-tl from-gray-900 via-blue-500 to-green-400 text-2xl font-bold tracking-tighter mt-10 '>
                                Finish your profile
                            </div>
                        </div>
                        <div>
                            <Formik
                                initialValues={{
                                    first: '',
                                    last: '',
                                }}
                                validationSchema={Yup.object({
                                    first: Yup.string()
                                        .min(2, ui.validation.short[lang])
                                        .max(50, ui.validation.long[lang])

                                        .matches(
                                            regexString,
                                            ui.validation.lettersAllowed[lang]
                                        )
                                        .required(ui.validation.required[lang]),
                                    last: Yup.string()
                                        .min(2, ui.validation.short[lang])
                                        .max(50, ui.validation.long[lang])

                                        .matches(
                                            regexString,
                                            ui.validation.lettersAllowed[lang]
                                        )
                                        .required(ui.validation.required[lang]),
                                })}
                                onSubmit={handleSubmit}
                            >
                                {(props) => (
                                    <Form id='profileForm'>
                                        <div className='flex flex-row lg:flex-col mt-6 gap-12 lg:gap-0'>
                                            <div className='w-1/2 lg:w-full flex-1 flex flex-col'>
                                                <div className='flex flex-col md:flex-row w-full gap-4 mb-4'>
                                                    <FormIkInput
                                                        name='first'
                                                        type='text'
                                                        placeholder={
                                                            ui.forms.firstname[
                                                                lang
                                                            ]
                                                        }
                                                    />

                                                    <FormIkInput
                                                        name='last'
                                                        type='text'
                                                        placeholder={
                                                            ui.forms.lastname[
                                                                lang
                                                            ]
                                                        }
                                                    />
                                                </div>

                                                <ListBoxGeneric
                                                    listData={countryList}
                                                    val={selectedCountry}
                                                    handleChange={
                                                        setSelectedCountry
                                                    }
                                                    textClass={'text-sm'}
                                                />

                                                <ButtonLoad
                                                    // handleClick={handleClick}
                                                    isLoading={auth.loading}
                                                    label="Let's go!"
                                                    width='w-full'
                                                    // handleClick={handleSubmit}
                                                    form='profileForm'
                                                    type='submit'
                                                />
                                            </div>
                                            <div className='flex-1 flex flex-col -mt-12 lg:mt-0'>
                                                <div className='flex justify-center items-center mt-8 text-sm gap-2'>
                                                    <span>
                                                        Not your account?
                                                    </span>
                                                    <button
                                                        className='focus:outline-none text-base text-green-400 font-medium'
                                                        onClick={handleLogout}
                                                    >
                                                        Log out
                                                    </button>
                                                </div>

                                                <MadeWithLove />
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    ) : (
        // <Redirect to='/accounts/login' />
        <div>Goodbye</div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            createProfile,
            logout,
            clearLoginErrors,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProfile);
