import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { GetCad, PutCad, PatchCad, DeleteCad } from '@/requests/private/cads';
import Category from '@/interfaces/category';
import useAuth from '@/hooks/useAuth';
import useCategories from '@/hooks/useCategories';
import ThreeJS from '@/components/cads/three';
import { dateToMachineReadable } from '@/utils/date-manager';
import ErrorPage from '@/components/error-page';
import ICoordinates from '@/interfaces/coordinates';
import getStatusCode from '@/utils/get-status-code';
import CadDetailsCad, { emptyCadDetailsCad } from './cad-details.interface';

interface SavePositionEvent {
    camCoords: ICoordinates
    panCoords: ICoordinates
}

interface CadForm {
    name: string
    description: string
    categoryId: number
    price: number
    image: FileList | null
}
const emptyForm: CadForm = {
    name: '',
    description: '',
    categoryId: 0,
    price: 0,
    image: null,
}


function EditCadPage() {
    const { userRole } = useAuth();
    const { t: tPages } = useTranslation('pages');
    const { t: tCommon } = useTranslation('common');
    const navigate = useNavigate();
    const { id } = useParams();

    let categories: Category[] = [];
    const { data: categoriesData, isError: categoriesIsError, error: categoriesError } = useCategories();
    if (categoriesIsError) {
        const status = getStatusCode(categoriesError);
        return <ErrorPage status={status} />;
    }
    if (categoriesData) {
        categories = categoriesData;
    }

    const [cad, setCad] = useState<CadDetailsCad>(emptyCadDetailsCad);
    const [oldCad, setOldCad] = useState<CadForm>(emptyForm);
    const { data: cadData, isError: cadIsError, error: cadError } = useQuery({
        queryKey: ['cad-details', id],
        queryFn: async () => {
            const { data } = await GetCad(Number(id));
            return data;
        }
    });
    if (cadIsError) {
        const status = getStatusCode(cadError);
        return <ErrorPage status={status} />;
    }

    const { register, watch, reset, handleSubmit } = useForm<CadForm>({ defaultValues: emptyForm });
    useEffect(() => {
        if (cadData) {
            setCad(cadData);
            setOldCad({ name: cadData.name, description: cadData.description, categoryId: cadData.category.id, price: cadData.price, image: null });
        }
    }, [cadData, reset]);

    useEffect(() => {
        if (JSON.stringify(oldCad) !== JSON.stringify(emptyForm)) {
            reset(oldCad);
        }
    }, [oldCad]);
    const [isEditing, setIsEditing] = useState(false);
    const [isPositionChanged, setIsPositionChanged] = useState(false);

    useEffect(() => {
        const newVal = watch();
        const oldVal = oldCad;

        if (newVal && oldVal) {
            const nameIsChanged = newVal.name.trim() !== oldVal.name;
            const descriptionIsChanged = newVal.description.trim() !== oldVal.description;
            const categoryIdIsChanged = Number(newVal.categoryId) !== oldVal.categoryId;
            const priceIsChanged = Number(newVal.price) !== oldVal.price;
            const imageIsChanged = newVal.image?.item(0) != oldVal.image;

            setIsEditing(nameIsChanged || descriptionIsChanged || categoryIdIsChanged || priceIsChanged || imageIsChanged);
        }
    }, [cadData, watch()]);

    useEffect(() => {
        const flipIsChanged = () => {
            setIsPositionChanged(true);
        };
        window.addEventListener('PositionChanged', flipIsChanged);

        const sendTrackChangesEvent = () => window.dispatchEvent(new CustomEvent("TrackChanges"));

        const savePosition = async (e: CustomEvent<SavePositionEvent>) => {
            const { camCoords, panCoords } = e.detail;

            try {
                await PatchCad(Number(id), 'camera', camCoords);
                await PatchCad(Number(id), 'pan', panCoords);

                setIsPositionChanged(false);
                setTimeout(sendTrackChangesEvent, 1500);
            } catch (e) {
                console.error(e);
            }
        };
        window.addEventListener('SavePosition', e => savePosition(e as CustomEvent<SavePositionEvent>));

        let sendTrackChangesId: number;
        const resetPosition = async () => {
            setIsPositionChanged(false);
            sendTrackChangesId = setTimeout(sendTrackChangesEvent, 1500);
        };
        window.addEventListener('ResetPosition', resetPosition);

        return () => {
            window.removeEventListener('PositionChanged', flipIsChanged);
            window.removeEventListener('SavePosition', e => savePosition(e as CustomEvent<SavePositionEvent>));
            window.addEventListener('ResetPosition', resetPosition);
            clearTimeout(sendTrackChangesId);
        };
    }, []);

    const onSubmit = async (cad: CadForm) => {
        try {
            const dto = {
                name: cad.name,
                description: cad.description,
                categoryId: cad.categoryId,
                price: cad.price,
                image: cad.image?.item(0)
            };
            await PutCad(Number(id), dto);

            setIsEditing(false);
            reset(cad || {});
            setOldCad(cad);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async () => {
        if (confirm(tPages('cads.confirmation'))) {
            try {
                await DeleteCad(Number(id));
                navigate(`/${userRole?.toLowerCase()}/cads`);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="mb-4 flex justify-between">
                <div className={`flex gap-x-4 ${isPositionChanged ? '' : ' invisible'}`}>
                    <button className={`${isPositionChanged ? '' : 'invisible'} bg-indigo-700 text-indigo-50 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-600 active:opacity-90`}
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('SendPosition'))}
                    >
                        {tPages('cads.update_position')}
                    </button>
                    <button className={`${isPositionChanged ? '' : 'invisible'} bg-indigo-200 text-indigo-800 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-300 active:opacity-80`}
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('ResetPosition'))}
                    >
                        {tPages('cads.reset_position')}
                    </button>
                </div>
                <div className="flex justify-center items-center gap-x-8">
                    <h1 className="text-4xl text-center text-indigo-950 font-bold">CAD #{id}</h1>
                </div>
                <div className={`flex gap-x-4 ${isEditing ? '' : ' invisible'}`}>
                    <button className={`${isEditing ? '' : 'invisible'} bg-indigo-200 text-indigo-800 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-300 active:opacity-80`}
                        type="button"
                        onClick={() => reset(oldCad)}
                    >
                        {tPages('cads.revert_changes')}
                    </button>
                    <button className={`${isEditing ? '' : 'invisible'} bg-indigo-700 text-indigo-50 font-bold py-3 px-6 rounded-lg border border-indigo-700 shadow shadow-indigo-950 hover:bg-indigo-600 active:opacity-90`}
                        type="submit"
                    >
                        {tPages('cads.save_changes')}
                    </button>
                </div>
            </div>
            <div className="flex bg-indigo-300 rounded-md overflow-hidden border-4 border-indigo-700 shadow-lg shadow-indigo-400">
                <div className="flex justify-center items-center px-8">
                    <div className="bg-indigo-200 w-80 h-80 rounded-xl">
                        <ThreeJS cad={cad} />
                    </div>
                </div>
                <div className="grow bg-indigo-500 text-indigo-50 flex flex-col">
                    <header className="flex gap-x-2 px-4 py-4 text-center text-xl font-bold">
                        <select
                            {...register('categoryId')}
                            className="bg-indigo-200 text-indigo-700 px-3 py-3 rounded-xl font-bold focus:outline-none border-2 border-indigo-400 shadow-lg shadow-indigo-900"
                        >
                            {categories.map(category =>
                                <option key={category.id} value={category.id} className="bg-indigo-50" >
                                    {tCommon(`categories.${category.name}`)}
                                </option>)}
                        </select>
                        <input
                            {...register('name')}
                            className="grow bg-indigo-200 text-indigo-700 text-3xl text-center fontextrabold focus:outline-none py-2 rounded-xl border-4 border-indigo-400 shadow-lg shadow-indigo-900"
                        />
                        <label className="basis-2/12 flex gap-x-1 items-center bg-indigo-200 text-indigo-700 rounded-xl px-2 py-2 border-4 border-indigo-300 shadow-md shadow-indigo-950">
                            <input
                                type="number"
                                {...register('price', { max: 9999 })}
                                className="hide-spinner w-full text-end bg-inherit focus:outline-none"
                            />$
                        </label>
                    </header>
                    <hr className="border-t-2 border-indigo-700" />
                    <section className="m-4 flex flex-wrap gap-y-1 bg-indigo-200 rounded-xl border-2 border-indigo-700 shadow-lg shadow-indigo-900 px-4 py-4">
                        <label className="w-full flex justify-between text-indigo-900 text-lg font-bold">
                            <span>{tCommon('labels.description')}</span>
                            <sub className="opacity-50 text-indigo-950 font-thin">
                                {tPages('cads.hint')}
                            </sub>
                        </label>
                        <textarea
                            rows={5}
                            {...register('description', { maxLength: 750, minLength: 5 })}
                            className="w-full h-auto bg-inherit text-indigo-700 focus:outline-none resize-none"
                        />
                    </section>
                    <hr className="border-t-4 border-indigo-700" />
                    <footer className="px-4 py-3 basis-full flex justify-between items-center">
                        <div className="flex justify-center">
                            <label htmlFor="image" className="flex justify-around gap-x-4 items-center bg-indigo-300 px-4 py-1 rounded-md shadow-lg shadow-indigo-900">
                                <p className="text-indigo-50 font-bold">{tCommon('labels.image')}</p>
                                <div className="flex justify-center gap-x-4 bg-indigo-700 rounded-xl py-2 px-4 border-2 border-indigo-400">
                                    <FontAwesomeIcon icon="arrow-up-from-bracket" className="text-xl text-indigo-100" />
                                    <div className={`${watch('image')?.length ? 'font-bold flex items-center' : 'hidden'}`}>
                                        <span className="text-indigo-50 w-24 truncate">{watch('image')?.item(0)?.name ?? ''}</span>
                                    </div>
                                </div>
                            </label>
                            <input
                                id="image"
                                {...register('image')}
                                type="file"
                                accept=".jpg,.png"
                                hidden
                            />
                        </div>
                        <div>
                            <span className="font-semibold">{tPages('cads.created_on')}: </span>
                            <time dateTime={dateToMachineReadable(cad.creationDate)} className="italic">
                                {cad.creationDate}
                            </time>
                        </div>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="basis-2/12 text-indigo-950 bg-indigo-200 py-2 rounded-md hover:text-indigo-50 hover:bg-red-500 border-2 border-indigo-700"
                        >
                            {tPages('cads.delete')}
                        </button>
                    </footer>
                </div>
            </div>
        </form>
    );
}

export default EditCadPage;