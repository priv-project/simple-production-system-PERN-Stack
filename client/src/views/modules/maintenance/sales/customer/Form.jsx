import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI

// MATERIAL ICONS

// project imports
import AppForm from 'components/AppForm';

// third customery
import * as Yup from 'yup';

// ACTIONS
import { createCustomer, updateCustomer, deleteCustomer } from 'redux/maintenance/sales/actions/customer';
import { getCountrys } from 'redux/maintenance/common/actions/country';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();

    const [customerData, setCustomerData] = React.useState({
        customer_code: '',
        customer_desc: '',
        customer_street: '',
        customer_city: '',
        customer_country_id: '',
        customer_contact: '',
        customer_email: '',
        customer_created_at: '',
        customer_updated_at: ''
    });
    const customer = useSelector((state) => (currentId ? state.customers.find((customer) => customer.customer_id === currentId) : null));
    const countrys = useSelector((state) => state.countries);
    const requiredMessage = 'This field is required';

    React.useEffect(() => {
        if (customer) setCustomerData(customer);
        dispatch(getCountrys());
    }, [customer, dispatch]);

    return (
        <AppForm
            initialValues={customerData}
            validationSchema={Yup.object().shape({
                customer_code: Yup.string().min(2, 'Minimum value is 2.').max(50, 'Maximum value is 50.').required(requiredMessage),
                customer_desc: Yup.string().min(4, 'Minimum value is 4.').max(300, 'Maximum value is 300.'),
                customer_street: Yup.string().max(75, 'Maximum value is 75'),
                customer_city: Yup.string().max(50, 'Maximum value is 50.'),
                customer_country_id: Yup.number().required(requiredMessage),
                customer_contact: Yup.string().required(requiredMessage),
                customer_email: Yup.string().email('Not a valid email!').required(requiredMessage)
            })}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setFormVisible={setFormVisible}
            actions={{
                CREATE: createCustomer,
                UPDATE: updateCustomer,
                DESTROY: deleteCustomer
            }}
            items={[
                {
                    column: 3,
                    items: [
                        { field: 'customer_code', label: 'Customer Code', type: 'text' },
                        { field: 'customer_desc', label: 'Customer Desription', type: 'text' }
                    ]
                },
                {
                    column: 3,
                    items: [
                        { field: 'customer_city', label: 'City', type: 'text' },
                        { field: 'customer_street', label: 'Street', type: 'text' },
                        {
                            field: 'customer_country_id',
                            label: 'City',
                            type: 'select',
                            data: countrys,
                            dataFieldValue: 'country_id',
                            dataFieldText: 'country_code'
                        }
                    ]
                },
                {
                    column: 2,
                    items: [
                        { field: 'customer_contact', label: 'Contact', type: 'text' },
                        { field: 'customer_email', label: 'Email', type: 'text', flexGrow: 1 }
                    ]
                }
            ]}
        />
    );
};

export default Form;
