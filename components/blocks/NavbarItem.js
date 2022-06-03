import Link from 'next/link';
import IconsLucide from '@/blocks/Icon/IconsLucide';
import router from 'next/router';

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

    const handleLink = () => {
        handleClick();
        router.push(link);
    };

    return link ? (
        // <Link href={link} onClick={handleClick}>
        //     <a className="flex items-center px-12">{jsx}</a>
        // </Link>
        <button
            className="focus:outline-none outline-none flex items-center px-12 w-full"
            onClick={handleLink}>
            {jsx}
        </button>
    ) : (
        <button
            className="focus:outline-none outline-none flex items-center px-12 w-full"
            onClick={handleClick}>
            {jsx}
        </button>
    );
};
export default NavbarItem;
