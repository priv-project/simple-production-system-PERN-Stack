import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Button, ButtonGroup, Box, Grid, MenuItem } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';

// MATERIAL ICONS

// project imports
import useScriptRef from 'hooks/useScriptRef';
import JTextField from 'components/JTextField';
import JSelect from 'components/JSelect';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createModel, updateModel, deleteModel } from 'actions/models';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [modelData, setModelData] = React.useState({
        model_code: '',
        model_description: '',
        model_status: '',
        model_created_date: '',
        model_updated_at: ''
    });
    const model = useSelector((state) => (currentId ? state.models.find((model) => model.model_id === currentId) : null));

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteModel(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (model) setModelData(model);
    }, [model]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={modelData}
            validationSchema={Yup.object().shape({
                model_code: Yup.string(4).min(4, 'Minimum value is 4.').max(50, 'Maximum value is 4.').required('Model code is required'),
                model_description: Yup.string().max(200, 'Maximum value is 200.'),
                model_status: Yup.string().min(5).max(10, 'Maximum value is 10.')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(createModel({ ...values }, setFormVisible));
                        } else {
                            dispatch(updateModel(currentId, { ...values }, setFormVisible));
                        }
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, resetForm, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={4} sm={12}>
                            <JTextField
                                label="Model"
                                name="model_code"
                                value={values.model_code}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item lg={4} md={4} sm={12}>
                            <JTextField
                                label="Description"
                                name="model_description"
                                value={values.model_description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                type="multiline"
                                rows={4}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                    {currentId ? (
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item lg={4} md={4} sm={12}>
                                <JSelect
                                    labelId="model_status"
                                    id="model_status"
                                    name="model_status"
                                    value={values.model_status}
                                    label="Status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={errors}
                                >
                                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                                </JSelect>
                            </Grid>
                        </Grid>
                    ) : (
                        ''
                    )}
                    <Box sx={{ mt: 2 }}>
                        <ButtonGroup variant="contained" aria-label="outlined button group">
                            <Button size="small" disabled={isSubmitting} type="submit">
                                Save
                            </Button>
                            <Button size="small" onClick={resetForm}>
                                Cancel
                            </Button>
                            {currentId ? (
                                <Button size="small" color="secondary" onClick={handleDelete}>
                                    Delete
                                </Button>
                            ) : (
                                ''
                            )}
                        </ButtonGroup>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
