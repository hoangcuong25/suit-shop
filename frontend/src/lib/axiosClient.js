import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
})

// Add request interceptor for token
axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, (error) => Promise.reject(error));

axiosClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/refresh-token`, {}, {
                    headers: { refreshToken }
                })

                const newAccessToken = res.data.access_token;
                if (newAccessToken) {
                    localStorage.setItem('access_token', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed')
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
);

export default axiosClient;