import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/maintenance';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/product';
import Swal from 'sweetalert2';

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProducts();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createProduct = (product, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch(CREATE(data));
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

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Product updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);

        dispatch(DELETE(id));
        Swal.fire('Success!', 'Product deleted successfully', 'success');
    } catch (error) {
        dispatch({
            type: actionTypes.ERROR,
            payload: {
                isError: true,
                data: error
            }
        });

        setTimeout(() => {
            dispatch({ type: actionTypes.UPDATE_ERROR });
        }, 3000);
    }
};
