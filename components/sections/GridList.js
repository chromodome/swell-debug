import React, { useState } from 'react';
import ResultCard from '../blocks/Card/ResultCard';
import SectionTitle from '@/blocks/Title/SectionTitle';
import ButtonLoad from '@/blocks/Button/ButtonLoad';

const GridList = ({ sectionTitles, data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = () => {
        setIsLoading(!isLoading);
    };

    return (
        <>
            <div
                className={`mb-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 ${
                    sectionTitles ? 'mt-24 ' : ''
                }`}>
                {sectionTitles && (
                    <SectionTitle section={sectionTitles} className="mb-8" />
                )}
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {data.map((item) => {
                        return <ResultCard key={item.id} data={item} />;
                    })}
                </div>
                {data.length > 0 && (
                    <ButtonLoad
                        handleClick={handleClick}
                        isLoading={isLoading}
                        label="Load More"
                    />
                )}
            </div>
        </>
    );
};

export default GridList;
