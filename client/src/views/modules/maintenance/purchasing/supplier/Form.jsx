import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI

// MATERIAL ICONS

// project imports
import AppForm from 'components/AppForm';

// third suppliery
import * as Yup from 'yup';

// ACTIONS
import { createSupplier, updateSupplier, deleteSupplier } from 'redux/maintenance/purchasing/actions/supplier';
import { getCountrys } from 'redux/maintenance/common/actions/country';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();

    const [supplierData, setSupplierData] = React.useState({
        supplier_code: '',
        supplier_desc: '',
        supplier_street: '',
        supplier_country_id: '',
        supplier_contact: '',
        supplier_email: '',
        supplier_tel_num: '',
        supplier_fax_num: '',
        supplier_status: '',
        supplier_created_at: '',
        supplier_updated_a: ''
    });
    const supplier = useSelector((state) => (currentId ? state.suppliers.find((supplier) => supplier.supplier_id === currentId) : null));
    const countries = useSelector((state) => state.countries);

    React.useEffect(() => {
        if (supplier) setSupplierData(supplier);
        dispatch(getCountrys());
    }, [supplier, dispatch]);

    return (
        <AppForm
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
                supplier_email: Yup.string().email('Not a valid email!').required('This field is required'),
                supplier_tel_num: Yup.string(),
                supplier_fax_num: Yup.string()
            })}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setFormVisible={setFormVisible}
            actions={{
                CREATE: createSupplier,
                UPDATE: updateSupplier,
                DESTROY: deleteSupplier
            }}
            items={[
                {
                    column: 2,
                    items: [
                        { field: 'supplier_code', label: 'Supplier Code:', type: 'text' },
                        { field: 'supplier_desc', label: 'Supplier Description:', type: 'text' }
                    ]
                },
                {
                    column: 3,
                    items: [
                        { field: 'supplier_street', label: 'Street:', type: 'text' },
                        {
                            field: 'supplier_country_id',
                            label: 'Country:',
                            type: 'select',
                            data: countries,
                            dataFieldText: 'country_code',
                            dataFieldValue: 'country_id'
                        },
                        { field: 'supplier_contact', label: 'Contact:', type: 'text' }
                    ]
                },
                {
                    column: 3,
                    items: [
                        { field: 'supplier_email', label: 'Email:', type: 'text' },
                        { field: 'supplier_tel_num', label: 'Telephone Number:', type: 'text' },
                        { field: 'supplier_fax_num', label: 'Fax Number:', type: 'text' }
                    ]
                }
            ]}
        />
    );
};

export default Form;
