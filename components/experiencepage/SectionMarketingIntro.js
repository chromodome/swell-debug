import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpSubsection from '@/components/sections/ExpSubsection';
import { capitalize, kreatorName } from 'helpers/FEutils';
import KreatorBadgeStatic from '@/components/blocks/KreatorBadgeStatic';
import MarketingBudget from './MarketingBudget';
import BestTimeToGoRanges from '@/components/blocks/BestTimeToGoRanges';
import RawCard from '@/blocks/Card/RawCard';
import Link from 'next/link';
import SocialMediaKreator from '../blocks/SocialMediaKreator';

function SectionMarketingIntro(props) {
    const {
        type = '',
        desc = '',
        budget_min = 0,
        budget_max = 0,
        budget_currency = 'USD',
        user: author,
        globalState: { siteData },
        bestTimeToGo: { time_range = false, isVisible: bestTimeToGoVisible },
        budgetVisible,
        social
    } = props;

    return (
        <>
            <ExpSubsection borders="" padding="pb-6" margins="mb-8">
                <RawCard padding="p-8 md:p-8" margins="mt-4" bgColor="bg-white">
                    <div className="flex flex-col md:flex-row gap-8 w-full">
                        <div className="mx-auto md:mx-0">
                            <KreatorBadgeStatic
                                author={author}
                                card={false}
                                avatarOnly={true}
                                size="w-36 h-36"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between w-full items-center mb-4">
                                <div className="flex-1">
                                    <div className="text-green-400 flex flex-col lg:flex-row gap-2 font-bold lg:items-center text-2xl tracking-tight leading-none flex-shrink-0 flex-initial mb-2  lg:mr-8 ">
                                        <div className="mr-3 whitespace-nowrap">{`A ${capitalize(
                                            type
                                        )} Experience`}</div>
                                        <div className="flex items-center">
                                            <span className="mr-3 text-sm text-green-700">
                                                by
                                            </span>
                                            <Link
                                                href={`/experiences/user/${author.username}/all`}>
                                                <a className=" underline text-base lg:text-lg text-green-700">{`${kreatorName(
                                                    author.profile
                                                )}`}</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`block-html leading-6 ${
                                    desc ? 'text-gray-800' : 'italic'
                                } text-xs md:text-sm`}
                                dangerouslySetInnerHTML={{
                                    __html: author.bio
                                }}
                            />
                            <div className="flex items-center gap-2 text-xl">
                                <SocialMediaKreator social={social} />
                            </div>
                        </div>
                    </div>
                </RawCard>
                {/* <div className="flex justify-between w-full items-center">
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
                </div> */}
            </ExpSubsection>

            <ExpSubsection margins="mt-8 mb-14">
                <div
                    className="block-html text-gray-800 leading-7 text-sm1 md:text-base"
                    dangerouslySetInnerHTML={{
                        __html: desc || 'No content available'
                    }}
                />
                {budgetVisible && (
                    <MarketingBudget
                        experienceDetails={{
                            budget_min,
                            budget_max,
                            budget_currency
                        }}
                    />
                )}
                {bestTimeToGoVisible && (
                    <BestTimeToGoRanges timeRange={time_range} />
                )}
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
