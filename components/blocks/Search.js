import { useState } from 'react';
import { useRouter } from 'next/router';
import translations from '@/constants/translations';
import { handleRowReverse } from '@/helpers/FEutils';
import IconsLucide from '@/blocks/IconsLucide';

export default function Search({ lang = 'en', rtl }) {
    const [term, setTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/experiences/search?term=${term}`);
        setTerm('');
    };

    const handleClear = () => {
        setTerm('');
    };

    return (
        <div className="hidden md:block md:flex-1 mx-8 relative ">
            <form onSubmit={handleSubmit}>
                <input
                    className={`text-sm focus:outline-none rounded-full w-full border-2 border-kn-primary-200 h-12 px-8 ${
                        handleRowReverse(rtl).rtl
                    }`}
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Find your experience..."
                />
            </form>
            <div
                onClick={handleClear}
                className={`cursor-pointer focus:outline-none rounded-full bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 absolute top-1/2 -translate-y-1/2 right-0  transform-gpu transition-all duration-300 ease-in-out ${
                    term
                        ? '-translate-x-24 opacity-100'
                        : '-translate-x-2 opacity-0'
                } w-8 h-8 flex items-center justify-center`}>
                <span className="">
                    <IconsLucide icon="X" size={14} />
                </span>
            </div>
            <span
                className={`rounded-full bg-green-400 absolute right-2 top-1/2 -translate-y-1/2 duration-300 ease-in-out transform-gpu transition-all ${
                    term ? 'w-20' : 'w-8'
                } h-8 flex items-center justify-center`}>
                <span className="text-gray-800">
                    <IconsLucide icon="Search" size={18} />
                </span>
            </span>
        </div>
    );
}
