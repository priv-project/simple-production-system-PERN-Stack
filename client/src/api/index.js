import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);

export const fetchModels = () => API.get('/maintenance/models');
export const createModel = (newModel) => API.post('/maintenance/models', newModel);
export const updateModel = (id, updateModel) => API.patch(`/maintenance/models/${id}`, updateModel);
export const deleteModel = (id) => API.delete(`/maintenance/models/${id}`);

export const fetchProducts = () => API.get('/maintenance/products');
export const createProduct = (newProduct) => API.post('/maintenance/products', newProduct);
export const updateProduct = (id, updateProduct) => API.patch(`/maintenance/products/${id}`, updateProduct);
export const deleteProduct = (id) => API.delete(`/maintenance/products/${id}`);

export const fetchProductParts = (id, getProductPart) => API.get(`/maintenance/products/product-parts/${id}`, getProductPart);

export const fetchAssembly = () => API.get('/maintenance/assembly');
export const createAssembly = (newAssembly) => API.post('/maintenance/assembly', newAssembly);
export const updateAssembly = (id, updateAssembly) => API.patch(`/maintenance/assembly/${id}`, updateAssembly);
export const deleteAssembly = (id) => API.delete(`/maintenance/assembly/${id}`);

export const fetchParts = () => API.get('/maintenance/parts');
export const createPart = (newPart) => API.post('/maintenance/parts', newPart);
export const updatePart = (id, updatePart) => API.patch(`/maintenance/parts/${id}`, updatePart);
export const deletePart = (id) => API.delete(`/maintenance/parts/${id}`);
