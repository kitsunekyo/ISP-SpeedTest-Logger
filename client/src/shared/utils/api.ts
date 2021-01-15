import axios from 'axios';

export const API_BASE_URL = '//localhost:3000';

/*
# Overkill Implementation
here i use an abstraction over axios, which would allow me to do centralized header management,
error handling, etc. but it would require a dependency on the token in localstorage,
as i dont have access to the app state here.

type ApiMethods = 'get' | 'put' | 'post' | 'delete' | 'patch';

const getHeaders = (withAuth = false) => {
    const headers: { [key: string]: any } = {
        'Content-Type': 'application/json',
    };
    if (withAuth) {
        headers.Authorization = localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem('token')}`
            : undefined;
    }
    return headers;
};

export const customAxios = async (
    method: ApiMethods,
    url: string,
    useToken = false,
    variables?: any
) => {
    return await axios({
        url: `${API_BASE_URL}${url}`,
        method,
        params: method === 'get' ? variables : undefined,
        data: method !== 'get' ? variables : undefined,
        headers: getHeaders(useToken),
    });
};

export const api = {
    get: (url: string, ...args: any) => customAxios('get', url, false, ...args),
    post: (url: string, ...args: any) => customAxios('post', url, false, ...args),
    put: (url: string, ...args: any) => customAxios('put', url, false, ...args),
    patch: (url: string, ...args: any) => customAxios('patch', url, false, ...args),
    delete: (url: string, ...args: any) => customAxios('delete', url, false, ...args),
};

export const authApi = {
    get: (url: string, ...args: any) => customAxios('get', url, true, ...args),
    post: (url: string, ...args: any) => customAxios('post', url, true, ...args),
    put: (url: string, ...args: any) => customAxios('put', url, true, ...args),
    patch: (url: string, ...args: any) => customAxios('patch', url, true, ...args),
    delete: (url: string, ...args: any) => customAxios('delete', url, true, ...args),
};

*/

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
