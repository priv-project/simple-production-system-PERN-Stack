import * as React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Error = () => {
    const error = useSelector((state) => state.error.data.response.data.error);
    console.log(error);
    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={true} message="I love snacks">
            <Alert severity="error">
                <AlertTitle>Something went wrong!</AlertTitle>
                <strong>ERROR CODE:</strong> <i>{error?.code}</i> <br />
                {error?.detail}
            </Alert>
        </Snackbar>
    );

    // return {
    //     23503: 'Still used by other modules'
    // };
};

export default Error;
