import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box, MenuItem, Button, ButtonGroup } from '@mui/material';

// PROJECT IMPORTS
import useScriptRef from 'hooks/useScriptRef';
import JTextField from 'components/JTextField';
import JSelect from 'components/JSelect';

// third suppliery
import * as Yup from 'yup';
import { Formik } from 'formik';

const AppForm = ({ initialValues = {}, validationSchema, currentId, setCurrentId, setFormVisible, actions, items }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();

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
                dispatch(actions.DESTROY(currentId));
                setCurrentId(0);
                setFormVisible(false);
            }
        });
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        if (currentId === 0) {
                            // , name: user?.result?.name
                            dispatch(actions.CREATE({ ...values }, setFormVisible));
                        } else {
                            dispatch(actions.UPDATE(currentId, { ...values }, setFormVisible));
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
                    {items.map((item, index) => {
                        // 4 columns
                        let xl = 3,
                            lg = 4,
                            md = 4,
                            sm = 6,
                            xs = 12;

                        if (item.column === 3) {
                            xl = 4;
                            lg = 4;
                            md = 4;
                            sm = 6;
                            xs = 12;
                        }

                        if (item.column === 2) {
                            xl = 6;
                            lg = 6;
                            md = 6;
                            sm = 6;
                            xs = 12;
                        }

                        if (item.column === 1) {
                            xl = 12;
                            lg = 12;
                            md = 12;
                            sm = 12;
                            xs = 12;
                        }

                        return (
                            <React.Fragment key={index}>
                                <Grid container spacing={1} sx={{ mt: 1 }}>
                                    {item.items.map((column, i) => {
                                        return (
                                            <Grid key={i} item lg={lg} md={md} sm={sm} xs={xs}>
                                                {column.type === 'text' ? (
                                                    <JTextField
                                                        label={column.label}
                                                        name={column.field}
                                                        value={values[column.field]}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        touched={touched}
                                                        errors={errors}
                                                    />
                                                ) : column.type === 'select' ? (
                                                    <JSelect
                                                        label={column.label}
                                                        labelId={column.field}
                                                        id={column.field}
                                                        name={column.field}
                                                        value={values[column.field]}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        touched={touched}
                                                        errors={errors}
                                                    >
                                                        {column.data.map((menu, menuIndex) => (
                                                            <MenuItem key={menuIndex} value={menu[column.dataFieldValue]}>
                                                                {menu[column.dataFieldText]}
                                                            </MenuItem>
                                                        ))}
                                                    </JSelect>
                                                ) : (
                                                    ''
                                                )}
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </React.Fragment>
                        );
                    })}
                    <Box sx={{ mt: 2 }}>
                        <ButtonGroup variant="contained" aria-label="outlined button group">
                            <Button size="small" disabled={isSubmitting} type="submit">
                                Save
                            </Button>
                            <Button size="small" onClick={resetForm}>
                                Cancel
                            </Button>
                            {currentId ? (
                                <Button size="small" color="error.main" onClick={handleDelete}>
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

export default AppForm;
