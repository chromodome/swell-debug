const Avatar = ({ user }) => {
    return (
        <div className='w-10 h-10 rounded-full flex justify-center items-center bg-green-500 text-white overflow-hidden'>
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
