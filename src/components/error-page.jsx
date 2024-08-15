import AuthContext from '@/contexts/auth-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorPage({ status }) {
    const { userRole } = useContext(AuthContext);
    const { t } = useTranslation();

    let text, src, link;
    switch (status) {
        case 400:
            text = t("common.http.400");
            src = "/src/assets/errors/az.png";
            break;

        case 401:
            text = t("common.http.401");
            src = "/src/assets/errors/doggo.png";
            link = <Link to="/login">{t('common.http.authenticate')}</Link>;
            break;

        case 403:
            text = t("common.http.403");
            src = "/src/assets/errors/nikola.png";
            link = <Link to={`/info/${userRole.toLowerCase()}`}>{t('common.http.authorize')}</Link>;
            break;

        case 404:
            text = t("common.http.404");
            src = "/src/assets/errors/mickey.png";
            break;

        default:
            text = t('common.http.general');
            src = "/src/assets/errors/cowabunga.png";
            break;
    }

    return (
        <div className="flex flex-wrap gap-y-4 justify-center text-indigo-800 text-center ">
            <span className="basis-full text-2xl font-bold">{text}</span>
            <div className="basis-5/12">
                <img src={src} className="w-full h-auto" />
            </div>
            <span className="basis-full text-lg italic hover:underline">{link}</span>
        </div>
    );
}

export default ErrorPage;