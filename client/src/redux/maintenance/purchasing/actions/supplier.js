import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/purchasing/supplier';
import Swal from 'sweetalert2';

export const getSuppliers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSuppliers();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createSupplier = (part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createSupplier(part);
        dispatch(CREATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Supplier has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateSupplier = (id, part, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateSupplier(id, part);
        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Supplier updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteSupplier = (id) => async (dispatch) => {
    try {
        await api.deleteSupplier(id);
        dispatch(DELETE(id));
        Swal.fire('Success!', 'Supplier deleted successfully', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));
        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
