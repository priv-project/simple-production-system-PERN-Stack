import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchModels = () => API.get('/maintenance/models');
export const createModel = (newModel) => API.post('/maintenance/models', newModel);
export const updateModel = (id, updateModel) => API.patch(`/maintenance/models/${id}`, updateModel);
export const deleteModel = (id) => API.delete(`/maintenance/models/${id}`);

export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);
