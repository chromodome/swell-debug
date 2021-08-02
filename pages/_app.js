import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import '@/styles/carouselcards.css';
import { StoreProvider } from 'store';

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
