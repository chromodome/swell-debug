import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ResultCard from '@/blocks/Card/ResultCard';
import ResultCardMissing from '@/blocks/Card/ResultCardMissing';
import SectionTitle from '@/blocks/Title/SectionTitle';
import ButtonLoad from '@/blocks/Button/ButtonLoad';
import ResultCardSkeleton from '@/blocks/Card/ResultCardSkeleton';
import Row from './Row';

const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const GridList = ({
    sectionTitles,
    data = [],
    btnLabel = 'Load More',
    btnAction = 'url',
    btnUrl,
    btnPos,
    loadMoreData,
    dataLoading = false,
    showButton = true,
    handleLoadClick,
    purchasedView = false,
    missing = false,
    margins,
    titleClass = 'mb-8',
    titleColor
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleLoad = () => {
        //setIsLoading(!isLoading);
        handleLoadClick();
    };
    const handleClick = (e) => {
        e.preventDefault();
        router.push(btnUrl);
    };

    return (
        <>
            <div
                className={`mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 ${
                    margins ? margins : sectionTitles ? 'mt-24 mb-12' : 'mb-12'
                }`}>
                <div className="flex justify-between">
                    {sectionTitles && (
                        <SectionTitle
                            section={sectionTitles}
                            className={titleClass}
                            titleColor={titleColor}
                        />
                    )}
                    {btnPos && btnAction === 'url' && !purchasedView && (
                        <div className="hidden md:block">
                            <ButtonLoad
                                width="w-40"
                                handleClick={handleClick}
                                isLoading={loadMoreData}
                                label={'Explore more'}
                            />
                        </div>
                    )}
                </div>
                {!dataLoading ? (
                    <>
                        <div className="grid grid-cols-1 px-2 lg-px-0 gap-y-0 md:gap-y-0 md:grid-cols-3 xl:grid-cols-5">
                            {data.map((item) => {
                                return missing && purchasedView ? (
                                    <ResultCardMissing
                                        missing={true}
                                        purchasedView={purchasedView}
                                        myKey={item.id}
                                        data={item}
                                    />
                                ) : (
                                    <ResultCard
                                        missing={true}
                                        purchasedView={purchasedView}
                                        myKey={item.id}
                                        data={item}
                                    />
                                );
                            })}
                        </div>
                        {/* <div className="flex flex-wrap -mx-1a lg:-mx-4a">
                            {data.map((item) => {
                                return missing && purchasedView ? (
                                    <ResultCardMissing
                                        missing={true}
                                        purchasedView={purchasedView}
                                        myKey={item.id}
                                        data={item}
                                    />
                                ) : (
                                    <ResultCard
                                        missing={true}
                                        purchasedView={purchasedView}
                                        myKey={item.id}
                                        data={item}
                                    />
                                );
                            })}
                        </div> */}

                        {btnPos && btnAction === 'url' && !purchasedView && (
                            <div className="block md:hidden">
                                <ButtonLoad
                                    width="w-40"
                                    handleClick={handleClick}
                                    isLoading={loadMoreData}
                                    label={'Explore more'}
                                />
                            </div>
                        )}

                        {!btnPos && btnAction === 'url' && !purchasedView && (
                            <ButtonLoad
                                handleClick={handleClick}
                                isLoading={loadMoreData}
                                label={btnLabel}
                            />
                        )}
                        {!btnPos &&
                            btnAction === 'load' &&
                            showButton &&
                            data.length > 0 &&
                            !purchasedView && (
                                <ButtonLoad
                                    handleClick={handleLoad}
                                    isLoading={loadMoreData}
                                    label={btnLabel}
                                />
                            )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-wrap -mx-1a lg:-mx-4a">
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
