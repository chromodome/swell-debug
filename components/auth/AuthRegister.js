import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toggleAuthModal, setAuthPage } from '@/store/actions/globalState';

import { register, clearLoginErrors } from '@/store/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDataAdmin, deleteDataAdmin } from '@/helpers/apiServices/user';
import { regexPassword, regexUsername } from '@/helpers/regexPatterns';
import ButtonLoad from '@/components/blocks/ButtonLoad';

import Checkbox from '@/components/blocks/Checkbox';
import * as types from 'store/actions/types';
import { defaultProfile } from '@/constants/defaultObjs';

import FormIkInput from '@/components/forms/FormIkInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MadeWithLove from '@/components/blocks/MadeWithLove';
import LayoutLoading from '@/components/layouts/LayoutLoading';

const AuthRegister = ({
    login,
    clearLoginErrors,
    toggleAuthModal,
    setAuthPage,
    auth,
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = (values, actions) => {
        props
            .createDataAdmin(types.CREATE_PROFILE, 'profiles', defaultProfile)
            .then((res) => {
                if (!res.error) {
                    props
                        .register({
                            ...values,
                            username: values.username.toLowerCase(),
                            email: values.email.toLowerCase(),
                            profile: res.value.data._id
                        })
                        .then((regResolution) => {
                            if (regResolution?.response?.data?.error) {
                                props.deleteDataAdmin(
                                    types.DELETE_PROFILE,
                                    'profiles',
                                    res.value.data._id
                                );
                            } else {
                                setAuthPage('profile');
                            }
                        });
                }
            });
        actions.setSubmitting(false);
    };

    const [termsChecked, setTermsChecked] = useState(false);

    if (auth.isAuthenticated == null) {
        return <LayoutLoading showMessage={false} />;
    }

    return (
        <>
            <div className="">
                <div className="w-full  ml-auto">
                    <div
                        className={`flex flex-col px-8  pt-8 md:pt-0 d-hdpi-2:px-vw-8`}>
                        <div
                            className={`flex items-center gap-3 flex-row d-hdpi-2:gap-1.5`}>
                            <img
                                src="/assets/media/kn_logoicon_new_green.svg"
                                className="h-12 d-hdpi-2:h-vw-12"
                            />

                            <img
                                className="h-6 d-hdpi-2:h-vw-6"
                                src="/assets/media/kn_logotext.svg"
                            />

                            <div className="rounded-full bg-green-400 px-1 text-xxs d-hdpi-2:text-vw-xxs d-hdpi-2:px-vw-1.5 d-hdpi-2:h-vw-4 h-4 flex items-center mt-1.5 d-hdpi-2:mt-vw-1.5">
                                beta
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-tl from-gray-900 via-blue-500 to-green-400 text-2xl d-hdpi-2:text-vw-2xl font-bold tracking-tighter mt-10 d-hdpi-2:mt-vw-10 pr-3">
                                Sign up
                            </div>
                        </div>

                        <div>
                            <Formik
                                initialValues={{
                                    username: '',
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object({
                                    username: Yup.string()
                                        .matches(
                                            regexUsername,
                                            'Min 4 chars. a-z 0-9 and underscore allowed. All lowercase, no space. Should start with a letter.'
                                        )
                                        .required('Cannot be empty'),

                                    email: Yup.string()
                                        .email('Invalid Email Syntax')
                                        .required('Cannot be empty'),

                                    password: Yup.string()
                                        .min(
                                            8,
                                            'Min 8 chars. Min 1 Uppercase and 1 Lowercase. Min 1 number. Min 1 special character.'
                                        )
                                        .matches(
                                            regexPassword,
                                            'Min 8 chars. Min 1 Uppercase and 1 Lowercase. Min 1 number. Min 1 special character.'
                                        )
                                        .required('Cannot be empty')
                                })}
                                onSubmit={handleSubmit}>
                                {(props) => (
                                    <Form id="signupForm">
                                        <div className="flex flex-col md:flex-row lg:flex-col mt-6 gap-12 lg:gap-0 d-hdpi-2:mt-vw-6">
                                            <div className="md:w-1/2 lg:w-full flex-1 flex flex-col">
                                                <FormIkInput
                                                    name="username"
                                                    type="text"
                                                    placeholder={'Username'}
                                                    className="mb-4 d-hdpi-2:mb-vw-4"
                                                    autoComplete="off"
                                                />

                                                <FormIkInput
                                                    name="email"
                                                    type="text"
                                                    placeholder={
                                                        'E-mail address'
                                                    }
                                                    autoComplete="off"
                                                    className="mb-4 d-hdpi-2:mb-vw-4"
                                                />

                                                <FormIkInput
                                                    name="password"
                                                    type="password"
                                                    placeholder={'Password'}
                                                    autoComplete="off"
                                                />
                                                <Checkbox
                                                    name="terms"
                                                    isChecked={termsChecked}
                                                    setIsChecked={
                                                        setTermsChecked
                                                    }
                                                />
                                                <ButtonLoad
                                                    // handleClick={handleClick}
                                                    isLoading={auth.loading}
                                                    label="Sign up"
                                                    width="w-full"
                                                    // handleClick={handleSubmit}
                                                    form="signupForm"
                                                    type="submit"
                                                    disabled={!termsChecked}
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col -mt-12 lg:mt-0">
                                                <div className="flex items-center justify-items py-10 d-hdpi-2:py-vw-10">
                                                    <span className="flex-1 border-b border-gray-300 mr-3 d-hdpi-2:mr-vw-3" />
                                                    <span className="flex-shrink-0 text-gray-400 text-sm d-hdpi-2:text-vw-sm">
                                                        or
                                                    </span>
                                                    <span className="flex-1 border-b border-gray-300 ml-3 d-hdpi-2:ml-vw-3" />
                                                </div>
                                                <div className="flex justify-center items-center text-sm gap-2 d-hdpi-2:text-vw-sm d-hdpi-2:gap-1">
                                                    <span>
                                                        Already have an account?
                                                    </span>
                                                    <button
                                                        className="text-base text-green-400 font-medium d-hdpi-2:text-vw-base"
                                                        onClick={() =>
                                                            setAuthPage('login')
                                                        }>
                                                        Sign in
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
        </>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleAuthModal,
            setAuthPage,
            createDataAdmin,
            deleteDataAdmin,
            register,
            clearLoginErrors
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
