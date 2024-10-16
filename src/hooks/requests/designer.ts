import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetCadsByStatus, PatchCadStatus, GetOrdersByStatus, GetOngoingOrder, GetRecentOrders, GetUncheckedCad, BeginOrder, ReportOrder, CancelOrder, FinishOrder } from '@/requests/private/designer';

const useGetCadsByStatus = (search: string) => useQuery({
    queryKey: ['get-cads-by-status'],
    queryFn: async () => {
        const { data } = await GetCadsByStatus(search);
        return data;
    }
});

const useGetOrdersByStatus = (action: string, search: string) => useQuery({
    queryKey: ['get-orders-by-status'],
    queryFn: async () => {
        const { data } = await GetOrdersByStatus(action, search);
        return data;
    }
});

const useGetOngoingOrder = (id: number) => useQuery({
    queryKey: ['GetOngoingOrder'],
    queryFn: async () => {
        const { data } = await GetOngoingOrder(id);
        return data;
    }
});

const useGetRecentOrders = (status: string) => useQuery({
    queryKey: ['GetRecentOrders'],
    queryFn: async () => {
        const { data } = await GetRecentOrders(status);
        return data;
    }
});

const useGetUncheckedCad = (id: number) => useQuery({
    queryKey: ['GetUncheckedCad'],
    queryFn: async () => {
        const { data } = await GetUncheckedCad(id);
        return data;
    }
});

interface PatchCadStatusProps { id: number, status: string };
const usePatchCadStatus = () => useMutation<AxiosResponse, Error, PatchCadStatusProps>({
    mutationKey: ['PatchCadStatus'],
    mutationFn: (data) => PatchCadStatus(data.id, data.status)
});

interface BeginOrderProps { id: number };
const useBeginOrder = () => useMutation<AxiosResponse, Error, BeginOrderProps>({
    mutationKey: ['BeginOrder'],
    mutationFn: (data) => BeginOrder(data.id)
});

interface ReportOrderProps { id: number };
const useReportOrder = () => useMutation<AxiosResponse, Error, ReportOrderProps>({
    mutationKey: ['ReportOrder'],
    mutationFn: (data) => ReportOrder(data.id)
});

interface CancelOrderProps { id: number };
const useCancelOrder = () => useMutation<AxiosResponse, Error, CancelOrderProps>({
    mutationKey: ['CancelOrder'],
    mutationFn: (data) => CancelOrder(data.id)
});

interface FinishOrderProps { id: number, cadId: number };
const useFinishOrder = () => useMutation<AxiosResponse, Error, FinishOrderProps>({
    mutationKey: ['FinishOrder'],
    mutationFn: (data) => FinishOrder(data.id, data.cadId)
});


export { useGetCadsByStatus, usePatchCadStatus, useGetOrdersByStatus, useGetOngoingOrder, useGetRecentOrders, useGetUncheckedCad, useBeginOrder, useReportOrder, useCancelOrder, useFinishOrder };