import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePagination from '@/hooks/usePagination';
import objectToUrl from '@/utils/object-to-url';
import { GetOrders, DeleteOrder } from '@/requests/private/orders';
import SearchBar from '@/components/searchbar';
import Pagination from '@/components/pagination';
import ErrorPage from '@/components/error-page';
import PendingOrder from './components/pending-order';
import BegunOrder from './components/begun-order';
import FinishedOrder from './components/finished-order';

function UserOrders() {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const { status } = useLoaderData();
    const [search, setSearch] = useState({ name: '', category: '', sorting: '' });
    const [total, setTotal] = useState(0);
    const { page, limit, handlePageChange } = usePagination(total, 12);

    const isPending = status === 'Pending';
    const isBegun = status === 'Begun';
    const isFinished = status === 'Finished';

    if (!(isPending || isBegun || isFinished)) {
        return <ErrorPage status={404} />
    }

    useEffect(() => {
        fetchOrders();
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [status, search, page]);

    const handleDelete = async (id) => {
        if (confirm(t('private.orders.alert_delete'))) {
            try {
                await DeleteOrder(id);
                fetchOrders();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const chooseOrder = (order) => {
        if (isPending) return <PendingOrder order={order} onDelete={() => handleDelete(order.id)} />;
        if (isBegun) return <BegunOrder order={order} onDelete={() => handleDelete(order.id)} />;
        if (isFinished) return <FinishedOrder order={order} />;
    };

    return (
        <div className="flex flex-wrap justify-center gap-y-8 mt-4 mb-8">
            <div className="basis-full flex flex-col gap-y-[0.4px]"> 
                <h2 className="px-4 text-2xl text-indigo-950">
                    <div className="flex justify-between items-center rounded-t-xl border-4 border-indigo-700 overflow-hidden bg-indigo-500 text-center font-bold">
                        <Link to="/client/orders/pending"
                            className={`basis-1/3 bg-indigo-300 py-4 hover:no-underline ${isPending ? 'font-extrabold bg-indigo-500 text-indigo-50' : ''}`}
                        >
                            {t('private.orders.pending_title')}
                        </Link>
                        <Link to="/client/orders/begun"
                            className={`basis-1/3 bg-indigo-300 py-4 border-x-2 border-indigo-700 hover:no-underline ${isBegun ? 'font-extrabold bg-indigo-500 text-indigo-50' : ''}`}
                        >
                            {t('private.orders.begun_title')}
                        </Link>
                        <Link to="/client/orders/finished"
                            className={`basis-1/3 bg-indigo-300 py-4 hover:no-underline ${isFinished ? 'font-extrabold bg-indigo-500 text-indigo-50' : ''}`}
                        >
                            {t('private.orders.finished_title')}
                        </Link>
                    </div>
                </h2>
                <SearchBar setSearch={setSearch} />
            </div>
            {!orders.length ?
                <p className="text-lg text-indigo-900 text-center font-bold">{t('private.orders.no_orders')}</p>
                : <ul className="basis-full grid grid-cols-12 gap-x-16 gap-y-12">
                    {orders.filter(o => o.status.toLowerCase() === status.toLowerCase()).map(order =>
                        <li key={order.id} className="col-span-6">{chooseOrder(order)}</li>)}
                </ul>}
            <div className="basis-full" hidden={!orders.length}>
                <Pagination
                    page={page}
                    limit={limit}
                    onPageChange={handlePageChange}
                    total={total}
                />
            </div>
        </div>
    );

    async function fetchOrders() {
        const requestSearchParams = objectToUrl({ ...search, page, limit });
        try {
            const { data: { orders, count } } = await GetOrders(status, requestSearchParams);
            setOrders(orders);
            setTotal(count);
        } catch (e) {
            console.error(e);
        }
    }
}

export default UserOrders;