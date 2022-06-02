import PolicyItem from './PolicyItem';

function PoliciesList({ policyData }) {
    const buildList = () => {
        return policyData.map((obj, index) => {
            const key = `${obj.title}_${index}`;

            return (
                <PolicyItem
                    key={`${obj.title}_${index}`}
                    index={index}
                    itemData={obj}
                />
            );
        });
    };
    return (
        <div className="">
            <ul className="h-full">{buildList()}</ul>
        </div>
    );
}

export default PoliciesList;
