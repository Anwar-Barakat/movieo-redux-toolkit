import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-neutral-900 text-neutral-400 py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row md:justify-between items-center'>
                    <div className='mb-6 md:mb-0'>
                        <p className='text-2xl font-bold mb-4 text-white'>Anawr DEV</p>
                        <div className='flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left'>
                            <Link to="/" className='text-neutral-300 hover:text-white transition-colors duration-300' aria-label="About">About</Link>
                            <Link to="/" className='text-neutral-300 hover:text-white transition-colors duration-300' aria-label="Contact">Contact</Link>
                        </div>
                    </div>
                    <div className='flex gap-6 mb-6 md:mb-0'>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='text-neutral-300 hover:text-blue-500 transition-colors duration-300' aria-label="Twitter">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='text-neutral-300 hover:text-blue-600 transition-colors duration-300' aria-label="Facebook">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className='text-neutral-300 hover:text-gray-400 transition-colors duration-300' aria-label="GitHub">
                            <FaGithub size={24} />
                        </a>
                    </div>
                    <p className='text-sm text-center text-neutral-500 mt-4'>Created By Anawr DEV</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
