import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/requests/identity';
import useAuth from '@/hooks/useAuth';
import ILogin from '@/interfaces/login';
import Input from '@/components/fields/input';
import Password from '@/components/fields/password';
import AnimatedPage from '@/components/animated-page';
import { getCookie } from '@/utils/cookie-manager';
import getStatusCode from '@/utils/get-status-code';
import loginValidations from './login-validations';

function LoginPage() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { t: tCommon } = useTranslation('common');
    const { t: tPages } = useTranslation('pages');
    const [rememberMe, setRememberMe] = useState(false);
    const { register, formState, handleSubmit, watch } = useForm<ILogin>({ mode: 'onTouched' });
    const { username, password } = loginValidations();
    const loginMutation = useLogin();

    let seconds: number = 0;
    const onSubmit = async (user: ILogin) => {
        const dto = { ...user, rememberMe };
        await loginMutation.mutateAsync({ user: dto });
        seconds = loginMutation.data?.data.seconds ?? 0;

        setIsAuthenticated(true);
        navigate(`/${getCookie('role')?.toLowerCase()}`);
    }

    if (loginMutation.isError) {
        const status = getStatusCode(loginMutation.error);
        switch (status) {
            case 401: alert(tCommon('errors.sign_in_error')); break;
            case 423: alert(tCommon('errors.locked_out_error', { seconds: seconds })); break;
            default: break;
        }
    }

    return (
        <AnimatedPage>
            <section className="flex flex-col gap-y-4 items-center">
                <h1 className="my-6 text-4xl text-center font-bold ">
                    {tPages('login.title')}
                </h1>
                <div className="w-6/12 px-12 pt-8 pb-6 bg-indigo-400 rounded-lg border-2 border-indigo-600 shadow-md shadow-indigo-500">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-col gap-y-4">
                            <Input
                                id="username"
                                label={tCommon('labels.username')}
                                rhfProps={register('username', username)}
                                placeholder={tCommon('placeholders.username')}
                                error={formState.errors.username}
                                isRequired
                            />
                            <div className="flex items-center">
                                <Password
                                    id="password"
                                    label={tCommon('labels.password')}
                                    placeholder={tCommon('placeholders.password')}
                                    rhfProps={register('password', password)}
                                    hidden={!watch('password')}
                                    error={formState.errors.password}
                                    className="basis-full text-indigo-900 focus:outline-none"
                                    isRequired
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(rm => !rm)}
                                />
                                <label htmlFor="rememberMe" className="ms-1 text-indigo-50">{tPages('login.remember_me')}</label>
                            </div>
                            <div>
                                <Link to="/login/forgot-password" className="text-indigo-900 font-bold underline-offset-2 underline hover:italic">
                                    {tPages('login.forgot_password')}
                                </Link>
                            </div>
                        </div>
                        <div className="pt-2 flex justify-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 text-indigo-50 py-2 px-4 rounded hover:bg-indigo-700"
                            >
                                {tPages('login.log_in')}
                            </button>
                        </div>
                    </form>
                </div>
                <section className="">
                    <button className="">
                        <p>{tPages("login.go_to_register")}</p>
                        <Link to="/register" className="text-center font-bold text-indigo-700">
                            {tPages('login.register')}
                        </Link>
                    </button>
                </section>
            </section>
        </AnimatedPage>
    );
}

export default LoginPage;