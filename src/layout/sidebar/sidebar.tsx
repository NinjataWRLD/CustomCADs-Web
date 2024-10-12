import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '@/hooks/useAuth';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SidebarBtn from './components/sidebar-btn';
import LoginBtn from './components/login-btn';
import LanguageSelector from './components/language-btn';
import AccountBtn from './components/account-btn';

function Sidebar() {
    const { t: tLayout } = useTranslation('layout');
    const { isAuthenticated, userRole } = useAuth();

    return (
        <div className="absolute text-center bg-slate-600 bg-opacity-20 h-screen w-[5%] border-green-100 border-opacity-10 border-x-4">
            <ul className="flex flex-col justify-center items-center mx-5">
                <li className="basis-1/3 flex flex-col justify-center mt-16">
                    <Link to={!isAuthenticated ? '/' : `/${userRole?.toLowerCase()}`} className="hover:no-underline">
                        <SidebarBtn icon="home" orderReversed />
                    </Link>
                </li>
                <li className="basis-1/3 flex flex-col justify-center mt-5">
                    <Link to="/gallery" className="hover:no-underline">
                        <SidebarBtn icon="basket-shopping" text={tLayout("header.gallery")} orderReversed />
                    </Link>
                </li>
                <li className="basis-1/3 flex flex-col justify-center mt-5">
                    {isAuthenticated ? <AccountBtn /> : <LoginBtn />}
                </li>
                <li className="basis-1/3 flex flex-col justify-center mt-5">
                <LanguageSelector />
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;