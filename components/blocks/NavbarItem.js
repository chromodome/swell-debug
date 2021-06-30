import Link from 'next/link';
import IconsLucide from '@/blocks/IconsLucide';

const NavbarItem = ({
    label,
    icon,
    link = '/',
    handleClick = () => {},
    rtl = false,
}) => {
    return (
        <Link href={link} onClick={() => handleClick(false)}>
            <a className='flex items-center px-12'>
                <div
                    className={`transition duration-200 ${
                        rtl ? 'text-base' : 'text-sm'
                    } rounded-lg flex flex-grow py-4 px-8 items-center text-gray-400 hover:bg-green-100 hover:text-green-600`}
                >
                    <span className='mx-2 w-8'>
                        <IconsLucide icon={icon} />
                    </span>

                    {label}
                </div>
            </a>
        </Link>
    );
};
export default NavbarItem;
