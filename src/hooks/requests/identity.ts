import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Register, VerifyEmail, Login, ResetPassword, ForgotPassword, Logout, RefreshToken, IsAuthenticated, GetUserRole, IsEmailConfirmed, UserExists } from '@/requests/public/identity';
import IRegister from '@/interfaces/register';
import ILogin from '@/interfaces/login';

interface RegisterProps { role: string, user: IRegister };
const useRegister = () => useMutation<AxiosResponse<string>, Error, RegisterProps>({
    mutationKey: ['register'],
    mutationFn: (data) => Register(data.role, data.user),
});

interface VerifyEmailProps { username: string, token: string };
const useVerifyEmail = ({ username, token }: VerifyEmailProps) => useQuery({
    queryKey: ['verify-email'],
    queryFn: async () => {
        const { data } = await VerifyEmail(username, token);
        return data;
    }
});

interface LoginProps { user: ILogin };
const useLogin = () => useMutation<AxiosResponse<{ seconds: number }>, Error, LoginProps>({
    mutationKey: ['login'],
    mutationFn: (data) => Login(data.user),
});

interface ResetPasswordProps { email: string, token: string, password: string };
const useResetPassword = () => useMutation<AxiosResponse<string>, Error, ResetPasswordProps>({
    mutationKey: ['reset-password'],
    mutationFn: (data: ResetPasswordProps) => ResetPassword(data.email, data.token, data.password),
});

const useForgotPassword = (email: string) => useQuery({
    queryKey: ['forgot-password'],
    queryFn: async () => {
        const { data } = await ForgotPassword(email);
        return data;
    },
});

const useLogout = () => useMutation<AxiosResponse<string>, Error, void>({
    mutationKey: ['logout'],
    mutationFn: () => Logout(),
});

const useRefreshToken = () => useMutation<AxiosResponse<string>, Error, void>({
    mutationKey: ['refresh-token'],
    mutationFn: () => RefreshToken(),
});

const useIsAuthenticated = () => useQuery({
    queryKey: ['is-authenticated'],
    queryFn: async () => {
        const { data } = await IsAuthenticated();
        return data;
    },
});

const useGetUserRole = () => useQuery({
    queryKey: ['get-user-role'],
    queryFn: async () => {
        const { data } = await GetUserRole();
        return data;
    }
});

const useIsEmailConfirmed = (username: string) => useQuery({
    queryKey: ['is-email-confirmed'],
    queryFn: async () => {
        const { data } = await IsEmailConfirmed(username);
        return data;
    }
});

const useUserExists = (username: string) => useQuery({
    queryKey: ['user-exists'],
    queryFn: async () => {
        const { data } = await UserExists(username);
        return data;
    }
});


export { useRegister, useVerifyEmail, useLogin, useResetPassword, useForgotPassword, useLogout, useRefreshToken, useIsAuthenticated, useGetUserRole, useIsEmailConfirmed, useUserExists };