import axios from '../axios';

const GetHomeCad = async () => {
    return await axios.get('/API/Home/MainCad');
};

const Gallery = async (searchParams: string) => {
    return await axios.get(`/API/Home/Gallery?${searchParams}`);
};

const GalleryDetails = async (id: number) => {
    return await axios.get(`/API/Home/Gallery/${id}`);
};

const GetSortings = async () => {
    return await axios.get('/API/Home/Sortings');
};

export { GetHomeCad, Gallery, GalleryDetails, GetSortings };