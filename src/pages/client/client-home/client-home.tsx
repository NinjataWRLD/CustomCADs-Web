import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query';
import { useGetRecentOrders, useGetOrdersCounts } from '@/hooks/requests/orders';
import RecentItem from '@/components/dashboard/recent-item';
import OrdersCount from '@/components/dashboard/count-item';
import ErrorPage from '@/components/error-page';
import getStatusCode from '@/utils/get-status-code';
import ClientHomeOrder from './client-home.interface';

interface CountByStatus {
    pending: number
    begun: number
    finished: number
    reported: number
    removed: number
}
const emptyCountByStatus: CountByStatus = {
    pending: 0, 
    begun: 0, 
    finished: 0, 
    reported: 0, 
    removed: 0,
};

function ClientHome() {
    const { t: tCommon } = useTranslation('common');
    const { t: tPages } = useTranslation('pages');

    const [orders, setOrders] = useState<ClientHomeOrder[]>([]);
    const recentOrdersQuery = useGetRecentOrders();
    useEffect(() => {
        if (recentOrdersQuery.data) {
            setOrders(recentOrdersQuery.data);
        }
    }, [recentOrdersQuery.data]);

    const [counts, setCounts] = useState<CountByStatus>(emptyCountByStatus);
    const countsQuery = useGetOrdersCounts();
    useEffect(() => {
        if (countsQuery.data) {
            setCounts(countsQuery.data);
        }
    }, [countsQuery.data]);

    if (recentOrdersQuery.isError) {
        const status = getStatusCode(recentOrdersQuery.error);
        return <ErrorPage status={status} />
    }
    if (countsQuery.isError) {
        const status = getStatusCode(countsQuery.error);
        return <ErrorPage status={status} />
    }

    return (
        <div className="flex flex-col gap-y-6 my-2">
            <div>
                <h1 className="text-3xl text-center text-indigo-950 font-bold">
                    {tPages('orders.home_title')}
                </h1>
                <hr className="mt-2 border-2 border-indigo-700" />
            </div>
            <div className="flex flex-wrap gap-x-8">
                <div className="basis-1/3 grow flex flex-col gap-y-4">
                    <h2 className="text-2xl text-indigo-950 text-center font-bold">
                        {tPages('orders.home_subtitle_1')}
                    </h2>
                    <ol className="grid grid-rows-5 gap-y-3 border-4 border-indigo-500 pt-3 pb-2 px-6 rounded-2xl bg-indigo-100">
                        <li key={0} className="px-2 pb-2 border-b-2 border-indigo-900 rounded">
                            <div className="flex items-center gap-x-4 font-bold">
                                <span className="basis-1/6">{tCommon('labels.name')}</span>
                                <div className="grow">
                                    <div className="flex justify-between items-center px-4 py-2">
                                        <p className="basis-1/3 text-start">{tCommon('labels.category')}</p>
                                        <p className="basis-1/3 text-center">{tCommon('labels.order_date')}</p>
                                        <p className="basis-1/3 text-end">{tCommon('labels.status')}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        {orders.map(order => <li key={order.id}>
                            <RecentItem
                                item={order}
                                date={order.orderDate}
                                to={order.status.toLowerCase() === 'pending'
                                    ? `/client/orders/pending/${order.id}`
                                    : `/client/orders/${order.status.toLowerCase()}`}
                            />
                        </li>)}
                    </ol>
                </div>
                <div className="min-h-full basis-1/4 flex flex-col gap-y-4">
                    <h2 className="text-2xl text-indigo-950 text-center font-bold">
                        {tPages('orders.home_subtitle_2')}
                    </h2>
                    <ul className="basis-full flex flex-col justify-items-center items-between border-4 border-indigo-500 rounded-2xl overflow-hidden bg-indigo-100 text-xl">
                        <OrdersCount text={`${tCommon('statuses.Pending_plural')} - ${counts.pending}`} />
                        <OrdersCount text={`${tCommon('statuses.Begun_plural')} - ${counts.begun}`} />
                        <OrdersCount text={`${tCommon('statuses.Finished_plural')} - ${counts.finished}`} />
                        <OrdersCount text={`${tCommon('statuses.Reported_plural')} - ${counts.reported}`} />
                        <OrdersCount text={`${tCommon('statuses.Removed_plural')} - ${counts.removed}`} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ClientHome;