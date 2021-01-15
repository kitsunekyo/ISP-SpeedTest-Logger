import axios from 'axios';

export const API_BASE_URL = '//localhost:3000';

export const api = axios.create({
    baseURL: API_BASE_URL,
});
