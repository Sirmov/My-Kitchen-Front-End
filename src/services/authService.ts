import { Auth } from '@/contexts/authContext';

export async function login(): Promise<Auth> {
    return {
        _id: '1',
        username: 'Nikola',
        email: 'sirmov0213@gmail.com',
        accessToken: '',
        refreshToken: '',
        roles: [],
    };
}

export async function register(): Promise<Auth> {
    return {
        _id: '1',
        username: 'Nikola',
        email: 'sirmov0213@gmail.com',
        accessToken: '',
        refreshToken: '',
        roles: [],
    };
}

export async function logout(): Promise<boolean> {
    return true;
}
