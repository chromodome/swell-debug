import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpSubsection from '@/components/sections/ExpSubsection';
import { capitalize, getDays, kreatorName } from 'helpers/FEutils';
import KreatorBadgeStatic from '@/components/blocks/KreatorBadgeStatic';
import MarketingBudget from './MarketingBudget';
import BestTimeToGoRanges from '@/components/blocks/BestTimeToGoRanges';

function SectionMarketingIntro(props) {
    const {
        experienceDetails: {
            content_marketing: {
                intro: { title, subtitle, desc }
            },
            content: {
                best_time_to_go: { time_range = false }
            },
            type,
            budget_min,
            budget_max,
            budget_currency = 'USD',
            user: author,
            user: { profile }
        },
        // auth: { user },
        globalState: { siteData }
    } = props;

    // const preferredCurrency = user?.profile?.currency || 'USD';

    // const rtl = !!translations[lang].rtl;
    return (
        <>
            <ExpSubsection padding="pb-6" margins="mb-8">
                <div className="flex justify-between w-full items-center">
                    <div className="flex-1">
                        <div className="text-green-400 flex flex-col lg:flex-row gap-2 font-bold lg:items-center text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-2  lg:mr-8 ">
                            <div className="mr-3 whitespace-nowrap">{`A ${capitalize(
                                type
                            )} Experience`}</div>
                            <div className="flex items-center">
                                <span className="mr-3 text-sm text-green-700">
                                    by
                                </span>

                                <div className=" underline text-base lg:text-lg text-green-700">
                                    {`${kreatorName(profile)}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <KreatorBadgeStatic
                            author={author}
                            card={false}
                            avatarOnly={true}
                        />
                    </div>
                </div>
            </ExpSubsection>

            <ExpSubsection margins="mt-8 mb-14">
                <div
                    className="block-html text-gray-800 leading-7 text-sm1 md:text-base"
                    dangerouslySetInnerHTML={{
                        __html: desc || 'No content available'
                    }}
                />
                <MarketingBudget
                    experienceDetails={{
                        budget_min,
                        budget_max,
                        budget_currency
                    }}
                />
                {time_range && <BestTimeToGoRanges timeRange={time_range} />}
            </ExpSubsection>
        </>
    );
}

const mapStateToProps = (state) => ({
    globalState: state.globalState,
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionMarketingIntro);
