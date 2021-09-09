const Avatar = ({ profile, card }) => {
    return (
        <div className={`${card ? 'absolute z-100 inline-block' : ''}`}>
            <div
                className={`${
                    card ? 'w-8 h-8 text-xs' : 'h-10 w-10'
                } rounded-full flex justify-center items-center bg-green-500 text-white overflow-hidden`}>
                {profile?.avatar ? (
                    <img
                        src={profile.avatar}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    `${profile?.first.charAt(0).toUpperCase()}${profile?.last
                        .charAt(0)
                        .toUpperCase()}`
                )}
            </div>
        </div>
    );
};

export default Avatar;
