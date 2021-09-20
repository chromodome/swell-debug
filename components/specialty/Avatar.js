const Avatar = ({ profile, card, size = 'w-8 h-8' }) => {
    return (
        <div className={`${card ? 'absolute z-100 inline-block' : ''}`}>
            <div
                className={`${size} ${
                    card ? 'text-xs' : ''
                } rounded-full flex justify-center items-center bg-green-500 text-white overflow-hidden`}>
                {profile?.avatar && profile?.avatar != 'null' ? (
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
