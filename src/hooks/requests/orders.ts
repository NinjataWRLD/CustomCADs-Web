import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetOrders, GetRecentOrders, GetOrdersCounts, GetOrder, DownloadOrderCad, PostOrder, OrderExisting, PutOrder, PatchOrder, DeleteOrder } from '@/requests/private/orders';

const useGetOrders = (status: string, search: string) => useQuery({
    queryKey: ['get-orders'],
    queryFn: async () => {
        const { data } = await GetOrders(status, search);
        return data;
    }
});

const useGetRecentOrders = () => useQuery({
    queryKey: ['get-recent-orders'],
    queryFn: async () => {
        const { data } = await GetRecentOrders();
        return data;
    }
});
const useGetOrdersCounts = () => useQuery({
    queryKey: ['get-orders-counts'],
    queryFn: async () => {
        const { data } = await GetOrdersCounts();
        return data;
    }
});
const useGetOrder = (id: number) => useQuery({
    queryKey: ['get-order'],
    queryFn: async () => {
        const { data } = await GetOrder(id);
        return data;
    }
});
const useDownloadOrderCad = (id: number) => useQuery({
    queryKey: ['download-order-cad'],
    queryFn: async () => {
        const { data } = await DownloadOrderCad(id);
        return data;
    }
});

interface OrderForm {
    name: string
    description: string
    categoryId: number
}

interface PostOrderProps { order: OrderForm };
const usePostOrder = () => useMutation<AxiosResponse, Error, PostOrderProps>({
    mutationKey: ['post-order'],
    mutationFn: (data) => PostOrder(data.order)
});

interface OrderExistingProp { id: number };
const useOrderExisting = () => useMutation<AxiosResponse, Error, OrderExistingProp>({
    mutationKey: ['order-existing'],
    mutationFn: (data) => OrderExisting(data.id)
});

interface PutOrderProps { id: number, order: OrderForm };
const usePutOrder = () => useMutation<AxiosResponse, Error, PutOrderProps>({
    mutationKey: ['put-order'],
    mutationFn: (data) => PutOrder(data.id, data.order)
});

interface PatchOrderProps { id: number, shouldBeDelivered: boolean };
const usePatchOrder = () => useMutation<AxiosResponse, Error, PatchOrderProps>({
    mutationKey: ['patch-order'],
    mutationFn: (data) => PatchOrder(data.id, data.shouldBeDelivered)
});

interface DeleteOrderProps { id: number };
const useDeleteOrder = () => useMutation<AxiosResponse, Error, DeleteOrderProps>({
    mutationKey: ['delete-order'],
    mutationFn: (data) => DeleteOrder(data.id)
});


export { useGetOrders, useGetRecentOrders, useGetOrdersCounts, useGetOrder, useDownloadOrderCad, usePostOrder, useOrderExisting, usePutOrder, usePatchOrder, useDeleteOrder };