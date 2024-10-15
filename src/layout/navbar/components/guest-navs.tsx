import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function GuestNavigationalMenu() {
    const { t: tLayout } = useTranslation('layout');

    return (
        <ul className="px-2 flex gap-x-[0.75px]">
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/info/client" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.guest_link_1')}</Link>
            </li>
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/info/contributor" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.guest_link_2')}</Link>
            </li>
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/info/designer" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.guest_link_3')}</Link>
            </li>
        </ul>
    );
}

export default GuestNavigationalMenu;