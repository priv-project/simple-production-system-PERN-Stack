import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/auth';
import { AUTH, LOGOUT } from 'redux/auth';
import Swal from 'sweetalert2';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch(AUTH(data));
        navigate('/dashboard');
    } catch (error) {
        Swal.fire('Error!', `User doesn't exist`, 'error');
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch(LOGOUT(data));
        navigate('/dashboard');
    } catch (error) {
        Swal.fire('Error!', `User doesn't exist`, 'error');
        console.log(error);
    }
};
