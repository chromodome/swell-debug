import { Pill__Logo } from '../blocks/Pills';

const ContainerFullWidth = ({ pill }) => {
    return (
        <div className={`w-full h-128 bg-gray-400 relative`}>
            {pill && (
                <div
                    className={`absolute z-50 ${
                        pill == 'top'
                            ? 'top-0 -translate-y-1/2'
                            : 'bottom-0 translate-y-1/2'
                    } left-1/2 transform -translate-x-1/2`}
                >
                    <Pill__Logo />
                </div>
            )}
        </div>
    );
};

export default ContainerFullWidth;
