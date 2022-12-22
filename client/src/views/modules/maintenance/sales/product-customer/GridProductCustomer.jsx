import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { Grid, Box, Button } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// MATERIAL ICONS

// ACTIONS
import { getProductCustomers } from 'redux/maintenance/sales/actions/productCustomer';
import CustomerGrid from './CustomerGrid';

const AppGrid = ({ addGridVisible, setAddGridVisible }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product_customers);

    React.useEffect(() => {
        dispatch(getProductCustomers());
    }, [dispatch]);

    const columns = [
        { field: 'customer_code', headerName: 'Customer', minWidth: 250 },
        { field: 'customer_desc', headerName: 'Description', flex: 1 }
    ];

    const ToolbarTemplate = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" startIcon={<AddRoundedIcon />} sx={{ fontWeight: '600' }} onClick={() => setAddGridVisible(true)}>
                    Add Product Customer
                </Button>
            </GridToolbarContainer>
        );
    };

    return (
        <Box>
            {addGridVisible ? (
                <CustomerGrid setAddGridVisible={setAddGridVisible} />
            ) : (
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.prod_cust_id}
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
                />
            )}
        </Box>
    );
};

export default AppGrid;
