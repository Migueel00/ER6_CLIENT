import axios from 'axios';
import { URL } from '../../src/API/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            const refreshToken = AsyncStorage.getItem('refreshToken');

            if (refreshToken === null) {
                try {
                    const { data } = await axios.post('/refresh-token', { refreshToken });
                    AsyncStorage.setItem('accessToken', data.accessToken);
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
