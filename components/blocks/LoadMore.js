const LoadMore = ({ loadMoreData }) => {
    return (
        <>
            {
                loadMoreData
                && <div className={`mb-12 mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40`}>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        Loadng more data....
                    </div>
                </div>
            }
        </>
    );
};

export default LoadMore;