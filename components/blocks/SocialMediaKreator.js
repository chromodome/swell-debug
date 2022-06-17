import classNames from 'classnames';

const socialIcons = {
    instagram: {
        type: 'icon',
        value: 'ri-instagram-line text-xl',
        order: 1
    },
    facebook: {
        type: 'icon',
        value: 'ri-facebook-fill text-xl',
        order: 2
    },

    youtube: {
        type: 'icon',
        value: 'ri-youtube-line text-2xl',
        order: 3
    },

    twitter: {
        type: 'icon',
        value: 'ri-twitter-fill text-xl',
        order: 4
    },
    tiktok: {
        type: 'text',
        value: 'Tiktok',
        order: 5
    },

    website: {
        type: 'text',
        value: 'www',
        order: 6
    }
};

const SocialMediaKreator = ({ social, preset = 'default' }) => {
    return (
        <div className="flex items-center gap-2 text-xl">
            {social?.website && (
                <SocialLink social={social} item="website" preset={preset} />
            )}
            {social?.tiktok && (
                <SocialLink social={social} item="tiktok" preset={preset} />
            )}
            {social?.instagram && (
                <SocialLink social={social} item="instagram" preset={preset} />
            )}
            {social?.facebook && (
                <SocialLink social={social} item="facebook" preset={preset} />
            )}
            {social?.youtube && (
                <SocialLink social={social} item="youtube" preset={preset} />
            )}
            {social?.twitter && (
                <SocialLink social={social} item="twitter" preset={preset} />
            )}
        </div>
    );
};

export default SocialMediaKreator;

const colorPresets = {
    default: {
        textColor: 'text-gray-800',
        borderColor: 'border-gray-600',
        bgColor: '',
        hoverTextColor: 'hover:text-green-400',
        hoverBorderColor: 'hover:border-green-400',
        hoverBgColor: ''
    },
    white: {
        textColor: 'text-white',
        borderColor: 'border-white',
        bgColor: '',
        hoverTextColor: 'hover:text-green-400',
        hoverBorderColor: 'hover:border-green-400',
        hoverBgColor: ''
    }
};

const SocialLink = ({ social, item, preset = 'default' }) => {
    return socialIcons[item] ? (
        <a
            target="_blank"
            noreferrer
            href={social[item]}
            className={classNames(
                'border-2',
                colorPresets[preset].textColor,
                colorPresets[preset].hoverTextColor,

                socialIcons[item].type !== 'icon'
                    ? `rounded-full ${colorPresets[preset].borderColor} ${colorPresets[preset].hoverBorderColor} flex h-6 px-2 items-center -mt-1`
                    : 'border-transparent'
            )}>
            {socialIcons[item]?.type === 'icon' ? (
                <i className={classNames(socialIcons[item]?.value)}></i>
            ) : (
                <span className="text-xs">{socialIcons[item]?.value}</span>
            )}
        </a>
    ) : null;
};
