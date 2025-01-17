import axios from 'axios';
import { URL } from '../../src/API/urls';

const axiosInstance = axios.create({
    baseURL: URL.API_PLAYERS,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    const { data } = await axios.post('/refresh-token', { refreshToken });
                    localStorage.setItem('accessToken', data.accessToken);
                    error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
