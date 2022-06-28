import {  Bounce, ToastContainer } from 'react-toastify';
import SimpleReactLightbox from 'simple-react-lightbox';
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
                <SimpleReactLightbox>
                        <Component {...pageProps} />
                </SimpleReactLightbox>
            </div>
    );
}

export default MyApp;
