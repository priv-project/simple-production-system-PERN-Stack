import * as api from 'api/maintenance';
import {
    FETCH,
    CREATE,
    // UPDATE,
    DELETE
} from 'redux/maintenance/composite/product_part';
import Swal from 'sweetalert2';

export const getProductParts = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProductParts(id);
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const getProductBom = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProductParts(id);
        // dispatch({ type: actionTypes.FETCH_PRODUCT_BOM, payload: data });
        return;
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createProductPart = (id, formData, setAddPartGridVisible) => async (dispatch) => {
    try {
        const { data } = await api.createProductPart(id, formData);
        dispatch(CREATE(data));
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

export const deleteProductPart = (ids) => async (dispatch) => {
    try {
        await api.deleteProductPart(ids);

        dispatch(DELETE(ids));
        Swal.fire('Success!', 'Product part has been successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};
