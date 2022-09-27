import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Button, ButtonGroup, Box, TextField, Grid } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';

// MATERIAL ICONS

// ACTIONS
import { createModel, updateModel, deleteModel } from 'actions/models';

const Form = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const [modelData, setModelData] = React.useState({
        model_code: '',
        model_description: '',
        model_created_date: '',
        model_updated_at: ''
    });
    const model = useSelector((state) => (currentId ? state.models.find((model) => model.model_id === currentId) : null));

    const clear = () => {
        setCurrentId(0);
        setModelData({ model_code: '', model_description: '', model_created_date: '', model_updated_at: '' });
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            // , name: user?.result?.name
            dispatch(createModel({ ...modelData }, setFormVisible));
        } else {
            dispatch(updateModel(currentId, { ...modelData }, setFormVisible));
        }
    };

    React.useEffect(() => {
        if (model) setModelData(model);
    }, [model]);
    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item lg={4} md={4} sm={12}>
                    <TextField
                        size="small"
                        label="Model"
                        fullWidth
                        value={modelData.model_code}
                        onChange={(e) => setModelData({ ...modelData, model_code: e.target.value })}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item lg={4} md={4} sm={12}>
                    <TextField
                        size="small"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={modelData.model_description}
                        onChange={(e) => setModelData({ ...modelData, model_description: e.target.value })}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <ButtonGroup variant="contained" aria-label="outlined button group">
                    <Button size="small" type="submit">
                        Save
                    </Button>
                    <Button size="small" onClick={clear}>
                        Cancel
                    </Button>

                    <Button size="small" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </ButtonGroup>
            </Box>
        </form>
    );
};

export default Form;
