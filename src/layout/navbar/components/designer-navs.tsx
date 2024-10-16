import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function DesignerNavigationalMenu() {
    const { t: tLayout } = useTranslation('layout');

    return (
        <ul className="px-2 flex gap-x-[0.75px]">
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/designer/cads" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.cads_link_1')}</Link>
            </li>
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/designer/cads/upload" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.cads_link_2')}</Link>
            </li>
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/designer/cads/unchecked" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.designer_link_1')}</Link>
            </li>
            <li className="basis-full text-center bg-slate-800 rounded-b-[50%] py-3 shadow-green-400 shadow-xl">
                <Link to="/designer/orders/pending" className='hover:no-underline hover:text-green-200'>{tLayout('navbar.designer_link_2')}</Link>
            </li>
        </ul>
    );
}

export default DesignerNavigationalMenu;