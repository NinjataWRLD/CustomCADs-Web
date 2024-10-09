import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsEmailConfirmed, useUserExists } from '@/hooks/requests/identity';
import { RetryVerifyEmail } from '@/requests/public/identity';
import ErrorPage from '@/components/error-page';
import getStatusCode from '@/utils/get-status-code';

function VerifyEmailPage() {
    const { t: tPages } = useTranslation('pages');
    const { username } = useParams();
    
    const isEmailConfirmedQuery = useIsEmailConfirmed(username ?? '');
    const userExistsQuery = useUserExists(username ?? '');

    if (isEmailConfirmedQuery.isError) {
        const status = getStatusCode(isEmailConfirmedQuery.error);
        return <ErrorPage status={status} />
    }
    
    if ((userExistsQuery.data !== undefined && !userExistsQuery.data) || isEmailConfirmedQuery.data) {
        return <ErrorPage status={400} />;
    }

    const sendVerificationEmail = async () => {
        try {
            await RetryVerifyEmail(username ?? '');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="my-20 flex flex-col gap-y-4">
            <h1 className="text-3xl text-center font-bold">
                {tPages('register.verify-title')}
            </h1>
            <h3 className="text-xl text-center">
                <span>{tPages('register.when_verified')} </span>
                <button onClick={() => window.location.reload()} className="hover:underline">{tPages('register.refresh_page')}</button>.
            </h3>
            <p className="text-center">
                <span>{tPages('register.no_email')}? </span>
                <button
                    onClick={sendVerificationEmail}
                    className="bg-indigo-200 ms-2 px-2 py-1 rounded border-2 border-indigo-400 hover:bg-indigo-300 active:opacity-80"
                >
                    {tPages('register.send_another')}
                </button>
            </p>
        </div>
    );
}

export default VerifyEmailPage;