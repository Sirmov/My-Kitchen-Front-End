import { ProblemDetails } from '@services/services.types';

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
        username: 'sirmov',
        email: 'sirmov@gmail.com',
        accessToken: '',
        refreshToken: '',
        roles: [],
    },
];

export async function loginWithEmail(email: string, password: string): Promise<User | ProblemDetails> {
    const user = users.find((u) => u.email == email);

    return user ?
            new Promise((resolve) => setTimeout(resolve, 1000, user))
        :   new Promise((_, reject) =>
                setTimeout(reject, 1000, {
                    status: 400,
                    type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1',
                    title: 'Bad request',
                    details: `Email or password not correct.`,
                })
            );
}

export async function loginWithUsername(username: string, password: string): Promise<User | ProblemDetails> {
    const user = users.find((u) => u?.username === username);

    return user ?
            new Promise((resolve) => setTimeout(resolve, 1000, user))
        :   new Promise((_, reject) =>
                setTimeout(reject, 1000, {
                    status: 400,
                    type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1',
                    title: 'Bad request',
                    details: `Username or password not correct.`,
                })
            );
}

export async function register(username: string, email: string, password: string): Promise<User | ProblemDetails> {
    const user = {
        _id: (++users.length).toString(),
        username,
        email,
        accessToken: '',
        refreshToken: '',
        roles: [],
    };

    users.push(user);

    return new Promise((resolve) => setTimeout(resolve, 1000, user));
}

export async function logout(): Promise<boolean | ProblemDetails> {
    return new Promise((resolve) => setTimeout(resolve, 1000, true));
}
