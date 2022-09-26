import * as actionTypes from 'store/customActionTypes';
import * as api from 'api/index.js';

export const getModels = () => async (dispatch) => {
    try {
        const { data } = await api.fetchModels();
        dispatch({ type: actionTypes.FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createModel = (model) => async (dispatch) => {
    try {
        const { data } = await api.createModel(model);

        dispatch({ type: actionTypes.CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateModel = (id, model) => async (dispatch) => {
    try {
        const { data } = await api.updateModel(id, model);

        dispatch({ type: actionTypes.UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteModel = (id) => async (dispatch) => {
    try {
        await await api.deleteModel(id);

        dispatch({ type: actionTypes.DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};
