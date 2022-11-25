import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Button, ButtonGroup, Box, Grid, MenuItem } from '@mui/material';

// MATERIAL ICONS

// project imports
import useScriptRef from 'hooks/useScriptRef';
import JTextField from 'components/JTextField';
import JSelect from 'components/JSelect';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createPart, updatePart, deletePart } from 'actions/parts';

const Form = ({ currentId, setCurrentId, setFormVisible, models }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [partData, setPartData] = React.useState({
        part_code: '',
        part_name: '',
        part_description: '',
        part_model_id: '',
        part_remark: '',
        part_status: '',
        part_created_date: '',
        part_updated_at: ''
    });
    const part = useSelector((state) => (currentId ? state.parts.find((part) => part.part_id === currentId) : null));

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
                dispatch(deletePart(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (part) setPartData(part);
    }, [part]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={partData}
            validationSchema={Yup.object().shape({
                part_code: Yup.string(4).min(4, 'Minimum value is 4.').max(50, 'Maximum value is 50.').required('This field is required'),
                part_name: Yup.string(4).min(4, 'Minimum value is 4.').max(50, 'Maximum value is 50.').required('This field is required'),
                part_description: Yup.string().max(200, 'Maximum value is 50'),
                part_model_id: Yup.number().required('This field is required'),
                part_remark: Yup.string().max(200, 'Maximum value is 200.')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(createPart({ ...values }, setFormVisible));
                        } else {
                            dispatch(updatePart(currentId, { ...values }, setFormVisible));
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
                                label="Part Code"
                                name="part_code"
                                value={values.part_code}
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
                                label="Part Name"
                                name="part_name"
                                value={values.part_name}
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
                                name="part_description"
                                value={values.part_description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                type="multiline"
                                rows={4}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item lg={4} md={4} sm={12}>
                            <JSelect
                                label="Model"
                                labelId="part_model_id-label"
                                id="part_model_id"
                                name="part_model_id"
                                value={values.part_model_id}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                            >
                                {models.map((model, index) => {
                                    return (
                                        <MenuItem key={index} value={model.model_id}>
                                            {model.model_code}
                                        </MenuItem>
                                    );
                                })}
                            </JSelect>
                        </Grid>
                    </Grid>
                    {currentId ? (
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item lg={4} md={4} sm={12}>
                                <JSelect
                                    labelId="part_status"
                                    name="part_status"
                                    value={values.part_status}
                                    label="Status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={errors}
                                >
                                    <MenuItem key={1} value="ACTIVE">
                                        ACTIVE
                                    </MenuItem>
                                    <MenuItem key={2} value="INACTIVE">
                                        INACTIVE
                                    </MenuItem>
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
