import { RouteObject } from 'react-router-dom';
import AuthGuard from '@/routing/auth-guard';
import DesignerHomePage from '@/pages/designer/designer-home/designer-home';
import UserCadsPage from '@/pages/contributor/user-cads/cads';
import CadDetailsPage from '@/pages/contributor/cad-details/cad-details';
import UploadCadPage from '@/pages/contributor/upload-cad/upload-cad';
import OngoingOrders from '@/pages/designer/ongoing-orders/ongoing-orders';
import OngoingOrderDetails from '@/pages/designer/ongoing-order-details/ongoing-order-details';
import UncheckedCads from '@/pages/designer/unchecked-cads/unchecked-cads';
import UncheckedCadDetails from '@/pages/designer/unchecked-cad-details/unchecked-cad-details';

const designerRoutes: RouteObject = {
    element: <AuthGuard auth="private" role="Designer" />,
    children: [
        {
            path: '/designer',
            element: <DesignerHomePage />
        },
        {
            path: '/designer/cads',
            element: <UserCadsPage />
        },
        {
            path: '/designer/cads/:id',
            element: <CadDetailsPage />
        },
        {
            path: '/designer/cads/upload',
            element: <UploadCadPage />
        },
        {
            path: '/designer/cads/upload/:id',
            element: <UploadCadPage />
        },
        {
            path: '/designer/cads/unchecked',
            element: <UncheckedCads />
        },
        {
            path: '/designer/cads/unchecked/:id',
            element: <UncheckedCadDetails />
        },
        {
            path: '/designer/orders/:status',
            element: <OngoingOrders />
        },
        {
            path: '/designer/orders/:status/:id',
            element: <OngoingOrderDetails />
        },
    ]
};
export default designerRoutes;