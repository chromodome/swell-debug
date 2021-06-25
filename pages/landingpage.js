import Head from 'next/head';
import Image from 'next/image';

import NavBar from '@/sections/NavBar';
import ContainerFullWidth from '@/sections/ContainerFullWidth';
import SliderList from '@/sections/SliderList';
import SliderInterests from '@/sections/SliderInterests';
import FeaturedContent from '@/sections/FeaturedContent';
import SliderDestinations from '@/sections/SliderDestinations';
import SliderCollections from '@/sections/SliderCollections';
import GridList from '@/sections/GridList';
import Footer from '@/sections/Footer';
import styles from '../styles/Home.module.css';

export default function LandingPage() {
    return (
        <div className=''>
            <NavBar />
            <ContainerFullWidth pill />
            <SliderList />
            <SliderInterests />
            <FeaturedContent />
            <SliderDestinations />
            <SliderCollections />
            <GridList />
            <Footer />
        </div>
    );
}
