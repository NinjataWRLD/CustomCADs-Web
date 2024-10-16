import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePagination from '@/hooks/usePagination';
import { useDeleteOrder, useGetOrders, usePatchOrder } from '@/hooks/requests/orders';
import { DownloadOrderCad } from '@/requests/private/orders';
import SearchBar from '@/components/searchbar';
import Pagination from '@/components/pagination';
import ErrorPage from '@/components/error-page';
import Tab from '@/components/tab';
import Order from '@/components/order';
import objectToUrl from '@/utils/object-to-url';
import capitalize from '@/utils/capitalize';
import getStatusCode from '@/utils/get-status-code';
import UserOrdersOrder from './orders.interface';

function UserOrders() {
    const { t: tPages } = useTranslation('pages');
    const [orders, setOrders] = useState<UserOrdersOrder[]>([]);
    const status = capitalize(useParams().status);
    const navigate = useNavigate();
    const [search, setSearch] = useState({ name: '', category: '', sorting: '' });
    const [total, setTotal] = useState(0);
    const { page, limit, handlePageChange } = usePagination(total, 3);

    const requestSearchParams = objectToUrl({ ...search, page, limit });
    const orderQuery = useGetOrders(status, requestSearchParams);

    useEffect(() => {
        orderQuery.refetch();
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [status, search, page]);

    useEffect(() => {
        if (orderQuery.data) {
            const { orders, count } = orderQuery.data;
            setOrders(orders);
            setTotal(count);
        }
    }, [orderQuery.data]);

    const deleteOrderMutation = useDeleteOrder();
    const handleDelete = async (id: number) => {
        if (confirm(tPages('orders.alert_delete'))) {
            try {
                await deleteOrderMutation.mutateAsync({ id: id });
                orderQuery.refetch();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const patchOrderMutation = usePatchOrder();
    const handleRequest = async (e: FormEvent, id: number, shouldBeDelivered: boolean) => {
        e.preventDefault();
        try {
            await patchOrderMutation.mutateAsync({ id: id, shouldBeDelivered: !shouldBeDelivered});
            await orderQuery.refetch();
        } catch (e) {
            console.error(e);
        }   
    };

    const handleDownload = async (e: FormEvent, id: number, name: string) => {
        e.preventDefault();

        try {
            const { data, headers: { 'content-type': contentType } } = await DownloadOrderCad(id);
            const blob = new Blob([data], { type: contentType });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            switch (contentType) {
                case 'model/gltf-binary': link.download = `${name}.glb`; break;
                case 'application/zip': link.download = `${name}.zip`; break;
                default: console.error('Unsupported MIME type.'); return;
            }

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download the file', error);
        }
    };

    const chooseButtons = (order: UserOrdersOrder) => {
        const mainBtn = "bg-indigo-700 border-2 border-indigo-500 py-3 rounded text-center text-indigo-50 hover:opacity-70 hover:border-transparent";
        const sideBtn = "bg-indigo-50 border-2 border-indigo-600 py-3 rounded text-center text-indigo-950 hover:bg-rose-500 hover:border-transparent hover:text-indigo-50";

        switch (status.toLowerCase()) {
            case 'pending':
                return [
                    <button onClick={() => navigate(`${order.id}`)} className={mainBtn}>
                        {tPages('orders.details')}
                    </button>,
                    <button onClick={() => handleDelete(order.id)} className={sideBtn}>
                        {tPages('orders.delete')}
                    </button>
                ];

            case 'begun':
                return [
                    <a href={`mailto:${order.designerEmail}`} className={mainBtn}>
                        {tPages('orders.contact')}
                    </a>,
                    <button onClick={() => handleDelete(order.id)} className={sideBtn}>
                        {tPages('orders.cancel_order')}
                    </button>
                ];

            case 'finished':
                return [
                    <button onClick={e => handleDownload(e, order.id, order.name)} className={mainBtn}>
                        {tPages('orders.download')}
                    </button>,
                    <button onClick={e => handleRequest(e, order.id, order.shouldBeDelivered)} className={sideBtn}>
                        {
                            order.shouldBeDelivered
                                ? tPages('orders.cancel_request')
                                : tPages('orders.request')
                        }
                    </button>
                ];
        }
        return [];
    };

    const checkStatus = (check: string) => status === check;
    if (!(checkStatus('Pending') || checkStatus('Begun') || checkStatus('Finished'))) {
        return <ErrorPage status={404} />
    }

    if (orderQuery.isError) {
        const status = getStatusCode(orderQuery.error);
        return <ErrorPage status={status} />
    }

    return (
        <div className="flex flex-wrap justify-center gap-y-12 mt-4 mb-8">
            <div className="basis-full flex flex-col">
                <h2 className="px-4 text-2xl text-indigo-950">
                    <div className="flex justify-between items-center rounded-t-xl border-4 border-b border-indigo-700 overflow-hidden bg-indigo-500 text-center font-bold">
                        <Tab to="/client/orders/pending" position='start' text={tPages('orders.pending_title')} isActive={checkStatus('Pending')} />
                        <Tab to="/client/orders/begun" position='middle' text={tPages('orders.begun_title')} isActive={checkStatus('Begun')} />
                        <Tab to="/client/orders/finished" position='end' text={tPages('orders.finished_title')} isActive={checkStatus('Finished')} />
                    </div>
                </h2>
                <SearchBar setSearch={setSearch} />
            </div>
            {!orders.length ?
                <p className="text-lg text-indigo-900 text-center font-bold">{tPages('orders.no_orders')}</p>
                : <ul className="basis-full flex flex-wrap gap-y-8">
                    {orders.map(order => <li key={order.id}>
                        <Order order={order} buttons={chooseButtons(order)} />
                    </li>)}
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
}

export default UserOrders;