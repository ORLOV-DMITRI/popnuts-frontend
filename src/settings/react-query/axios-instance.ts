import axios, {CreateAxiosDefaults} from "axios";
import Cookies from 'js-cookie';

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const config: CreateAxiosDefaults  = {baseURL: baseUrl};

export const apiClient = axios.create(config);


apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
