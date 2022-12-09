import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Grid, Box, MenuItem, Button, ButtonGroup } from '@mui/material';
// MATERIAL ICONS

// project imports
import AppForm from 'components/AppForm';

// third areay
import * as Yup from 'yup';

// ACTIONS
import { createArea, updateArea, deleteArea } from 'redux/maintenance/common/actions/area';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();

    const [areaData, setAreaData] = React.useState({
        area_code: '',
        area_desc: '',
        area_created_at: '',
        area_updated_a: ''
    });
    const area = useSelector((state) => (currentId ? state.areas.find((area) => area.area_id === currentId) : null));

    React.useEffect(() => {
        if (area) setAreaData(area);
    }, [area, dispatch]);

    return (
        <AppForm
            initialValues={areaData}
            validationSchema={Yup.object().shape({
                area_code: Yup.string().min(2, 'Minimum value is 2.').max(50, 'Maximum value is 50.').required('This field is required'),
                area_desc: Yup.string().min(4, 'Minimum value is 4.').max(300, 'Maximum value is 300.')
            })}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setFormVisible={setFormVisible}
            actions={{
                CREATE: createArea,
                UPDATE: updateArea,
                DESTROY: deleteArea
            }}
            items={[
                {
                    column: 3,
                    items: [{ field: 'area_code', label: 'Area Code:', type: 'text' }]
                },
                {
                    column: 3,
                    items: [{ field: 'area_desc', label: 'Area Description:', type: 'text' }]
                }
            ]}
        />
    );
};

export default Form;
