import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetPublicKey, Purchase } from '@/requests/private/payment';

const useGetPublicKey = () => useQuery({
    queryKey: ['get-public-key'],
    queryFn: async () => {
        const { data } = await GetPublicKey();
        return data;
    }
});

interface PurchaseProps { id: number, paymentMethodId: string };
const usePurchase = () => useMutation<AxiosResponse, Error, PurchaseProps>({
    mutationKey: ['purchase'],
    mutationFn: (data) => Purchase(data.id, data.paymentMethodId),
});

export { useGetPublicKey, usePurchase };