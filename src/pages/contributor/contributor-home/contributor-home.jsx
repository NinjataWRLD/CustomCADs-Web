import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import RecentCad from './components/recent-cad';
import CadsCount from './components/cads-count';
function ContributorHome() {
    const { t } = useTranslation();
    const { loadedCads: recentCads, loadedCounts: counts } = useLoaderData();

    return (
        <div className="flex flex-col gap-y-6 my-2">
            <div>
                <h1 className="text-3xl text-center text-indigo-950 font-bold">
                    {t('private.cads.home_title')}
                </h1>
                <hr className="mt-2 border-2 border-indigo-700" />
            </div>
            <div className="flex flex-wrap gap-x-8">
                <div className="basis-1/3 grow flex flex-col gap-y-4">
                    <h2 className="text-2xl text-indigo-950 text-center font-bold">
                        {t('private.cads.home_subtitle_1')}
                    </h2>
                    <ol className="grid grid-rows-5 gap-y-3 border-4 border-indigo-500 pt-3 pb-6 px-8 rounded-2xl bg-indigo-100">
                        <li key={0} className="px-2 pb-2 border-b-2 border-indigo-900 rounded">
                            <div className="flex items-center gap-x-4 font-bold">
                                <span className="basis-1/6">{t('common.labels.name')}</span>
                                <div className="grow">
                                    <div className="flex justify-between items-center px-4 py-2">
                                        <p className="basis-1/3 text-start">{t('common.labels.category')}</p>
                                        <p className="basis-1/3 text-center">{t('common.labels.upload_date')}</p>
                                        <p className="basis-1/3 text-end">{t('common.labels.status')}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {recentCads.map(cad => <li key={cad.id}><RecentCad cad={cad} /></li>)}
                    </ol>
                </div>
                <div className="min-h-full basis-1/4 flex flex-col gap-y-4">
                    <h2 className="text-2xl text-indigo-950 text-center font-bold">
                        {t('private.cads.home_subtitle_2')}
                    </h2>
                    <ul className="basis-full flex flex-col justify-items-center items-between border-4 border-indigo-500 rounded-2xl overflow-hidden bg-indigo-100 text-xl italic">
                        <CadsCount text={`${t('common.statuses.Unchecked_plural')} - ${counts.unchecked}`} />
                        <CadsCount text={`${t('common.statuses.Validated_plural')} - ${counts.validated}`} />
                        <CadsCount text={`${t('common.statuses.Reported_plural')} - ${counts.reported}`} />
                        <CadsCount text={`${t('common.statuses.Banned_plural')} - ${counts.banned}`} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ContributorHome;