import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/index.js';
import Swal from 'sweetalert2';

export const getAssembly = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAssembly();
        dispatch({ type: actionTypes.FETCH_ASSEMBLY, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createAssembly = (assy, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createAssembly(assy);
        dispatch({ type: actionTypes.CREATE, payload: data });
        setFormVisible(false);
        Swal.fire('Success!', 'Assy has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateAssembly = (id, assy, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateAssembly(id, assy);
        dispatch({ type: actionTypes.UPDATE, payload: data });
        setFormVisible(false);
        Swal.fire('Success!', 'Assy updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteAssembly = (id) => async (dispatch) => {
    try {
        await api.deleteAssembly(id);
        dispatch({ type: actionTypes.DELETE, payload: id });
        Swal.fire('Success!', 'Assy deleted successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};
