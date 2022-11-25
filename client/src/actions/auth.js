import * as actionTypes from 'constants/actionTypes';
import * as api from 'api/auth';
import Swal from 'sweetalert2';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: actionTypes.AUTH, data });
        navigate('/dashboard');
    } catch (error) {
        Swal.fire('Error!', `User doesn't exist`, 'error');
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: actionTypes.AUTH, data });
        navigate('/dashboard');
    } catch (error) {
        Swal.fire('Error!', `User doesn't exist`, 'error');
        console.log(error);
    }
};
