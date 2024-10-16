import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query';
import { GetCadsCounts, GetRecentCads } from '@/requests/private/cads';
import RecentItem from '@/components/dashboard/recent-item';
import CadsCount from '@/components/dashboard/count-item';
import ErrorPage from '@/components/error-page';
import getStatusCode from '@/utils/get-status-code';
import ContributorHomeCad from './contributor-home.interface';
import AnimatedPage from '@/components/animated-page';

function ContributorHome() {
    const { t: tPages } = useTranslation('pages');
    const { t: tCommon } = useTranslation('common');

    interface CountByStatus {
        unchecked: number
        validated: number
        reported: number
        banned: number
    }

    let cads: ContributorHomeCad[] = [];
    const { data: cadsData, isError: cadsIsError, error: cadsError } = useQuery({
        queryKey: ['contributor-home', 'cads'],
        queryFn: async () => {
            const { data } = await GetRecentCads();
            return data;
        }
    });
    if (cadsIsError) {
        const status = getStatusCode(cadsError);
        return <ErrorPage status={status} />;
    }
    if (cadsData) {
        cads = cadsData;
    }

    let counts: CountByStatus = { unchecked: 0, validated: 0, reported: 0, banned: 0 };
    const { data: countsData, isError: countsIsError, error: countsError } = useQuery({
        queryKey: ['contributor-home', 'counts'],
        queryFn: async () => {
            const { data } = await GetCadsCounts();
            return data;
        }
    });
    if (countsIsError) {
        const status = getStatusCode(countsError);
        return <ErrorPage status={status} />;
    }
    if (countsData) {
        counts = countsData;
    }

    return (
        <AnimatedPage>
            <div className="flex flex-col gap-y-6 my-2">
                <div>
                    <h1 className="text-3xl text-center text-indigo-950 font-bold">
                        {tPages('cads.home_title')}
                    </h1>
                    <hr className="mt-2 border-2 border-indigo-700" />
                </div>
                <div className="flex flex-wrap gap-x-8">
                    <div className="basis-1/3 grow flex flex-col gap-y-4">
                        <h2 className="text-2xl text-indigo-950 text-center font-bold">
                            {tPages('cads.home_subtitle_1')}
                        </h2>
                        <ol className="grid grid-rows-5 gap-y-3 border-4 border-indigo-500 pt-3 pb-2 px-6 rounded-2xl bg-indigo-100">
                            <li key={0} className="px-2 mb-2 border-b-2 border-indigo-900 rounded">
                                <div className="flex items-center gap-x-4 font-bold">
                                    <span className="basis-1/6">{tCommon('labels.name')}</span>
                                    <div className="grow">
                                        <div className="flex justify-between items-center px-4 py-2">
                                            <p className="basis-1/3 text-start">{tCommon('labels.category')}</p>
                                            <p className="basis-1/3 text-center">{tCommon('labels.upload_date')}</p>
                                            <p className="basis-1/3 text-end">{tCommon('labels.status')}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            {cads.map(cad => <li key={cad.id}>
                                <RecentItem to={`/contributor/cads/${cad.id}`} item={cad} date={cad.creationDate} />
                            </li>)}
                        </ol>
                    </div>
                    <div className="min-h-full basis-1/4 flex flex-col gap-y-4">
                        <h2 className="text-2xl text-indigo-950 text-center font-bold">
                            {tPages('cads.home_subtitle_2')}
                        </h2>
                        <ul className="basis-full flex flex-col justify-items-center items-between border-4 border-indigo-500 rounded-2xl overflow-hidden bg-indigo-100 text-xl italic">
                            <CadsCount text={`${tCommon('statuses.Unchecked_plural')} - ${counts.unchecked}`} />
                            <CadsCount text={`${tCommon('statuses.Validated_plural')} - ${counts.validated}`} />
                            <CadsCount text={`${tCommon('statuses.Reported_plural')} - ${counts.reported}`} />
                            <CadsCount text={`${tCommon('statuses.Banned_plural')} - ${counts.banned}`} />
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}

export default ContributorHome;