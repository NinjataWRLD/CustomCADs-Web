import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Profile from './components/profile';
import Person from './interfaces/person';

function AboutUsPage() {
    const { t: tPages } = useTranslation('pages');

    const ivcho: Person = {
        img: '/about/ivan.jpg',
        name: tPages('about.web-dev_name'),
        role: tPages('about.web-dev_role'),
        desc: tPages('about.web-dev_info'),
        contact: 'ivanangelov414@gmail.com'
    };

    const borko: Person = {
        img: '/about/borko.jpg',
        name: tPages('about.3D-designer_name'),
        role: tPages('about.3D-designer_role'),
        desc: tPages('about.3D-designer_info'),
        contact: 'boriskolev2006@gmail.com'
    };

    return (
        <div className="my-6 bg-indigo-300 px-4 rounded-md pb-0 border-2 border-indigo-800 shadow-2xl shadow-indigo-400">
            <h1 className="text-4xl text-center font-semibold py-7">{tPages('about.title')}</h1>
            <section className="gap-2 px-5 pt-5 mb-4 bg-indigo-800 rounded-md">
                <div className="flex flex-col flex-wrap gap-x-3 gap-y-5 xl:flex-row">
                    <article className="basis-full shrink-0">
                        <Profile person={ivcho} />
                    </article>
                    <article className="basis-full shrink-0">
                        <Profile person={borko} />
                    </article>
                </div>
                <div className="flex flex-col py-3 items-center text-indigo-50">
                    <span>
                        <span className="italic">{tPages('about.want_to_join')}</span>
                        <Link target="_blank" to="mailto:customcadsolutions@gmail.com" className="text-sky-300"> {tPages('about.email')}</Link>
                    </span>
                </div>
            </section>
        </div>
    );
}

export default AboutUsPage;