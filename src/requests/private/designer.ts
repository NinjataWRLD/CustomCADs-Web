import axios from '../axios';

const GetCadsByStatus = async (searchParams: string) => {
    return await axios.get(`/API/Designer/Cads?${searchParams}`);
};

const PatchCadStatus = async (id: number, status: string) => {
    return await axios.patch(`/API/Designer/Cads/${id}?status=${status}`, {});
};

const GetOrdersByStatus = async (action: string, searchParams: string) => {
    return await axios.get(`/API/Designer/Orders?action=${action}&${searchParams}`);
};

const GetOngoingOrder = async (id: number) => {
    return await axios.get(`/API/Designer/Orders/${id}`);
};

const GetRecentOrders = async (status: string) => {
    return await axios.get(`/API/Designer/Orders/Recent?status=${status}`);
};

const GetUncheckedCad = async (id: number) => {
    return await axios.get(`/API/Designer/Cads/${id}`);
};

const BeginOrder = async (id: number) => {
    return await axios.patch(`/API/Designer/Orders/${id}`, { action: 'Begin' });
};

const ReportOrder = async (id: number) => {
    return await axios.patch(`/API/Designer/Orders/${id}`, { action: 'Report' });
};

const CancelOrder = async (id: number) => {
    return await axios.patch(`/API/Designer/Orders/${id}`, { action: 'Cancel' });
};

const FinishOrder = async (id: number, cadId: number) => {
    return await axios.patch(`/API/Designer/Orders/${id}`, { action: 'Finsih', cadId: cadId });
};

export { GetCadsByStatus, PatchCadStatus, GetOrdersByStatus, GetOngoingOrder, GetRecentOrders, GetUncheckedCad, BeginOrder, ReportOrder, CancelOrder, FinishOrder };