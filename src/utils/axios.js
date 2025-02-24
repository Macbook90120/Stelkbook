import axios from 'axios';

const api =axios.create({
<<<<<<< HEAD
    baseURL:"http://localhost:8000/api",
=======
    // baseURL:"http://localhost:8000/api",
    baseURL:"http://192.168.33.145:8080/api",
>>>>>>> c61259810454d6ca7bdd0ffadd9d7a5553950080
})
api.interceptors.request.use((config) => {
    const token=localStorage.getItem("auth_token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;