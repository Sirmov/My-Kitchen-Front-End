
export type User = {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
};

const users: User[] = [
    {
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
