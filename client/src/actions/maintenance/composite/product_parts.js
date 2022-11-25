import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/maintenance';
import Swal from 'sweetalert2';

export const getProductParts = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProductParts(id);
        dispatch({ type: actionTypes.FETCH_PRODUCT_PARTS, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const getProductBom = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProductParts(id);
        dispatch({ type: actionTypes.FETCH_PRODUCT_BOM, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createProductPart = (id, formData, setAddPartGridVisible) => async (dispatch) => {
    try {
        const { data } = await api.createProductPart(id, formData);
        dispatch({ type: actionTypes.CREATE_PRODUCT_PART, payload: data });
        setAddPartGridVisible(false);
        Swal.fire('Success!', 'Product part has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

// export const updateProduct = (id, product, setFormVisible) => async (dispatch) => {
//     try {
//         const { data } = await api.updateProduct(id, product);

//         dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: data });
//         setFormVisible(false);
//         Swal.fire('Success!', 'Product updated successfully', 'success');
//     } catch (error) {
//         console.log(error);
//         Swal.fire('Error!', 'Something went wrong', 'error');
//     }
// };

// export const deleteProduct = (id) => async (dispatch) => {
//     try {
//         await await api.deleteProduct(id);

//         dispatch({ type: actionTypes.DELETE_PRODUCT, payload: id });
//         Swal.fire('Success!', 'Product deleted successfully', 'success');
//     } catch (error) {
//         console.log(error);
//         Swal.fire('Error!', 'Something went wrong', 'error');
//     }
// };
