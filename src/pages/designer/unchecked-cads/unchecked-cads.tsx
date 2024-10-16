import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCadsByStatus } from '@/hooks/requests/designer';
import usePagination from '@/hooks/usePagination';
import ErrorPage from '@/components/error-page';
import CadItem from '@/components/cads/item';
import SearchBar from '@/components/searchbar';
import Pagination from '@/components/pagination';
import objectToUrl from '@/utils/object-to-url';
import getStatusCode from '@/utils/get-status-code';
import UncheckedCadsCad from './unchecked-cads.interface';
import AnimatedPage from '@/components/animated-page';

function UncheckedCads() {
    const { t: tPages } = useTranslation('pages');
    const [cads, setCads] = useState<UncheckedCadsCad[]>([]);
    const [search, setSearch] = useState({ name: '', category: '', sorting: '' });
    const [total, setTotal] = useState(0);
    const { page, limit, handlePageChange } = usePagination(total, 12);

    const requestSearchParams = objectToUrl({ ...search });
    const cadsQuery = useGetCadsByStatus(requestSearchParams);
    useEffect(() => {
        if (cadsQuery.data) {
            const { cads, count } = cadsQuery.data;
            setCads(cads);
            setTotal(count);
        }
    }, [cadsQuery.data]);

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [search, page]);

    if (cadsQuery.isError) {
        const status = getStatusCode(cadsQuery.error);
        return <ErrorPage status={status} />
    }

    return (
        <>
            <AnimatedPage>
                <div className="flex flex-col gap-y-8 mb-8">
                    <h1 className="text-4xl text-center text-indigo-950 font-bold">
                        {tPages('designer.unchecked-cads_title')}
                    </h1>
                    <section className="flex flex-wrap justify-center gap-y-8">
                        <SearchBar setSearch={setSearch} />
                        {!cads.length
                            ? <p className="text-lg text-indigo-900 text-center font-bold">
                                {tPages('designer.no_cads')}
                            </p>
                            : <ul className="basis-full grid grid-cols-3 gap-12">
                                {cads.map(cad => <CadItem key={cad.id} cad={cad} by />)}
                            </ul>}
                    </section>
                    <div className="basis-full" hidden={!cads.length}>
                        <Pagination
                            page={page}
                            limit={limit}
                            onPageChange={handlePageChange}
                            total={total}
                        />
                    </div>
                </div>
            </AnimatedPage>
        </>
    );
}

export default UncheckedCads;