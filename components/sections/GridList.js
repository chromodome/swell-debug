import React, { useContext } from 'react';
import ResultCard from '../blocks/ResultCard';
import * as data from '../../experiences.json';

const GridList = ({ data1 }) => {
    return (
        <>
            <div className=' my-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40'>
                <div className='flex flex-wrap -mx-1 lg:-mx-4'>
                    {data.results.map((item) => {
                        return <ResultCard key={item.id} data={item} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default GridList;
