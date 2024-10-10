import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetCads, GetRecentCads, GetCadsCounts, GetCad, PostCad, PutCad, PatchCad, DeleteCad } from '@/requests/private/cads';
import Coordinates from '@/interfaces/coordinates';

const useGetCads = (search: string) => useQuery({
    queryKey: ['get-cads'],
    queryFn: async () => {
        const { data } = await GetCads(search);
        return data;
    }
});

const useGetRecentCads = (additionalKey?: string) => useQuery({
    queryKey: ['get-recent-cads', additionalKey ?? ''],
    queryFn: async () => {
        const { data } = await GetRecentCads();
        return data;
    }
});

const useGetCadsCounts = (additionalKey?: string) => useQuery({
    queryKey: ['get-cads-counts', additionalKey ?? ''],
    queryFn: async () => {
        const { data } = await GetCadsCounts();
        return data;
    }
});

const useGetCad = (id: number) => useQuery({
    queryKey: ['get-cad', id],
    queryFn: async () => {
        const { data } = await GetCad(id);
        return data;
    }
});

interface CadForm {
    name: string
    description: string
    categoryId: number
    price: number
}

interface PostCadProps { cad: CadForm, image: File, file: File, };
const usePostCad = () => useMutation<AxiosResponse, Error, PostCadProps>({
    mutationKey: ['post-cad'],
    mutationFn: (data) => PostCad({ ...data.cad, image: data.image, file: data.file })
});

interface PutCadProps { id: number, cad: CadForm };
const usePutCad = () => useMutation<AxiosResponse, Error, PutCadProps>({
    mutationKey: ['put-cad'],
    mutationFn: (data) => PutCad(data.id, data.cad)
});

interface PatchCadProps { id: number, type: string, coords: Coordinates };
const usePatchCad = () => useMutation<AxiosResponse, Error, PatchCadProps>({
    mutationKey: ['patch-cad'],
    mutationFn: (data) => PatchCad(data.id, data.type, data.coords)
});

interface DeleteCadProps { id: number };
const useDeleteCad = () => useMutation<AxiosResponse, Error, DeleteCadProps>({
    mutationKey: ['delete-cad'],
    mutationFn: (data) => DeleteCad(data.id)
});


export { useGetCads, useGetRecentCads, useGetCadsCounts, useGetCad, usePostCad, usePutCad, usePatchCad, useDeleteCad };