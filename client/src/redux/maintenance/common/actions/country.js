import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/common/country';
import Swal from 'sweetalert2';

export const getCountrys = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCountrys();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createCountry = (country, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createCountry(country);
        dispatch(CREATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Country has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateCountry = (id, country, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateCountry(id, country);
        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Country has been updated.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteCountry = (id) => async (dispatch) => {
    try {
        await api.deleteCountry(id);
        dispatch(DELETE(id));
        Swal.fire('Success!', 'Country has been deleted.', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));
        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
