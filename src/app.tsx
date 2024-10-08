import { Outlet } from 'react-router-dom';
import useLanguages from '@/hooks/useLanguages';
import useAuth from '@/hooks/useAuth';
import Header from '@/layout/header/header';
import Navbar from '@/layout/navbar/navbar';
import Footer from '@/layout/footer/footer';
import Circle from './components/circle';
import './index.css';

function App() {
    const { isLoading } = useAuth();
    useLanguages();

    return isLoading ? <></> : (
        <div className="flex flex-col min-h-screen bg-indigo-50 overflow-hidden relative after-blur">
            <Circle height='h-[100%]' width='w-[100%]' round='' animation=''
                delay='' color='bg-slate-800' pos1='' pos2='' />
            <Circle height='h-[80%]' width='w-[70%]' round='rounded-[3rem]'
                animation='animate-gradient' delay='delay-100' color='bg-green-500' pos1='top-[-12%]' pos2='right-[-12%]' />
            <Circle height='h-[50%]' width='w-[75%]' color='bg-green-500' round='rounded-[3rem]'
                animation='animate-gradient' delay='delay-200' pos1='bottom-[-10%]' pos2='left-[-5%]' />
            <Circle height='h-[65%]' width='w-[80%]' color='bg-black' round='rounded-[3rem]'
                animation='animate-gradient' delay='delay-300' pos1='bottom-[-15%]' pos2='right-[-20%]' />
            <Circle height='h-[70%]' width='w-[65%]' color='bg-black' round='rounded-[3rem]'
                animation='animate-gradient' delay='delay-400' pos1='top-[-10%]' pos2='left-[-5%]' />
            <div className="sticky top-0 z-50">
                <Header />
                <Navbar />
            </div>
            <main className="basis-full grow self-stretch my-8 mx-16 z-10 relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;