import * as api from 'api/maintenance';
import { ERROR, UPDATE_ERROR } from 'redux/error';
import { FETCH, CREATE, UPDATE, DELETE } from 'redux/maintenance/sales/productCustomer';
import Swal from 'sweetalert2';

export const getProductCustomers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProductCustomers();
        dispatch(FETCH(data));
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const createProductCustomer = (customer, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.createProductCustomer(customer);

        dispatch(CREATE(data));
        setFormVisible(false);

        Swal.fire('Success!', 'Product customer has been added.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const updateProductCustomer = (id, customer, setFormVisible) => async (dispatch) => {
    try {
        const { data } = await api.updateProductCustomer(id, customer);

        dispatch(UPDATE(data));
        setFormVisible(false);
        Swal.fire('Success!', 'Product customer has been updated.', 'success');
    } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong', 'error');
    }
};

export const deleteProductCustomer = (id) => async (dispatch) => {
    try {
        await api.deleteProductCustomer(id);

        dispatch(DELETE(id));
        Swal.fire('Success!', 'Product customer has been deleted.', 'success');
    } catch (error) {
        dispatch(ERROR({ isError: true, data: error }));

        setTimeout(() => {
            dispatch(UPDATE_ERROR());
        }, 5000);
    }
};
