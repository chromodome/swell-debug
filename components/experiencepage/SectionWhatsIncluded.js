import IncludesExcludesList from './IncludesExcludesList';

import ExpSubsection from '@/components/sections/ExpSubsection';

function SectionWhatsIncluded({ data }) {
    const { includes, excluded, desc, tips, gallery: images } = data;

    return (
        <>
            <ExpSubsection>
                <div className="marketing-title">What's Included</div>

                {false && (
                    <div
                        className="block-html text-gray-800 leading-7 text-sm1 md:text-base d-hdpi-2:text-vw-base d-hdpi-2:leading-normal"
                        dangerouslySetInnerHTML={{
                            __html: desc || 'No content available'
                        }}
                    />
                )}

                <div>
                    {includes.length ? (
                        <IncludesExcludesList
                            includeType={'includes'}
                            includeData={includes}
                        />
                    ) : null}

                    {excluded.length ? (
                        <IncludesExcludesList
                            includeType={'excluded'}
                            includeData={excluded}
                        />
                    ) : null}
                </div>
            </ExpSubsection>
        </>
    );
}

export default SectionWhatsIncluded;
