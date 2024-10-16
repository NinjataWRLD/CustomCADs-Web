import { useState, useEffect, Dispatch, SetStateAction, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetCategories } from '@/hooks/requests/categories';
import { useGetSortings } from '@/hooks/requests/home';
import Input from './fields/input';
import Select from './fields/select';
import Category from '@/interfaces/category';

interface Search {
    name: string
    category: string
    sorting: string
}

interface SearchBarProps {
    setSearch: Dispatch<SetStateAction<Search>>
}

function SearchBar({ setSearch }: SearchBarProps) {
    const { t: tCommon } = useTranslation('common');
    const [sortings, setSortings] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [copySearch, setCopySearch] = useState<Search>({ name: '', category: '', sorting: '' });
    
    const categoriesQuery = useGetCategories();
    useEffect(() => {
        if (categoriesQuery.data) {
            setCategories(categoriesQuery.data);
        }
    }, [categoriesQuery.data]);

    const sortingsQuery = useGetSortings();
    useEffect(() => {
        if (sortingsQuery.data) {
            setSortings(sortingsQuery.data);
        }
    }, [sortingsQuery.data]);

    useEffect(() => {
        handleSearch();
    }, [copySearch]);

    const handleInput = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLSelectElement>) => {
        setCopySearch(search => ({ ...search, [e.currentTarget.name]: e.currentTarget.value } ));
    }

    const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
        if (e) {
            e.preventDefault();
        }
        setSearch(oldQuery => ({ ...oldQuery, ...copySearch }));
    };

    const categoryMap = (category: Category) =>
        <option key={category.id} value={category.name}>
            {tCommon(`categories.${category.name}`)}
        </option>;

    const sortingMap = (sorting: string) =>
        <option key={sorting} value={sorting}>
            {tCommon(`sortings.${sorting}`)}
        </option>;

    return (
        <div className="basis-full bg-indigo-400 py-8 rounded-lg border-2 border-indigo-600 shadow-xl shadow-indigo-300">
            <form onSubmit={handleSearch} method="get" autoComplete="off">
                <div className="flex flex-wrap justify-center items-center gap-y-5">
                    <div className="basis-full flex justify-evenly">
                        <div className="basis-1/4 bg-indigo-200 text-indigo-800 border border-indigo-700 py-2 rounded-md text-center">
                            <Select
                                id="category"
                                label={tCommon('searchbar.category')}
                                name="category"
                                value={copySearch.category}
                                onInput={handleInput}
                                items={categories}
                                defaultOption={tCommon('categories.All')}
                                onMap={categoryMap}
                                className="bg-indigo-50 border border-indigo-700 text-indigo-900 py-2 px-1 pe-2 rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="basis-1/4 bg-indigo-100 rounded-md overflow-hidden flex gap-x-2 items-center px-3 py-2 border border-indigo-700">
                            <Input
                                id="name"
                                name="name"
                                type="search"
                                value={copySearch.name}
                                onInput={handleInput}
                                placeholder={tCommon('searchbar.search_name')}
                                className="w-full h-full bg-inherit text-inherit text-center focus:outline-none"
                            />
                            <button>
                                <FontAwesomeIcon icon="search" className="text-lg mt-1 text-indigo-600" />
                            </button>
                        </div>
                        <div className="basis-1/4 bg-indigo-200 text-indigo-800 border border-indigo-700 py-2 rounded-md text-center">
                            <Select
                                id="sorting"
                                label={tCommon('searchbar.sort_by')}
                                name="sorting"
                                value={copySearch.sorting}
                                onInput={handleInput}
                                items={sortings}
                                onMap={sortingMap}
                                className="bg-indigo-50 border border-indigo-700 text-indigo-900 py-2 px-1 pe-2 rounded-md focus:outline-none"
                            />
                        </div>
                    </div>
                    <button className="hidden bg-indigo-200 py-1 px-4 rounded">{tCommon('searchbar.Search')}</button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;