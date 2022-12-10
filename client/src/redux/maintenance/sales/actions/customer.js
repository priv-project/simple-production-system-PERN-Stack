import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/sales/customer';
import Swal from 'sweetalert2';

export const getCustomers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCustomers();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createCustomer = (customer, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createCustomer(customer);

        dispatch(CREATE(data));
        setFormVisible(false);

        Swal.fire('Success!', 'Customer has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateCustomer = (id, customer, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateCustomer(id, customer);

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Customer has been updated.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteCustomer = (id) => async (dispatch) => {
    try {
        await api.deleteCustomer(id);

        dispatch(DELETE(id));
        Swal.fire('Success!', 'Customer has been deleted.', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));

        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
