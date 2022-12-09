import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/purchasing/packing';
import Swal from 'sweetalert2';

export const getPackings = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPackings();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createPacking = (part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createPacking(part);
        dispatch(CREATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Packing has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updatePacking = (id, part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updatePacking(id, part);
        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Packing updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deletePacking = (id) => async (dispatch) => {
    try {
        await api.deletePacking(id);
        dispatch(DELETE(id));
        Swal.fire('Success!', 'Packing deleted successfully', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));
        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
