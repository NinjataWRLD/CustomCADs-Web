import { useTranslation } from 'react-i18next';
import Cad from '@/components/cads/cad';
import BtnLink from './components/btn-link';
import Cube from './components/cube';

function HomePage() {
    const { t: tPages } = useTranslation('pages');

    return (
        <>
            <section className="my-4 flex justify-between items-center font-english">
                <article className="h-full basis-8/12 shrink-0 flex flex-wrap items-center gap-y-8 text-center">
                    <h1 className="basis-full text-2xl md:text-3xl lg:text-6xl font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-green-400 to-slate-700 drop-shadow-2xl">{tPages('home.title')}</h1>
                    <span className="basis-full flex flex-col gap-y-3">
                        <span className="text-2xl text-white">{tPages('home.subtitle')}</span>
                        <span className="text-lg italic text-white">{tPages('home.hint')}</span>
                    </span>
                    <div className="basis-full flex justify-center gap-x-10">
                        <BtnLink to="/register/client" text={tPages('home.buy_btn')} />
                        <BtnLink to="/register/contributor" text={tPages('home.sell_btn')} />
                    </div>
                </article>
                <div className="grow h-96 z-50">
                    {/* <Cad isHomeCad /> */}
                    <Cube />
                </div>
            </section>
        </>
    );
}

export default HomePage;