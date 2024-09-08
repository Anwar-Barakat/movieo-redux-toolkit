import './header.scss';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo.png';
import userIcon from '/src/assets/user.png';
import { useEffect, useState } from 'react';
import MobileNavigation from './MobileNavigation';
import { IoSearchOutline } from 'react-icons/io5';
import { navItems } from '../../constants/navigation';



const Header = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            navigate(`/search?q=${searchInput}`);
        }
    }

    useEffect(() => {
        if (searchInput.length > 0) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput, navigate]);

    return (
        <header className='top-0 w-full h-16 bg-black bg-opacity-75 z-40'>
            <div className="container mx-auto flex__between h-full px-3">
                <Link to={`/`} className="text-white font-bold text-xl">
                    <img src={logo} alt="logo" width={120} />
                </Link>

                <nav className='hidden lg:flex'>
                    <ul className="flex space-x-4">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <NavLink to={`/${item.href}`} className={({ isActive }) => `transition-all  hover:text-primary ${isActive ? "text-primary" : "text-neutral-400"}`}>{item.label}</NavLink>
                            </li>
                        ))}

                    </ul>
                </nav>

                <div className='flex__between gap-5'>
                    <form className='flex__between gap-2 bg-neutral-50 text-white px-3 py-1 rounded-full' onSubmit={handleSubmit}>
                        <input type="text" placeholder="Search" className='border-0 outline-none text-black hidden lg:block' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button className='text-2xl text-primary'>
                            <IoSearchOutline />
                        </button>
                    </form>
                    <div className="lg:hidden flex__between">
                        <button className="text-white rounded-full overflow-hidden shadow-md w-8 h-8 cursor-pointer active:scale-90 transition-all">
                            <img src={userIcon} alt="user" className='w-full h-full' />
                        </button>
                    </div>
                </div>

            </div>
            <MobileNavigation />
        </header>

    )
}

export default Header
