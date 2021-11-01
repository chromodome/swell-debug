import Link from 'next/link';
const FooterMenuLink = ({ url, label }) => {
    return (
        <li className="list-none">
            <Link href={url}>
                <a className="hover:underline">{label}</a>
            </Link>
        </li>
    );
};

export default FooterMenuLink;
