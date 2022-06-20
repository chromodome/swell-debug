import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { register } from '@/store/actions/auth';
import { captureEmail } from '@/store/actions/dataCapture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ButtonLoad from '@/components/blocks/ButtonLoad';

import Checkbox from '@/components/blocks/Checkbox';

import FormIkInput from '@/components/forms/FormIkInput';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import GradientTitle from '../blocks/Title/GradientTitle';

const LandingCapture = ({ captureEmail, auth, session: { ip }, ...props }) => {
    const router = useRouter();

    const handleSubmit = (values, actions) => {
        captureEmail({ ...values, ...visitorData });
        actions.setSubmitting(false);
        actions.resetForm();
        setTermsChecked(false);
    };

    const [termsChecked, setTermsChecked] = useState(false);
    const [visitorData, setVisitorData] = useState(null);
    useEffect(() => {
        if (ip?.status === 'success') {
            setVisitorData({
                ip: ip.query,
                country: ip.country,
                countryCode: ip.countryCode
            });
        } else
            setVisitorData({
                ip: null,
                country: null,
                country_code: null
            });
    }, []);

    return (
        <div className="w-full h-full d-hdpi-2:text-vw-base">
            <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-center gap-8 md:gap-0 mx-auto lg:max-w-7xl w-full d-hdpi-2:max-w-screen-2/3">
                <div className="md:w-2/5 lg:w-auto ">
                    <img
                        className="lg:h-96 d-hdpi-2:h-vw-96"
                        src="/assets/media/joinus@2x.png"
                    />
                </div>
                <div className="md:w-3/5 xl:w-1/2 d-hdpi-2:w-1/2">
                    <div className="">
                        <div
                            className={`flex flex-col  lg:px-8  pt-8 md:pt-0 d-hdpi-2:px-vw-8`}>
                            <GradientTitle
                                label={props.title ?? 'Join us'}
                                textSize="text-4xl d-hdpi-2:text-vw-4xl"
                                containerClass=""
                            />

                            <div className="flex text-gray-600 mt-4 mb-4 leading-7 d-hdpi-2:leading-normal">
                                If you want to know more about the development
                                and launch, subscribe to our list, and join
                                thousands of people who - like you - are excited
                                about new innovations in experiencing travel.
                            </div>

                            <div>
                                <Formik
                                    initialValues={{
                                        email: ''
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email('Invalid Email Syntax')
                                            .required('Cannot be empty')
                                    })}
                                    onSubmit={handleSubmit}>
                                    {(props) => (
                                        <Form id="joinForm">
                                            <div className="flex flex-col md:flex-row lg:flex-col mt-6 gap-12 lg:gap-0 d-hdpi-2:gap-6 d-hdpi-2:mt-vw-6">
                                                <div className="md:w-1/2 lg:w-full flex-1 flex flex-col">
                                                    <FormIkInput
                                                        name="email"
                                                        type="text"
                                                        placeholder={
                                                            'E-mail address'
                                                        }
                                                        autoComplete="off"
                                                        className="mb-4 d-hdpi-2:mb-vw-4"
                                                    />

                                                    <ButtonLoad
                                                        // handleClick={handleClick}
                                                        isLoading={auth.loading}
                                                        label="Join the list"
                                                        width="w-full"
                                                        // handleClick={handleSubmit}
                                                        form="joinForm"
                                                        type="submit"
                                                        // disabled={!termsChecked}
                                                        margins="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth,
    session: state.session
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            register,
            captureEmail
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingCapture);
