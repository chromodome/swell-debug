import axios from 'axios';
import { toast } from 'react-toastify';
import { ErrorSuccessLang } from 'helpers/errors';

import { GENERAL_LOADING, SUBMIT_SUCCESS, SUBMIT_FAIL } from './types';

import ToastMessage from '@/components/blocks/ToastMessage';

// Register User
export const captureEmail =
    ({ email, country, countryCode, ip: ip }) =>
    // console.log(email, country, countryCode, ip);
    async (dispatch) => {
        dispatch({
            type: GENERAL_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const bodyData = {
            fields: [
                { name: 'email', value: email },
                { name: 'country', value: country },
                { name: 'country_code', value: countryCode }
            ],
            context: {
                pageUri: 'https://www.viakonnect.com',
                pageName: 'Landing page Nov 2021',
                pageId: '1DXu3hF1hRp-zJuJGMLXq1Ac4eh8'
                // ipAddress: ip
            }
        };

        const body = JSON.stringify(bodyData);

        try {
            const res = await axios.post(
                `https://api.hsforms.com/submissions/v3/integration/submit/20360780/0d7bb784-5d61-469f-b326-e24630b5ead4`,
                body,
                config
            );

            // toast.success(<ErrorSuccessLang errorId='REGISTER_SUCCESS' />, {
            //     hideProgressBar: true,
            //     autoClose: 1500,
            // });

            toast.success(
                <ToastMessage
                    icon="😊"
                    msg="Thank you! We'll be in touch"
                    alignTop={false}
                />,
                {
                    hideProgressBar: true,
                    autoClose: 3500
                }
            );

            dispatch({
                type: SUBMIT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            if (err.response) {
                const errorObj = err.response.data;
                if (errorObj.statusCode == '403') {
                    toast.error(<ErrorSuccessLang errorId="FORBIDDEN" />, {
                        hideProgressBar: true,
                        autoClose: 2500
                    });
                }
                if (errorObj.statusCode == '400') {
                    toast.error(<ErrorSuccessLang errorId="REJECTED" />, {
                        hideProgressBar: true,
                        autoClose: 2500
                    });
                }
                if (errorObj.statusCode == '404') {
                    toast.error(<ErrorSuccessLang errorId="NOTFOUND" />, {
                        hideProgressBar: true,
                        autoClose: 2500
                    });
                }
                const errors = errorObj.data && errorObj.data[0]?.messages;
                if (errors) {
                    errors.forEach((error) =>
                        toast.error(<ErrorSuccessLang errorId={error.id} />, {
                            hideProgressBar: true,
                            autoClose: 2500
                        })
                    );
                }
                // console.log('err', err.response.data.msg);
                dispatch({
                    type: SUBMIT_FAIL,
                    payload: errors
                        ? errors.map((error) => error.message)
                        : [errorObj.message]
                });
            } else if (err.request) {
                // console.log('error no resp from server', err.request);
                toast.error(<ErrorSuccessLang errorId="NETWORKERROR" />);
                dispatch({
                    type: SUBMIT_FAIL,
                    payload: ['networkError']
                });
            } else {
                // console.log('Error', err.message);
                toast.error(<ErrorSuccessLang errorId="DEFAULTERROR" />);
                dispatch({
                    type: SUBMIT_FAIL,
                    payload: ['somethingWrong']
                });
            }
            return err;
        }
    };
