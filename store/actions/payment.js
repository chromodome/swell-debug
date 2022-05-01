import axios from 'axios';
import { toast } from 'react-toastify';

import {
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    PAYMENT_PROCESSING,
    PAYMENT_CLEAR_ERRORS
} from './types';

import ToastMessage from '@/components/blocks/ToastMessage';

// clear errors
export const clearPaymentErrors = () => async (dispatch) => {
    dispatch({
        type: PAYMENT_CLEAR_ERRORS
    });
};
export const submitPayment =
    ({
        ccName: card_holder_name,
        ccNb: card_number,
        ccExpiry: expiry_date,
        ccCode: card_security_code,
        ccCountry,
        checkoutOrder: merchant_reference
    }) =>
    async (dispatch) => {
        dispatch({
            type: PAYMENT_PROCESSING
        });

        

    };
// submit payment to amazon
// export const submitPayment =
//     ({
//         ccName: card_holder_name,
//         ccNb: card_number,
//         ccExpiry: expiry_date,
//         ccCode: card_security_code,
//         ccCountry,
//         checkoutOrder: merchant_reference
//     }) =>
//     async (dispatch) => {
//         dispatch({
//             type: PAYMENT_PROCESSING
//         });

//         // api call config
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };

//         // construct the body here
//         const body = JSON.stringify({
//             service_command: 'TOKENIZATION',
//             access_code: process.env.APS_ACCESS_CODE,
//             merchant_identifier: process.env.APS_MERCHANT_IDENTIFIER,
//             language: 'en',
//             signature: '7cad05f0212ed933c9a5d5dffa31661acf2c827a',
//             merchant_reference: 'XYZ9239-yu898',
//             card_holder_name,
//             card_number,
//             expiry_date,
//             card_security_code,
//             return_url: process.env.APS_RETURN_URL
//         });

//         try {
//             const res = await axios.post(
//                 `${process.env.APS_API_ENDPOINT}`,
//                 body,
//                 config
//             );

//             toast.success(
//                 <ToastMessage icon="😊" msg="Success!" alignTop={false} />,
//                 {
//                     hideProgressBar: true,
//                     autoClose: 2500
//                 }
//             );
//             dispatch({
//                 type: PAYMENT_SUCCESS,
//                 payload: res.data
//             });
//             console.log('axios success response', res.data);
//             // dispatch if needed function to exec after success
//             // dispatch(paymentSuccess());
//         } catch (err) {
//             console.log('axios error response', err);
//             <ToastMessage
//                 icon="😕"
//                 msg="Hmm...Payment failed. This is a generic message"
//                 alignTop={true}
//                 color="text-white"
//             />;

//             dispatch({
//                 type: PAYMENT_FAIL,
//                 payload: ['Payment failed - generic']
//             });

//             console.log(err);
//         }
//     };

export const paymentSuccess = () => async (dispatch) => {
    // some stuff
};
