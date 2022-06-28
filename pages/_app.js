import {  Bounce, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (

            <div>
                <ToastContainer
                    className="mt-36"
                    position="top-right"
                    hideProgressBar={true}
                    autoClose={1750}
                    transition={Bounce}
                    icon={false}
                    theme="colored"
                />
                    <Component {...pageProps} />
            </div>
    );
}

export default MyApp;
