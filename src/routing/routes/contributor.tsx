import { RouteObject } from 'react-router-dom';
import AuthGuard from '@/routing/auth-guard';
import ContributorHomePage from '@/pages/contributor/contributor-home/contributor-home';
import UserCadsPage from '@/pages/contributor/user-cads/cads';
import CadDetailsPage from '@/pages/contributor/cad-details/cad-details';
import UploadCadPage from '@/pages/contributor/upload-cad/upload-cad';

const contributorRoutes: RouteObject = {
    element: <AuthGuard auth="private" role="Contributor" />,
    children: [
        {
            path: '/contributor',
            element: <ContributorHomePage />
        },
        {
            path: '/contributor/cads',
            element: <UserCadsPage />
        },
        {
            path: '/contributor/cads/:id',
            element: <CadDetailsPage />
        },
        {
            path: '/contributor/cads/upload',
            element: <UploadCadPage />
        },
    ]
};
export default contributorRoutes;