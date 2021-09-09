import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import '@/styles/carouselcards.css';
import { StoreProvider } from 'store';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import '@/styles/datepicker.custom.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </AuthProvider>
    );
}

export default MyApp;
