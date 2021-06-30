import { useState } from 'react';
import { useRouter } from 'next/router';
import translations from '@/constants/translations';
import { handleRowReverse } from '@/helpers/FEutils';

export default function Search({ lang = 'en', rtl }) {
    const [term, setTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/experiences/search?term=${term}`);
        setTerm('');
    };

    return (
        <div className='hidden md:block md:flex-1 mx-8'>
            <form onSubmit={handleSubmit}>
                <input
                    className={`focus:outline-none rounded-full w-full border-2 border-green-400 px-8 py-2 ${
                        handleRowReverse(rtl).rtl
                    }`}
                    type='text'
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder='Search Experiences'
                />
            </form>
        </div>
    );
}
