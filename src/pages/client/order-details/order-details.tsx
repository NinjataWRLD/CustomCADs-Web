import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { GetOrder, PutOrder } from '@/requests/private/orders';
import Category from '@/interfaces/category';
import { useGetCategories } from '@/hooks/requests/categories';
import ErrorPage from '@/components/error-page';
import { dateToMachineReadable } from '@/utils/date-manager';
import getStatusCode from '@/utils/get-status-code';
import OrderDetailsOrder, { emptyOrderDetailsOrder } from './order-details.interface';

interface OrderForm {
    name: string,
    description: string,
    categoryId: number
}
const emptyForm: OrderForm = {
    name: '',
    description: '',
    categoryId: 0,
}

function OrderDetails() {
    const { t: tPages } = useTranslation('pages');
    const { t: tCommon } = useTranslation('common');

    const { id } = useParams();
    const [order, setOrder] = useState<OrderDetailsOrder>(emptyOrderDetailsOrder);
    const [oldOrder, setOldOlder] = useState<OrderForm>(emptyForm);

    let categories: Category[] = [];
    const { data: categoriesData, isError: categoriesIsError, error: categoriesError } = useGetCategories();
    if (categoriesData) {
        categories = categoriesData;
    }

    const { data: orderData, isError: orderIsError, error: orderError } = useQuery({
        queryKey: ['order-details', id],
        queryFn: async () => {
            const { data } = await GetOrder(Number(id));
            return data;
        }
    });

    const { register, watch, reset, handleSubmit } = useForm<OrderForm>({ defaultValues: emptyForm });
    useEffect(() => {
        if (orderData) {
            setOrder(orderData);
            setOldOlder({ name: orderData.name, description: orderData.description, categoryId: orderData.category.id });
        }
    }, [orderData]);

    useEffect(() => {
        if (JSON.stringify(oldOrder) !== JSON.stringify(emptyForm)) {
            reset(oldOrder);
        }
    }, [oldOrder, reset]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const oldVal = oldOrder;
        const newVal = watch();

        if (oldVal && newVal) {
            const nameIsChanged = oldVal.name !== newVal.name.trim();
            const descriptionIsChanged = oldVal.description !== newVal.description.trim();
            const categoryIdIsChanged = oldVal.categoryId !== Number(newVal.categoryId);

            setIsEditing(nameIsChanged || descriptionIsChanged || categoryIdIsChanged);
        }
    }, [orderData, watch()]);

    const onSubmit = async (order: OrderForm) => {
        try {
            await PutOrder(Number(id), order);
            setIsEditing(false);
            reset(order);
            setOldOlder(order);
        } catch (e) {
            console.error(e);
        }
    };

    if (categoriesIsError) {
        const status = getStatusCode(categoriesError);
        return <ErrorPage status={status} />
    }

    if (orderIsError) {
        const status = getStatusCode(orderError);
        return <ErrorPage status={status} />
    }

    return (
        <div className="my-2">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="flex flex-wrap gap-y-2 my-2">
                    <div className="basis-full">
                        <div className="flex justify-evenly items-center">
                            <button className={`${isEditing ? '' : 'invisible'} bg-indigo-700 text-indigo-50 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-600 active:opacity-90`}>
                                {tPages('orders.save_changes')}
                            </button>
                            <h1 className="text-4xl text-indigo-950 font-bold">{tPages('orders.order-details_title', { id: id })}</h1>
                            <button className={`${isEditing ? '' : 'invisible'} bg-indigo-200 text-indigo-800 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-300 active:opacity-80`}
                                type="button"
                                onClick={() => reset(oldOrder)}
                            >
                                {tPages('orders.revert_changes')}
                            </button>
                        </div>
                    </div>
                    <div className="basis-10/12 mx-auto text-indigo-100">
                        <div className="flex flex-wrap gap-y-8 px-8 py-4 bg-indigo-500 rounded-md border-2 border-indigo-700 shadow-lg shadow-indigo-900">
                            <header className="basis-full">
                                <div className="flex items-center justify-around">
                                    <select {...register('categoryId')}
                                        className="bg-indigo-200 text-indigo-700 px-3 py-3 rounded-xl font-bold focus:outline-none border-2 border-indigo-400 shadow-lg shadow-indigo-900"
                                    >
                                        {categories.map(category =>
                                            <option key={category.id} value={category.id} className="bg-indigo-50">
                                                {tCommon(`categories.${category.name}`)}
                                            </option>)}
                                    </select>
                                    <input {...register('name')}
                                        className="bg-indigo-400 text-3xl text-center font-bold focus:outline-none py-2 rounded-xl border-4 border-indigo-300 shadow-xl shadow-indigo-900"
                                    />
                                    <span className="bg-indigo-200 text-indigo-700 px-4 py-2 rounded-xl italic border-4 border-indigo-300 shadow-md shadow-indigo-950">
                                        {tCommon(`statuses.${order.status}`)}
                                    </span>
                                </div>
                            </header>
                            <section className="basis-full flex flex-wrap gap-y-1 bg-indigo-100 rounded-xl border-2 border-indigo-700 shadow-lg shadow-indigo-900 px-4 py-4">
                                <label className="w-full flex justify-between text-indigo-900 text-lg font-bold">
                                    <span>{tPages('orders.description')}</span>
                                    <sub className="opacity-50 text-indigo-950 font-thin">
                                        {tPages('orders.hint')}
                                    </sub>
                                </label>
                                <textarea
                                    rows={4}
                                    {...register('description', { minLength: 5, maxLength: 750 })}
                                    className="w-full h-auto bg-inherit text-indigo-700 focus:outline-none resize-none"
                                />
                            </section>
                            <footer className="basis-full flex justify-between">
                                <div className="text-start">
                                    <span className="font-semibold">{tPages('orders.ordered_by')} </span>
                                    <span className="underline underline-offset-4 italic">
                                        {order.buyerName}
                                    </span>
                                </div>
                                <div className="text-end">
                                    <span className="font-semibold">{tPages('orders.ordered_on')}</span>
                                    <time dateTime={dateToMachineReadable(order.orderDate)} className="italic">
                                        {order.orderDate}
                                    </time>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default OrderDetails;