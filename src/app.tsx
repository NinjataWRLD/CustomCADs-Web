import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useLanguages from '@/hooks/useLanguages';
import useAuth from '@/hooks/useAuth';
import Header from '@/layout/header/header';
import Navbar from '@/layout/navbar/navbar';
import Footer from '@/layout/footer/footer';
import Sidebar from './layout/sidebar/sidebar';
import Circles from './components/circles';
import Spinner from '@/components/spinner';
import ErrorPage from './components/error-page';
import './index.css';

function App() {
    const { is } = useAuth();
    useLanguages();
    const language = localStorage.getItem('language');
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className={`flex flex-col min-h-screen bg-indigo-50 overflow-hidden relative after-blur font-${language === "en" ? 'english' : 'bulgarian'}`}>
            <Circles />
            <div className={`fixed top-0 w-full z-50`}>
                <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            </div>

            <div className={`fixed top-[4.3rem] left-0 flex w-full z-50`}>
                <aside className={`w-[5%] h-full ${showSidebar ? '' : 'hidden'}`}>
                    <Sidebar />
                </aside>
                <div className={`${showSidebar ? 'w-[95%]' : 'w-[100%]'}`}>
                    <Navbar />
                </div>
            </div>
            <main className={`basis-full grow self-stretch mb-8 mx-16 z-40 mt-[8rem] relative`}>
                {
                    is.loading
                        ? <div className="self-center">
                            <Spinner />
                        </div>
                        : is.error
                            ? <ErrorPage status={400} />
                            : <Outlet />
                }
            </main>
            <div className="absolute footer-trapezoid bottom-0 left-[8em] right-[8em] flex z-40">
                <Footer />
            </div>
        </div>
    );
}

export default App;