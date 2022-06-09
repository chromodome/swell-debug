import classNames from 'classnames';
import NavLink from './NavLink';

const MenuLink = ({
    href,
    label,
    lineHeight = 'h-1',
    boxHeight = 'h-8',
    lineColor = 'bg-green-400',
    textSize = '',
    activeClass = 'text-green-500 font-semibold'
}) => {
    return (
        <NavLink
            href={href}
            className={classNames(
                'relative group flex items-center',
                boxHeight,
                textSize
            )}>
            {(isActive) => (
                <>
                    <div className={classNames(isActive && activeClass)}>
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
