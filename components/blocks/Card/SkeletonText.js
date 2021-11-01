const SkeletonText = ({
    color = 'bg-gray-200',
    rounded = 'rounded-full',
    height = 'h-3',
    width = 'w-48'
}) => {
    return <span className={`${color} ${rounded} ${height} ${width}`} />;
};

export default SkeletonText;
