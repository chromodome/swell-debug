import { User, Clock, MapPin, Users, Layers } from 'lucide-react';
import { capitalize, getDays, kreatorName } from 'helpers/FEutils';
import { country, findLowestPrice } from 'helpers/LocaleHelper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const SectionMarketingTitles = (props) => {
    const {
        title='',
        days=0,
        tags=[],
        categories=[],
        destinations=[],
        globalState: { siteData }
    } = props;

    const cats_list = categories.map((cat) => {
        const found = siteData.categories.find((elm) => {

            return elm.swell_id === cat
        })

        return found?.name;
    }).filter(elm => elm);;

    const EmptyData = <span className="w-20 bg-gray-300 rounded-full h-2" />;
    const ContentDays = days ? <span> {getDays(days)}</span> : EmptyData;

    return (
        <div
            className={`z-100 mb-6 mt-16 mx-auto px-5 md:px-9 lg:px-12 xl:px-241 2xl:px-401 xl:max-w-7xl`}>
            <div className={`px-4`}>
                <div className="inline-flex text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-green-400 to-green-400 font-bold text-3xl tracking-tight leading-8 pb-1 flex-shrink-0 flex-initial">
                    {title}
                </div>
                <div className="mt-2 flex flex-wrap items-center font-sans text-sm text-gray-900">
                    <div className="flex  mr-8 py-1">
                        <span className="text-green-400 mr-2">
                            <MapPin size={18} />
                        </span>
                        <span className="flex flex-wrap items-center">
                            {destinations?.length > 0 ? (
                                destinations.map((item, index, itemArray) => {
                                    return (
                                        <span key={`${item}_${index}`}>
                                            <span className="whitespace-nowrap">
                                                {item}
                                            </span>
                                            {index < itemArray.length - 1 && (
                                                <span className="px-1">.</span>
                                            )}
                                        </span>
                                    );
                                })
                            ) : (
                                <span className="w-20 bg-gray-300 rounded-full h-2" />
                            )}
                        </span>
                    </div>
                    <div className="flex items-center mr-8 py-1">
                        <span className="text-green-400 mr-2">
                            <Clock size={18} />
                        </span>
                        {ContentDays}
                    </div>
                    <div className="flex items-center mr-8 py-1">
                        <span className="text-green-400 mr-2">
                            <Layers size={18} />
                        </span>
                        <div className="flex items-center gap-2">
                            {cats_list.map((cat, index) => {
                                return (
                                    <span
                                        key={`cats_${index}`}
                                        className="uppercase text-xs tracking-wide">
                                        {index < cats_list.length - 1
                                            ? `${cat}, `
                                            : cat}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionMarketingTitles);
