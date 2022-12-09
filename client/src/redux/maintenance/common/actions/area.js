import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/common/area';
import Swal from 'sweetalert2';

export const getAreas = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAreas();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createArea = (area, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createArea(area);

        dispatch(CREATE(data));
        setFormVisible(false);

        Swal.fire('Success!', 'Area has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateArea = (id, area, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateArea(id, area);

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Area has been updated.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteArea = (id) => async (dispatch) => {
    try {
        await api.deleteArea(id);

        dispatch(DELETE(id));
        // dispatch({ type: actionTypes.DELETE_PART, payload: id });
        Swal.fire('Success!', 'Area has been deleted.', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));

        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
