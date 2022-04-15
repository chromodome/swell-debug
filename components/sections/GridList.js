import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ResultCard from '../blocks/Card/ResultCard';
import SectionTitle from '@/blocks/Title/SectionTitle';
import ButtonLoad from '@/blocks/Button/ButtonLoad';
import ResultCardSkeleton from '@/blocks/Card/ResultCardSkeleton';

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const GridList = ({
    sectionTitles,
    data=[],
    btnLabel = 'Load More',
    btnAction = 'url',
    btnUrl,
    dataLoading=false,
    showButton=true,
    handleLoadClick
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleLoad = () => {
        //setIsLoading(!isLoading);
        handleLoadClick();

    };
    const handleClick = (e) => {
        e.preventDefault();
        router.push(btnUrl, null, { shallow: true });
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
                {!dataLoading ? (
                    <>
                        <div className="flex flex-wrap -mx-1 lg:-mx-4">
                            {data.map((item) => {
                                return <ResultCard key={item.id} data={item} />;
                            })}
                        </div>
                        {btnAction === 'url' && (
                            <ButtonLoad
                                handleClick={handleClick}
                                isLoading={isLoading}
                                label={btnLabel}
                            />
                        )}
                        {btnAction === 'load' && showButton && data.length > 0 && (
                            <ButtonLoad
                                handleClick={handleLoad}
                                isLoading={isLoading}
                                label={btnLabel}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-wrap -mx-1 lg:-mx-4">
                            {skeletonArray.map((item, index) => {
                                return (
                                    <ResultCardSkeleton key={`sk_${index}`} />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GridList;
