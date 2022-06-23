import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toggleAuthModal, setAuthPage } from '@/store/actions/globalState';
import { login, clearLoginErrors } from '@/store/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonLoad from '@/components/blocks/ButtonLoad';

import FormIkInput from '@/components/forms/FormIkInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MadeWithLove from '@/components/blocks/MadeWithLove';
import LayoutLoading from '@/components/layouts/LayoutLoading';

const AuthLogin = ({
    login,
    clearLoginErrors,
    toggleAuthModal,
    setAuthPage,
    auth,
    ...props
}) => {
    const router = useRouter();
    const handleSubmit = (values, actions) => {
        login({ ...values, identifier: values.identifier.toLowerCase() });
        actions.setSubmitting(false);
    };

    if (auth.isAuthenticated == null) {
        return <LayoutLoading showMessage={false} />;
    }

    return (
        <>
            <div className="">
                <div className="w-full  ml-auto">
                    <div
                        className={`flex flex-col px-8 d-hdpi-2:px-vw-8 pt-8 md:pt-0 `}>
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
                                Sign in
                            </div>
                        </div>
                        {true && (
                            <div className="">
                                <Formik
                                    initialValues={{
                                        identifier: '',
                                        password: ''
                                    }}
                                    validationSchema={Yup.object({
                                        identifier: Yup.string().required('*'),

                                        password: Yup.string().required('*')
                                    })}
                                    onSubmit={handleSubmit}>
                                    {(props) => (
                                        <Form id="loginForm">
                                            <div className="flex flex-col mt-6 gap-12 lg:gap-0 d-hdpi-2:mt-vw-6 ">
                                                <div className="w-full flex-1 flex flex-col">
                                                    <FormIkInput
                                                        name="identifier"
                                                        type="text"
                                                        placeholder={
                                                            'E-mail or username'
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

                                                    <div className="flex justify-center mt-6 d-hdpi-2:mt-vw-6">
                                                        <Link href="/account/reset">
                                                            <a className="flex-shrink-0 text-sm d-hdpi-2:text-vw-sm text-gray-400 hover:text-gray-900 flex justify-center">
                                                                <span className="relative group">
                                                                    Forgot
                                                                    Password?
                                                                    <span className="absolute left-0 right-full -bottom-0.5 d-hdpi-2:-bottom-0.25 border-b-4 d-hdpi-2:border-b-2 transform group-hover:right-0 border-green-400 transition-all out-expo-hard duration-300" />
                                                                </span>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <ButtonLoad
                                                        isLoading={auth.loading}
                                                        label="Sign in"
                                                        width="w-full"
                                                        form="loginForm"
                                                        type="submit"
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
                                                            Don't have an
                                                            account?
                                                        </span>
                                                        <button
                                                            className="text-base text-green-400 font-medium d-hdpi-2:text-vw-base"
                                                            onClick={() =>
                                                                setAuthPage(
                                                                    'register'
                                                                )
                                                            }>
                                                            Sign up
                                                        </button>
                                                    </div>

                                                    <MadeWithLove />
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )}
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
            login,
            clearLoginErrors
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
