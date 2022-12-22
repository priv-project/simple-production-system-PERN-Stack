import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { Grid, Box, Button, Alert, Stack, Tabs, Tab } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { getCustomers, createProductCustomer } from 'redux/maintenance/sales/actions/customer';

const AppGrid = ({ setAddGridVisible }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.customers);
    const [selectionModel, setSelectionModel] = React.useState([]);

    React.useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const handleSave = () => {
        console.log(selectionModel);
        alert('ok');
    };

    const ToolbarTemplate = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" startIcon={<CheckRoundedIcon />} sx={{ fontWeight: '600' }} onClick={handleSave}>
                    Save
                </Button>
                <Button
                    size="small"
                    startIcon={<KeyboardReturnRoundedIcon />}
                    sx={{ fontWeight: '600' }}
                    onClick={() => setAddGridVisible(false)}
                >
                    Return
                </Button>
            </GridToolbarContainer>
        );
    };

    const columns = [{ field: 'customer_code', headerName: 'Customer', minWidth: 250 }];

    return (
        <Box>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.customer_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{ Toolbar: ToolbarTemplate }}
                componentsProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 250 }
                    }
                }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                autoHeight={true}
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
        </Box>
    );
};

export default AppGrid;
