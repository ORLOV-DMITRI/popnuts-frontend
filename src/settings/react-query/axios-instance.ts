import axios, {CreateAxiosDefaults} from "axios";


const config: CreateAxiosDefaults  = {baseURL: 'https://dummyjson.com/products/'};

export const apiClient = axios.create(config);


apiClient.interceptors.request.use((config) => {
    const token = ''; // Или получите токен из другого источника
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
