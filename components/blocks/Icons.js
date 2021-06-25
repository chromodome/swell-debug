import iconConsts from 'constants/iconConsts';

const Icons = ({ iName, iClasses, size }) => {
    return (
        <div
            className={`flex justify-center items-center ${
                iClasses || iconConsts.icons[iName.toUpperCase()]?.classAdj
            }  text-${
                size ? size : iconConsts.icons[iName.toUpperCase()]?.size
            }`}
        >
            <i
                className={`text-center  ${
                    iconConsts.icons[iName.toUpperCase()]?.icon || 'las la-ban'
                }`}
            ></i>
        </div>
    );
};

export default Icons;
