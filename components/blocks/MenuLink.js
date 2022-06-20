import classNames from 'classnames';
import NavLink from './NavLink';

const MenuLink = ({
    href,
    type,
    label,
    lineHeight = 'h-0.5 d-hdpi-2:h-vw-0.5',
    boxHeight = 'h-8 d-hdpi-2:h-vw-8',
    lineColor = 'bg-green-400a bg-green-900 bg-opacity-75',
    textSize = '',
    activeClass = 'text-green-500a text-gray-900 font-semibold'
}) => {
    return (
        <NavLink
            type={type}
            exact
            href={href}
            className={classNames(
                'relative group flex items-center',
                boxHeight,
                textSize
            )}>
            {(isActive) => (
                <>
                    <div
                        className={classNames(
                            isActive ? activeClass : 'text-gray-900'
                        )}>
                        {label}
                    </div>
                    <div
                        className={classNames(
                            isActive ? 'w-0' : 'w-0 group-hover:w-full ',
                            'absolute bottom-0 transition-width ',
                            lineColor,
                            lineHeight
                        )}></div>
                </>
            )}
        </NavLink>
    );
};

export default MenuLink;
