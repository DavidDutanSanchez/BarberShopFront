import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: { 'Content-Type': 'application/json' },
})

// attach auth token if you have one
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers!['Authorization'] = `${import.meta.env.VITE_AUTH_PREFIX} ${token}`
    }
    return config
})

export default apiClient
