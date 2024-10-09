import { useMutation, useQuery } from '@tanstack/react-query';
import { GetCategories, GetCategoryById, CreateCategory, EditCategory, DeleteCategory } from '@/requests/public/categories';

const useGetCategories = () => useQuery({
    queryKey: ['get-categories'],
    queryFn: async () => {
        const { data } = await GetCategories();
        return data;
    }
});

const useGetCategoryById = (id: number) => useQuery({
    queryKey: ['get-category', id],
    queryFn: async () => {
        const { data } = await GetCategoryById(id);
        return data;
    }
});

interface CreateCategoryProps { name: string };
const useCreateCategory = () => useMutation({
    mutationKey: ['post-category'],
    mutationFn: (data: CreateCategoryProps) => CreateCategory(data.name),
});

interface EditCategoryProps { id: number, name: string };
const useEditCategory = () => useMutation({
    mutationKey: ['put-category'],
    mutationFn: (data: EditCategoryProps) => EditCategory(data.id, data.name),
});

interface DeleteCategoryProps { id: number };
const useDeleteCategory = () => useMutation({
    mutationKey: ['put-category'],
    mutationFn: (data: DeleteCategoryProps) => DeleteCategory(data.id),
});

export { useGetCategories, useGetCategoryById, useCreateCategory, useEditCategory, useDeleteCategory };