const Avatar = ({ user, size = 30 }) => {
    return (
        <div
            style={{ width: size, height: size }}
            className='rounded-full flex justify-center items-center bg-green-500 text-white overflow-hidden'
        >
            {user.image ? (
                <img src={user.image} className='object-cover w-full h-full' />
            ) : (
                `${user.firstname.charAt(0).toUpperCase()}${user.lastname
                    .charAt(0)
                    .toUpperCase()}`
            )}
        </div>
    );
};

export default Avatar;
