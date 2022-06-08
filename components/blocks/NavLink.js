import { useRouter } from 'next/router';
import Link from 'next/link';

const NavLink = ({ href, exact, children, ...props }) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' pointer-events-none select-none';
    }
    return isActive ? (
        <div {...props}>{children(isActive)}</div>
    ) : (
        <Link href={href}>
            <a {...props}>{children(isActive)}</a>
        </Link>
    );
};

export default NavLink;
