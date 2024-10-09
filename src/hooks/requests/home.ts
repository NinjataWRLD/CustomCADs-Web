import { useQuery } from '@tanstack/react-query';
import { GetHomeCad, Gallery, GalleryDetails, GetSortings } from '@/requests/public/home';

const useGetHomeCad = () => useQuery({
    queryKey: ['main-cad'],
    queryFn: async () => {
        const { data } = await GetHomeCad();
        return data;
    }
});

const useGallery = (searchParams: string) => useQuery({
    queryKey: ['main-cad'],
    queryFn: async () => {
        const { data } = await Gallery(searchParams);
        return data;
    }
});

const useGalleryDetails = (id: number) => useQuery({
    queryKey: ['gallery-details'],
    queryFn: async () => {
        const { data } = await GalleryDetails(id);
        return data;
    }
});

const useGetSortings = () => useQuery({
    queryKey: ['sortings'],
    queryFn: async () => {
        const { data } = await GetSortings();
        return data;
    }
});

export { useGetHomeCad, useGallery, useGalleryDetails, useGetSortings };