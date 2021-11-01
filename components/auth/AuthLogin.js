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
                    <div className={`flex flex-col px-8  pt-8 md:pt-0 `}>
                        <div className={`flex items-center gap-3 flex-row`}>
                            <Image
                                src="/assets/media/kn_logoicon.svg"
                                height={45}
                                width={31}
                            />
                            <Image
                                src="/assets/media/kn_logotext.svg"
                                height={21}
                                width={112}
                            />

                            <span className="text-xs mt-1">
                                (for Travellers)
                            </span>
                        </div>
                        <div className="flex ">
                            <div className="flex-shrink-0 text-transparent bg-clip-text bg-gradient-to-tl from-gray-900 via-blue-500 to-green-400 text-2xl font-bold tracking-tighter mt-10 ">
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
                                            <div className="flex flex-col mt-6 gap-12 lg:gap-0">
                                                <div className="w-full flex-1 flex flex-col">
                                                    <FormIkInput
                                                        name="identifier"
                                                        type="text"
                                                        placeholder={
                                                            'E-mail or username'
                                                        }
                                                        autoComplete="off"
                                                        className="mb-4"
                                                    />

                                                    <FormIkInput
                                                        name="password"
                                                        type="password"
                                                        placeholder={'Password'}
                                                        autoComplete="off"
                                                    />

                                                    <div className="flex justify-center mt-6">
                                                        <Link href="/account/reset">
                                                            <a className="flex-shrink-0 text-sm text-gray-400 hover:text-gray-900 flex justify-center">
                                                                <span className="relative group">
                                                                    Forgot
                                                                    Password?
                                                                    <span className="absolute left-0 right-full -bottom-0.5 border-b-4 transform group-hover:right-0 border-green-400 transition-all out-expo-hard duration-300" />
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
                                                    <div className="flex items-center justify-items py-10">
                                                        <span className="flex-1 border-b border-gray-300 mr-3" />
                                                        <span className="flex-shrink-0 text-gray-400 text-sm">
                                                            or
                                                        </span>
                                                        <span className="flex-1 border-b border-gray-300 ml-3" />
                                                    </div>
                                                    <div className="flex justify-center items-center text-sm gap-2">
                                                        <span>
                                                            Don't have an
                                                            account?
                                                        </span>
                                                        <button
                                                            className="text-base text-green-400 font-medium"
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
