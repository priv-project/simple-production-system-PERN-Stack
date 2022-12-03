import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/composite/part';
import Swal from 'sweetalert2';

export const getParts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchParts();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createPart = (part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createPart(part);

        dispatch(CREATE(data));
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

        // dispatch({ type: actionTypes.UPDATE_PART, payload: data });
        dispatch(UPDATE(data));
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

        dispatch(DELETE(id));
        // dispatch({ type: actionTypes.DELETE_PART, payload: id });
        Swal.fire('Success!', 'Part deleted successfully', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));

        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
