import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/composite/model';
import Swal from 'sweetalert2';

export const getModels = () => async (dispatch) => {
    try {
        const { data } = await api.fetchModels();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createModel = (model, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createModel(model);

        dispatch(CREATE(data));
        setFormVisible(false);

        Swal.fire('Success!', 'Model has been added successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateModel = (id, model, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateModel(id, model);

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Model updated successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteModel = (id) => async (dispatch) => {
    try {
        await api.deleteModel(id);

        dispatch(DELETE(id));
        Swal.fire('Success!', 'Model deleted successfully', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));
        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
