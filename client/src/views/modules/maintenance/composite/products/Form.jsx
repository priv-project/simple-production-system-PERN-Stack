import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Button, ButtonGroup, Box, Grid, MenuItem } from '@mui/material';

// MATERIAL ICONS

// project imports
import SubCard from 'ui-component/cards/SubCard';
import useScriptRef from 'hooks/useScriptRef';
import JTextField from 'components/JTextField';
import JSelect from 'components/JSelect';
import PartGrid from './PartGrid';
import AddPartGrid from './AddPartGrid';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ACTIONS
import { createProduct, updateProduct, deleteProduct } from 'redux/maintenance/composite/actions/products';
import { getModels } from 'redux/maintenance/composite/actions/models';
import { getParts } from 'redux/maintenance/composite/actions/parts';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
    const [productData, setProductData] = React.useState({
        product_code: '',
        product_description: '',
        product_model_id: '',
        product_remark: '',
        product_status: '',
        product_created_date: '',
        product_updated_at: ''
    });
    const product = useSelector((state) => (currentId ? state.products.find((product) => product.product_id === currentId) : null));
    const models = useSelector((state) => state.models);
    const parts = useSelector((state) => {
        return state.parts.map((e) => {
            return { ...e, part_usage: 1 };
        });
    });

    const [addPartGridVisible, setAddPartGridVisible] = React.useState(false);

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
                dispatch(deleteProduct(currentId));
                setFormVisible(false);
                setCurrentId(0);
            }
        });
    };

    React.useEffect(() => {
        if (product) setProductData(product);
        dispatch(getModels());
        dispatch(getParts());
    }, [product]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={productData}
                validationSchema={Yup.object().shape({
                    product_code: Yup.string(4)
                        .min(4, 'Minimum value is 4.')
                        .max(50, 'Maximum value is 4.')
                        .required('This field is required'),
                    product_description: Yup.string().max(200, 'This field is required.'),
                    product_model_id: Yup.number().required('This field is required'),
                    product_remark: Yup.string().max(200, 'Maximum value is 200.')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            if (currentId === 0) {
                                // , name: user?.result?.name
                                dispatch(createProduct({ ...values }, setFormVisible));
                            } else {
                                dispatch(updateProduct(currentId, { ...values }, setFormVisible));
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
                                    label="Product Code"
                                    name="product_code"
                                    value={values.product_code}
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
                                    name="product_description"
                                    value={values.product_description}
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
                                    labelId="product_model_id-label"
                                    id="product_model_id"
                                    name="product_model_id"
                                    value={values.product_model_id}
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
                                        labelId="product_status"
                                        name="product_status"
                                        value={values.product_status}
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
            {currentId !== 0 ? (
                <Box>
                    <SubCard title="Bill of Materials" sx={{ mt: 4 }}>
                        {addPartGridVisible ? (
                            <AddPartGrid setAddPartGridVisible={setAddPartGridVisible} data={parts} currentId={currentId} />
                        ) : (
                            <PartGrid currentId={currentId} setAddPartGridVisible={setAddPartGridVisible} />
                        )}
                    </SubCard>
                </Box>
            ) : (
                ''
            )}
        </>
    );
};

export default Form;
