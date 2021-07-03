import React from 'react';
import SectionTitle from '@/blocks/SectionTitle';
import { Pill__Experience } from '@/blocks/Pills';
import Icons from '@/blocks/Icons';
import Avatar from '@/blocks/Avatar';

/**
 *
 * @param {{
 * sectionTitle: {title: string, subTitle: string},
 * days: number,
 * type: string,
 * authorId: any{}
 * }}
 * @returns
 */

const ExperienceHeader = ({
    sectionTitles = { title: '', subTitle: '' },
    days,
    type,
    authorId
}) => {
    return (
        <>
            <div className="flex mb-6">
                <SectionTitle section={sectionTitles} />
                <div className="flex ml-8 w-full max-w-max items-start pt-1">
                    <div className="flex-2">{`${days} days`}</div>
                    <Icons
                        iName="HEART"
                        iClasses="ml-8 mr-8 flex-1 cursor-pointer"
                        size="2xl"
                    />
                    <div className="flex-1">
                        <Pill__Experience label={type} classes="bg-kn-white" />
                    </div>
                </div>
            </div>
            <div className="relative px-4 flex items-center">
                <div className="mr-4">
                    <Avatar url={authorId.avatar} />
                </div>
                <div>by {`${authorId?.first_name} ${authorId?.last_name}`}</div>
            </div>
        </>
    );
};

export default ExperienceHeader;
