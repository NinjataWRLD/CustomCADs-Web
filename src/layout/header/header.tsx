import { Link } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/hooks/useAuth';
import HeaderBtn from './components/header-btn';
import LoginBtn from './components/login-btn';
import AccountBtn from './components/account-btn';

interface HeaderProps {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setShowSidebar } : HeaderProps) {
    const { isAuthenticated } = useAuth();

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    return (
        <header className="bg-gray-900 border-b bg-opacity-80 border-green-700 border-opacity-40 rounded-b-lg py-4">
            <ul className="flex justify-between items-center mx-5">
                <li className="basis-1/3 flex justify-start items-center gap-x-6">
                    <HeaderBtn icon={faBars} onClick={toggleSidebar} />
                </li>
                <li className="basis-1/3 flex justify-center">
                    <Link to="/" className="w-80 hover:no-underline">
                        <img src="/logo.png" className="w-full h-auto hover:opacity-60 active:opacity-80" />
                    </Link>
                </li>
                <li className="basis-1/3 flex justify-end items-center gap-x-4 hover:no-underline">
                    {isAuthenticated ? <AccountBtn /> : <LoginBtn />}
                </li>
            </ul>
        </header>
    );
}

export default Header;