import { randomItem } from '@/helpers/FEutils';
import SkeletonText from './SkeletonText';

const widthArr = [
    'w-16',
    'w-16',
    'w-16',
    'w-16',
    'w-20',
    'w-20',
    'w-20',
    'w-24',
    'w-24',
    'w-28',
    'w-28',
    'w-28',
    'w-28',
    'w-32',
    'w-32'
];
const SkeletonParagraph = ({
    color = 'bg-gray-100',
    gapX = 'gap-x-2',
    gapY = 'gap-y-4',
    lineHeight = 'h-3',
    words = 50,
    className
}) => {
    const wordsJSX = [];
    for (let i = 0; i < words; i++) {
        wordsJSX.push(
            <SkeletonText
                key={`skeleton_${i}`}
                height={lineHeight}
                color={color}
                width={randomItem(widthArr)}
            />
        );
    }

    return (
        <span className={`flex ${className} ${gapX} ${gapY} flex-wrap`}>
            {wordsJSX}
        </span>
    );
};

export default SkeletonParagraph;
