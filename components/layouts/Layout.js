import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Showcase from '@/sections/Showcase';

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>

            <Header />

            {router.pathname === '/' && <Showcase pill />}

            <div className='overflow-x-hidden'>{children}</div>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: 'Konnect',
    description: 'Experience the world',
    keywords: 'travel, experience, trip, build, stay, world, host, tour, guide',
};
