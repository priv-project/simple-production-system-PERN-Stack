import * as actionTypes from 'store/customActionTypes';
import * as api from 'api/index.js';
import Swal from 'sweetalert2';

export const getModels = () => async (dispatch) => {
    try {
        const { data } = await api.fetchModels();
        dispatch({ type: actionTypes.FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createModel = (model, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createModel(model);

        dispatch({ type: actionTypes.CREATE, payload: data });
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

        dispatch({ type: actionTypes.UPDATE, payload: data });
        setFormVisible(false);
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteModel = (id) => async (dispatch) => {
    try {
        await await api.deleteModel(id);

        dispatch({ type: actionTypes.DELETE, payload: id });
        Swal.fire('Success!', 'Model deleted successfully', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};
