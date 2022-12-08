import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Button, ButtonGroup, Box, Grid, MenuItem } from '@mui/material';

// MATERIAL ICONS

// project imports
import useScriptRef from 'hooks/useScriptRef';
import JTextField from 'components/JTextField';
// import JSelect from 'components/JSelect';

// third countryy
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createCountry, updateCountry, deleteCountry } from 'redux/maintenance/common/actions/country';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [countryData, setCountryData] = React.useState({
        country_code: '',
        country_desc: '',
        country_created_at: '',
        country_updated_at: ''
    });
    const countries = useSelector((state) => (currentId ? state.countries.find((country) => country.country_id === currentId) : null));

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
                dispatch(deleteCountry(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (countries) setCountryData(countries);
    }, [countries]);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={countryData}
            validationSchema={Yup.object().shape({
                country_code: Yup.string(4).min(2, 'Minimum value is 4.').required('This field is required'),
                country_desc: Yup.string().max(200, 'Maximum value is 50')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(createCountry({ ...values }, setFormVisible));
                        } else {
                            dispatch(updateCountry(currentId, { ...values }, setFormVisible));
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
                                label="Country Code"
                                name="country_code"
                                value={values.country_code}
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
                                name="country_desc"
                                value={values.country_desc}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />
                        </Grid>
                    </Grid>
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
