import React, { useContext } from 'react';
import ResultCard from '../blocks/ResultCard';
import SectionTitle from '@/blocks/SectionTitle';

const GridList = ({ sectionTitles, data }) => {
    return (
        <>
            <div className=' mb-12 mt-24 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'>
                <SectionTitle section={sectionTitles} className='mb-8' />
                <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                    {data.map((item) => {
                        return <ResultCard key={item.id} data={item} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default GridList;
