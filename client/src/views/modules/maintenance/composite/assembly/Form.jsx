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
import JComboBox from 'components/JComboBox';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createAssembly, updateAssembly, deleteAssembly } from 'redux/maintenance/composite/actions/assembly';

const Form = ({ currentId, setCurrentId, setFormVisible, models, parts }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [assemblyData, setAssemblyData] = React.useState({
        assembly_code: '',
        assembly_description: '',
        assembly_model_id: '',
        assembly_part_id: '',
        assembly_status: '',
        assembly_created_date: '',
        assembly_updated_at: ''
    });
    const assy = useSelector((state) => (currentId ? state.assembly.find((assy) => assy.assembly_id === currentId) : null));
    const partOptions = parts.map((part) => {
        return { id: part.part_id, label: part.part_code };
    });

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
                dispatch(deleteAssembly(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (assy) setAssemblyData(assy);
    }, [assy]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={assemblyData}
            validationSchema={Yup.object().shape({
                assembly_code: Yup.string(4).min(4, 'Minimum value is 4.').max(50, 'Maximum value is 4.').required('This field required'),
                assembly_description: Yup.string(4).min(4, 'Minimum value is 4.').max(200, 'Maximum value is 50'),
                assembly_model_id: Yup.number().required('This field required.'),
                assembly_part_id: Yup.number().required('This field required.')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                console.log(values);
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(createAssembly({ ...values }, setFormVisible));
                        } else {
                            dispatch(updateAssembly(currentId, { ...values }, setFormVisible));
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
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, resetForm, values, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={4} sm={12}>
                            <JTextField
                                label="Assembly Code"
                                name="assembly_code"
                                value={values.assembly_code}
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
                                id="assembly_description"
                                name="assembly_description"
                                value={values.assembly_description}
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
                                labelId="assembly_model_id-label"
                                id="assembly_model_id"
                                name="assembly_model_id"
                                value={values.assembly_model_id}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                            >
                                {models.map((model) => {
                                    return (
                                        <MenuItem key={model.model_id} value={model.model_id}>
                                            {model.model_code}
                                        </MenuItem>
                                    );
                                })}
                            </JSelect>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item lg={4} md={4} sm={12}>
                            <JComboBox
                                options={partOptions}
                                id="assembly_part_id"
                                name="assembly_part_id"
                                label="Equivalent Part ID"
                                value={values.assembly_part_id}
                                getOptionLabel={(option) => option.label}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                            />
                        </Grid>
                    </Grid>
                    {currentId ? (
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item lg={4} md={4} sm={12}>
                                <JSelect
                                    labelId="assembly_status"
                                    name="assembly_status"
                                    value={values.assembly_status}
                                    label="Status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    touched={touched}
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
                            <Button
                                size="small"
                                // disabled={isSubmitting}
                                type="submit"
                            >
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
