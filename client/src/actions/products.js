import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/index.js';
import Swal from 'sweetalert2';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProducts();
        dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createProduct = (product, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: actionTypes.CREATE_PRODUCT, payload: data });
        setFormVisible(false);

        Swal.fire('Success!', 'Product has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateProduct = (id, product, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product);

        dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: data });
        setFormVisible(false);
        Swal.fire('Success!', 'Product updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await await api.deleteProduct(id);

        dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
        Swal.fire('Success!', 'Product deleted successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};
