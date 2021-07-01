import React from 'react';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';

export default function ExperienceDetail({ data }) {
    const router = useRouter();

    if (data.length === 0) {
        return <div>Experience {router.query?.id} doesn't exist.</div>;
    }

    const {
        authorId,
        days,
        destination,
        featured_image,
        id,
        price,
        type,
        recommended_for,
        overview_intro
    } = data[0];
    return (
        <div className="my-3 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 lg:my-4 lg:px-2">
            <h1>Title: {overview_intro.title}</h1>
            <img
                alt="Placeholder"
                className="rounded-xl object-cover w-full h-40 xs360:h-44 xs390:h-52 xs410:h-56 sm:h-64 md:h-64 lg:h-64 xl:h-72 2xl:h-96"
                data-blink-src={featured_image}
            />
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const response = await fetch(`${API_URL}/api/experiences/${params.id}`);
    const data = await response.json();

    return {
        props: {
            data
        }
    };
}
