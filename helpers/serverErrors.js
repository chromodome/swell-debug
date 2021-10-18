import { toast } from 'react-toastify';
import { ErrorSuccessLang } from 'helpers/errors';

export const serverErrors = (error) => {
    if(error?.response?.data?.statusCode) {
        const { statusCode } = error.response.data;
        let theMessage = '';
        if(error?.response?.data?.message && error?.response?.data?.message.length) {
            if(error.response.data.message[0]?.messages) {
                if(error.response.data.message[0]?.messages.length) {
                    if(error.response.data.message[0]?.messages[0]?.message) {
                        theMessage = error.response.data.message[0]?.messages[0]?.message;
                    }
                }
            }
        }
        toast.error(<div>
                {theMessage.length ? <p>{theMessage}</p> : null}
                <p>{statusCode}</p>
                {
                    !theMessage.length && <ErrorSuccessLang errorId='NETWORKERROR'/>
                }
                
            </div>,
        { 
            autoClose: false,
        });
    } else {
        toast.error(<ErrorSuccessLang />,
        { 
            autoClose: false,
        });
    }
}