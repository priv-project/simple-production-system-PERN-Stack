import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/index.js';
import Swal from 'sweetalert2';

export const getParts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchParts();
        dispatch({ type: actionTypes.FETCH_PARTS, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createPart = (part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createPart(part);

        dispatch({ type: actionTypes.CREATE_PART, payload: data });
        setFormVisible(false);

        Swal.fire('Success!', 'Part has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updatePart = (id, part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updatePart(id, part);

        dispatch({ type: actionTypes.UPDATE_PART, payload: data });
        setFormVisible(false);
        Swal.fire('Success!', 'Part updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deletePart = (id) => async (dispatch) => {
    try {
        await api.deletePart(id);

        dispatch({ type: actionTypes.DELETE_PART, payload: id });
        Swal.fire('Success!', 'Part deleted successfully', 'success');
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
