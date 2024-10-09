export default interface Register {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

export const emptyLogin: Register = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};