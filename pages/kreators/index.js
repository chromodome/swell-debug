import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import GridList from '@/sections/GridList';
import translations from '@/constants/translations';
import LoadMore from '@/blocks/LoadMore';
import { NEXT_PUBLIC_ITEMS_PER_PAGE } from '@/constants/public';
import { pageCount } from '@/helpers/FEutils';
import SectionTitle from '@/components/blocks/Title/SectionTitle';
import Row from '@/components/sections/Row';
import SkeletonText from '@/components/blocks/Card/SkeletonText';
import ButtonLoad from '@/components/blocks/ButtonLoad';

const LandingPage = ({
    globalState: {
        lang,
    }
}) => {
    const { isReady } = useRouter();
    const [dataLoading, setDataLoading] = useState(true);
    const [loadMoreData, setLoadMoreData] = useState(false);
    const [kreatorList, setKreatorList] = useState([]);
    const currentPage = useRef(1);
    const totalPages = useRef(1);
    const totalCount = useRef(0);
    const [pageIsReady, setPageIsReady] = useState(false);

    const getKeators = async (page = 1) => {
        const response = await fetch(
            `/api/kreators?limit=${NEXT_PUBLIC_ITEMS_PER_PAGE}&page=${page}`
        );
        const data = await response.json();

        return data;
    };

    const loadKreators = (page = 1) => {
        getKeators(page).then((data) => {
            const { count, page, pages, results } = data;

            currentPage.current = page;
            totalPages.current = pageCount(count, NEXT_PUBLIC_ITEMS_PER_PAGE);
            totalCount.current = count;

            setKreatorList([...kreatorList, ...results]);
            setDataLoading(false);
            setLoadMoreData(false);
        });
    };

    const handleLoadClick = () => {
        setLoadMoreData(true);
        loadKreators(currentPage.current + 1);
    };

    useEffect(() => {
        if (isReady) {
            loadKreators();
            setPageIsReady(true);
        }
    }, []);

    return (
        <Layout>
            {pageIsReady && (
                <>
                    <div className={`mx-auto px-5 md:px-9 lg:px-12 xl:px-24 2xl:px-40 mt-12 mb-8`}>
                        <SectionTitle
                            section={{title: "Kreators"}}
                        />
                    </div>
                    <div>
                        {
                            kreatorList.map((kreator) => {
                                const { username } = kreator;
                                return <div key={username}>
                                    {username}
                                        </div>
                            })
                        }
                    </div>

                    <div>
                        {
                            kreatorList.length < totalCount.current && !dataLoading
                            ? <ButtonLoad
                                    handleClick={handleLoadClick}
                                    isLoading={loadMoreData}
                                    label="Load More"
                                />
                            : null
                        }
                            
                    </div>
                </>
            )}
            {/* <LoadMore loadMoreData={loadMoreData} /> */}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
