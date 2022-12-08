import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/common/currency';
import Swal from 'sweetalert2';

export const getCurrencys = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCurrencys();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createCurrency = (currency, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createCurrency(currency);

        dispatch(CREATE(data));
        setFormVisible(false);

        Swal.fire('Success!', 'Currency has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateCurrency = (id, currency, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateCurrency(id, currency);

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Currency has been updated.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteCurrency = (id) => async (dispatch) => {
    try {
        await api.deleteCurrency(id);

        dispatch(DELETE(id));
        // dispatch({ type: actionTypes.DELETE_PART, payload: id });
        Swal.fire('Success!', 'Currency has been deleted.', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));

        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
