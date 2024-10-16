import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { IsEmailConfirmed, RetryVerifyEmail, UserExists } from '@/requests/public/identity';
import ErrorPage from '@/components/error-page';
import getStatusCode from '@/utils/get-status-code';
import AnimatedPage from '@/components/animated-page';

function VerifyEmailPage() {
    const { t: tPages } = useTranslation('pages');
    const { username } = useParams();

    const { data: isEmailConfirmed, isError: iecIsError, error: iecError } = useQuery({
        queryKey: ['verify-email', 'email-confirmed', username],
        queryFn: async () => {
            const { data } = await IsEmailConfirmed(username ?? '');
            return data;
        }
    });
    if (iecIsError) {
        const status = getStatusCode(iecError);
        return <ErrorPage status={status} />
    }

    const { data: userExists, isError: ueIsError, error: ueError } = useQuery({
        queryKey: ['verify-email', 'user-exists', username],
        queryFn: async () => {
            const { data } = await UserExists(username ?? '');
            return data;
        }
    });
    if (ueIsError) {
        const status = getStatusCode(ueError);
        return <ErrorPage status={status} />
    }

    if ((userExists !== undefined && !userExists)
        || (isEmailConfirmed !== undefined && isEmailConfirmed)) {
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
        <AnimatedPage>
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
        </AnimatedPage>
    );
}

export default VerifyEmailPage;