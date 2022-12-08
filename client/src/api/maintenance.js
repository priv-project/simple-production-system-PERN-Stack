import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// export const signIn = (formData) => API.post('/auth/signin', formData);
// export const signUp = (formData) => API.post('/auth/signup', formData);

// MODEL
export const fetchModels = () => API.get('/maintenance/composite/models');
export const createModel = (newModel) => API.post('/maintenance/composite/models', newModel);
export const updateModel = (id, updateModel) => API.patch(`/maintenance/composite/models/${id}`, updateModel);
export const deleteModel = (id) => API.delete(`/maintenance/composite/models/${id}`);

// PRODUCT
export const fetchProducts = () => API.get('/maintenance/composite/products');
export const createProduct = (newProduct) => API.post('/maintenance/composite/products', newProduct);
export const updateProduct = (id, updateProduct) => API.patch(`/maintenance/composite/products/${id}`, updateProduct);
export const deleteProduct = (id) => API.delete(`/maintenance/composite/products/${id}`);

// PRODUCT PART
export const fetchProductParts = (id) => API.get(`/maintenance/composite/products/product-parts/${id}`);
export const fetchProductBOM = (id) => API.get(`/maintenance/composite/products/product-bom/${id}`);
export const createProductPart = (id, formData) => API.post(`/maintenance/composite/products/product-parts/${id}`, formData);

// ASSEMBLY
export const fetchAssembly = () => API.get('/maintenance/composite/assembly');
export const createAssembly = (newAssembly) => API.post('/maintenance/composite/assembly', newAssembly);
export const updateAssembly = (id, updateAssembly) => API.patch(`/maintenance/composite/assembly/${id}`, updateAssembly);
export const deleteAssembly = (id) => API.delete(`/maintenance/composite/assembly/${id}`);

// PART
export const fetchParts = () => API.get('/maintenance/composite/parts');
export const createPart = (newPart) => API.post('/maintenance/composite/parts', newPart);
export const updatePart = (id, updatePart) => API.patch(`/maintenance/composite/parts/${id}`, updatePart);
export const deletePart = (id) => API.delete(`/maintenance/composite/parts/${id}`);

/* PURCHASING */
// SUPPLIER
export const fetchSuppliers = () => API.get('/maintenance/purchasing/supplier');
export const createSupplier = (newSupplier) => API.post('/maintenance/purchasing/supplier', newSupplier);
export const updateSupplier = (id, updateSupplier) => API.patch(`/maintenance/purchasing/supplier/${id}`, updateSupplier);
export const deleteSupplier = (id) => API.delete(`/maintenance/purchasing/supplier/${id}`);

/* COMMON */
export const fetchCountrys = () => API.get('/maintenance/common/country');
export const createCountry = (newCountry) => API.post('/maintenance/common/country', newCountry);
export const updateCountry = (id, updateCountry) => API.patch(`/maintenance/common/country/${id}`, updateCountry);
export const deleteCountry = (id) => API.delete(`/maintenance/common/country/${id}`);

export const fetchCurrencys = () => API.get('/maintenance/common/currency');
export const createCurrency = (newCurrency) => API.post('/maintenance/common/currency', newCurrency);
export const updateCurrency = (id, updateCurrency) => API.patch(`/maintenance/common/currency/${id}`, updateCurrency);
export const deleteCurrency = (id) => API.delete(`/maintenance/common/currency/${id}`);
