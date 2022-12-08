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

// third suppliery
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createSupplier, updateSupplier, deleteSupplier } from 'redux/maintenance/purchasing/actions/supplier';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [supplierData, setSupplierData] = React.useState({
        supplier_id: '',
        supplier_code: '',
        supplier_desc: '',
        supplier_street: '',
        supplier_country_id: '',
        supplier_contact: '',
        supplier_emai: '',
        supplier_tel_num: '',
        supplier_fax_num: '',
        supplier_status: '',
        supplier_created_at: '',
        supplier_updated_a: ''
    });
    const supplier = useSelector((state) => (currentId ? state.suppliers.find((supplier) => supplier.supplier_id === currentId) : null));

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
                dispatch(deleteSupplier(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (supplier) setSupplierData(supplier);
    }, [supplier]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={supplierData}
            validationSchema={Yup.object().shape({
                supplier_code: Yup.string(4)
                    .min(4, 'Minimum value is 4.')
                    .max(50, 'Maximum value is 50.')
                    .required('This field is required'),
                supplier_desc: Yup.string(4)
                    .min(4, 'Minimum value is 4.')
                    .max(50, 'Maximum value is 50.')
                    .required('This field is required'),
                supplier_street: Yup.string().max(200, 'Maximum value is 50'),
                supplier_country_id: Yup.number().required('This field is required'),
                supplier_contact: Yup.string().required('This field is required'),
                supplier_email: Yup.string().email().required('This field is required'),
                supplier_tel_num: Yup.number(),
                supplier_fax_num: Yup.number()
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(createSupplier({ ...values }, setFormVisible));
                        } else {
                            dispatch(updateSupplier(currentId, { ...values }, setFormVisible));
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
                                label="Supplier Code"
                                name="supplier_code"
                                value={values.supplier_code}
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
                                label="Supplier Name"
                                name="supplier_name"
                                value={values.supplier_name}
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
                                name="supplier_desc"
                                value={values.supplier_desc}
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
                            <JTextField
                                label="Street"
                                name="supplier_street"
                                value={values.supplier_street}
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
                                label="Country"
                                labelId="supplier_country_id-label"
                                id="supplier_country_id"
                                name="supplier_country_id"
                                value={values.supplier_country_id}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                            >
                                {country.map((model, index) => {
                                    return (
                                        <MenuItem key={index} value={country.country_id}>
                                            {country.country_code}
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
                                    labelId="supplier_status"
                                    name="supplier_status"
                                    value={values.supplier_status}
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
