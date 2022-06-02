import IncludeItem from './IncludeItem';
import PanelMarketing from './PanelMarketing';

function IncludesExcludesList({ includeType, includeData }) {
    const pillObj = {
        class:
            includeType === 'includes'
                ? 'ri-check-line text-xl text-green-500'
                : 'ri-close-line text-xl text-red-500',
        title: includeType === 'includes' ? 'Included' : 'Excluded'
    };

    return (
        <div className="">
            <PanelMarketing
                title={pillObj.title}
                padding="pt-6 pb-0"
                paddingX="md:px-4"
                pillClass="text-white bg-gray-900 px-6"
                textStyle="text-sm"
                iconClass={pillObj.class}>
                <ul className="h-full">
                    {includeData.map((obj, index, arr) => (
                        <IncludeItem
                            key={`${obj.title}_${index}`}
                            index={index}
                            itemData={obj}
                            includeType={includeType}
                        />
                    ))}
                </ul>
            </PanelMarketing>
        </div>
    );
}

export default IncludesExcludesList;
