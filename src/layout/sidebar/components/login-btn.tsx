import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SidebarBtn from './sidebar-btn';

function LoginBtn() {
    const { t: tLayout } = useTranslation('layout');

    return (
        <Link to="/login">
            <SidebarBtn icon="user-secret" text={tLayout("header.login")} />
        </Link>
    )
}

export default LoginBtn;