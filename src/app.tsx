import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useLanguages from '@/hooks/useLanguages';
import useAuth from '@/hooks/useAuth';
import Header from '@/layout/header/header';
import Navbar from '@/layout/navbar/navbar';
import Footer from '@/layout/footer/footer';
import Sidebar from './layout/sidebar/sidebar';
import Circles from './components/circles';
import './index.css';

function App() {
    const { isLoading } = useAuth();
    useLanguages();
    const language = localStorage.getItem('language');
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();
    const headerHeight = '70px';

    return isLoading ? <></> : (
        <div className={`flex flex-col min-h-screen bg-indigo-50 overflow-hidden relative after-blur`}
            style={{
                fontFamily: language === "en" ? 'Space Grotesk, sans-serif' : 'bulgarian, sans-serif'
            }}
        >
            <Circles />
            <div className="fixed top-0 left-0 w-full z-50" style={{ height: headerHeight }}>
                <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </div>
            <div className="fixed flex w-full z-40" style={{ marginTop: headerHeight }}>
                <aside className={`w-[5%] ${showSidebar ? '' : 'hidden'}`}>
                    <Sidebar />
                </aside>
                <div className={`${showSidebar ? 'w-[95%]' : 'w-[100%]'}`}>
                    {location.pathname === '/' && <Navbar />}
                </div>
            </div>
            <main className="basis-full grow self-stretch my-8 mx-16 z-10 relative" style={{ marginTop: headerHeight }}>
                <Outlet />
            </main>
            <div className="absolute footer-trapezoid bottom-0 left-[8em] right-[8em] flex z-40">
                <Footer />
            </div>
        </div>
    );
}

export default App;