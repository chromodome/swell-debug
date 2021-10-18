import Link from 'next/link';
import IconsLucide from '@/blocks/Icon/IconsLucide';

const NavbarItem = ({
    label,
    icon,
    link,
    handleClick = () => {},
    rtl = false
}) => {
    const jsx = (
        <div
            className={`transition duration-200 ${
                rtl ? 'text-base' : 'text-sm'
            } rounded-lg flex flex-grow py-4 px-8 items-center text-gray-400 hover:bg-green-100 hover:text-green-600`}>
            <span className="mx-2 w-8">
                <IconsLucide icon={icon} />
            </span>

            {label}
        </div>
    );

    return link ? (
        <Link href={link}>
            <a className="flex items-center px-12">{jsx}</a>
        </Link>
    ) : (
        <button
            className="focus:outline-none outline-none flex items-center px-12 w-full"
            onClick={handleClick}>
            {jsx}
        </button>
    );
};
export default NavbarItem;
