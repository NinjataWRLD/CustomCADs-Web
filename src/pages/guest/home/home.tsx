import { useTranslation } from 'react-i18next';
import Cad from '@/components/cads/cad';
import BtnLink from './components/btn-link';

function HomePage() {
    const { t: tPages } = useTranslation('pages');

    return (
        <>
            <section className="my-4 flex justify-between items-center">
                <article className="h-full basis-8/12 shrink-0 flex flex-wrap items-center gap-y-8 text-center">
                    <h1 className="basis-full text-2xl md:text-3xl lg:text-6xl font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 animate-pulse drop-shadow-lg">{tPages('home.title')}</h1>
                    <span className="basis-full flex flex-col gap-y-3">
                        <span className="text-2xl text-white">{tPages('home.subtitle')}</span>
                        <span className="text-lg italic text-white">{tPages('home.hint')}</span>
                    </span>
                    <div className="basis-full flex justify-center gap-x-5">
                        <BtnLink to="/register/client" text={tPages('home.buy_btn')} />
                        <BtnLink to="/register/contributor" text={tPages('home.sell_btn')} />
                    </div>
                </article>
                <aside className="grow h-96">
                    {/* <Cad isHomeCad /> */}
                </aside>
            </section>
        </>
    );
}

export default HomePage;