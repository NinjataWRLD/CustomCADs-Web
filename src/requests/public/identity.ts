import ILogin from '@/interfaces/login';
import axios from '../axios';
import IRegister from '@/interfaces/register';

const Register = async (role: string, user: IRegister) => {
    return await axios.post(`/API/Identity/Register/${role}`, user);
};

const VerifyEmail = async (username: string, token: string) => {
    return await axios.get(`/API/Identity/VerifyEmail/${username}?token=${token}`);
};

const RetryVerifyEmail = async (username: string) => {
    return await axios.get(`/API/Identity/RetryVerifyEmail/${username}`);
};

const Login = async (user: ILogin) => {
    return await axios.post(`/API/Identity/Login`, user);
};

const ResetPassword = async (email: string, token: string, password: string) => {
    return await axios.post('/API/Identity/ResetPassword', { email: email, token: token, newPassword: password });
};

const ForgotPassword = async (email: string) => {
    return await axios.get(`/API/Identity/ForgotPassword?email=${email}`);
};

const Logout = async () => {
    return await axios.post(`/API/Identity/Logout`);
};

const RefreshToken = async () => {
    return await axios.post(`/API/Identity/RefreshToken`);
};

const IsAuthenticated = async () => {
    return await axios.get('/API/Identity/Authentication');
};

const GetUserRole = async () => {
    return await axios.get('/API/Identity/Authorized');
};

const IsEmailConfirmed = async (username: string) => {
    return await axios.get(`/API/Identity/IsEmailConfirmed/${username}`);
};

const UserExists = async (username: string) => {
    return await axios.get(`/API/Identity/UserExists/${username}`);
};

export { Register, VerifyEmail, RetryVerifyEmail, Login, ResetPassword, ForgotPassword, Logout, RefreshToken, IsAuthenticated, GetUserRole, IsEmailConfirmed, UserExists };