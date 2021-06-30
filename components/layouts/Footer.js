import Link from 'next/link';
const Footer = () => {
    return (
        <footer>
            <div className='bg-gray-800  py-16'>
                <div className='mx-auto max-w-6xl h-48 min-h-full bg-red-100 flex'>
                    Footer
                </div>
            </div>
            <div className='bg-gray-900 py-2 '>
                <div className='mx-auto max-w-6xl text-white text-xs  flex items-center'>
                    Copyright stuff
                </div>
            </div>
        </footer>
    );
};

export default Footer;
