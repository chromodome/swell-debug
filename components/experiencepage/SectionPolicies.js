import { useState } from 'react';

import ExpSubsection from '@/components/sections/ExpSubsection';
import PoliciesList from './PoliciesList';

function SectionPolicies({ dataPolicies }) {
    const { data } = dataPolicies;

    return (
        <>
            <ExpSubsection>
                <div className="marketing-title">
                    Refund & Cancellation policies
                </div>

                <div className="relative">
                    {data?.length && data?.length > 0 ? (
                        <div className="">
                            <PoliciesList policyData={data} />
                        </div>
                    ) : null}
                </div>
            </ExpSubsection>
        </>
    );
}

export default SectionPolicies;
