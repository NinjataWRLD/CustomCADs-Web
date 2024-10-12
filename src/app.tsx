import { Outlet } from 'react-router-dom';
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


    return isLoading ? <></> : (
        <div className={`flex flex-col min-h-screen bg-indigo-50 overflow-hidden relative after-blur`}
            style={{
                fontFamily: language === "en" ? 'Space Grotesk, sans-serif' : 'bulgarian, sans-serif'
            }}
        >
            <Circles />
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            <div className="flex w-full sticky top-[60px] z-50">
                <aside className="w-[5%]">
                    <Sidebar />
                </aside>
                <div className="w-[95%]">
                    <Navbar />
                </div>
            </div>
            <main className="basis-full grow self-stretch my-8 mx-16 z-10 relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;