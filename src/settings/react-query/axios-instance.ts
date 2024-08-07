import axios, {CreateAxiosDefaults} from "axios";

const baseUrl = 'few'
export function getJWTHeader(userToken: string): Record<string, string> {
    return {Authorization: `Bearer ${userToken}`};
}

const config: CreateAxiosDefaults  = {baseURL: 'baseUrl'};

export const axiosInstance = axios.create(config);


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage?.getItem('token'); // Или получите токен из другого источника
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
