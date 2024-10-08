import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { GetCads } from '@/requests/private/cads';
import usePagination from '@/hooks/usePagination';
import ErrorPage from '@/components/error-page';
import SearchBar from '@/components/searchbar';
import Pagination from '@/components/pagination';
import CadItem from '@/components/cads/item';
import objectToUrl from '@/utils/object-to-url';
import getStatusCode from '@/utils/get-status-code';
import UserCadsCad from './cads.interface';

function UserCads() {
    const { t: tPages } = useTranslation('pages');
    const [cads, setCads] = useState<UserCadsCad[]>([]);
    const [search, setSearch] = useState({ name: '', category: '', sorting: '' });
    const [total, setTotal] = useState(0);
    const { page, limit, handlePageChange } = usePagination(total, 12);

    const { data, isError, error } = useQuery({
        queryKey: ['cads'],
        queryFn: async () => {
            const requestSearchParams = objectToUrl({ ...search });
            const { data } = await GetCads(requestSearchParams);
            return data;
        }
    });
    if (isError) {
        const status = getStatusCode(error);
        return <ErrorPage status={status} />
    }
    useEffect(() => {
        if (data) {
            setCads(data.cads);
            setTotal(data.count);
        }
    }, [data]);

    useEffect(() => {
        fetchCads();
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [search, page]);

    return (
        <div className="flex flex-col gap-y-8 mb-8">
            <h1 className="text-4xl text-center text-indigo-950 font-bold">
                {tPages('cads.title')}
            </h1>
            <section className="flex flex-wrap justify-center gap-y-8">
                <SearchBar setSearch={setSearch} />
                {!cads.length
                    ? <p className="text-lg text-indigo-900 text-center font-bold">{tPages('cads.no_cads')}</p>
                    : <ul className="basis-full grid grid-cols-3 gap-12">
                        {cads.map(cad => <CadItem key={cad.id} cad={cad} on />)}
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
    );

    async function fetchCads() {
        const requestSearchParams = objectToUrl({ ...search });
        try {
            const { data: { cads, count } } = await GetCads(requestSearchParams);
            setCads(cads);
            setTotal(count);
        } catch (e) {
            console.error(e);
        }
    }
}

export default UserCads;