import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid, Box, Alert, Stack, Tabs, Tab } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ACTIONS
import { deleteProduct, getProducts } from 'redux/maintenance/composite/actions/products';

// PROJECT IMPORTS
import GridProductCustomer from './GridProductCustomer';

// ==============================|| SAMPLE PAGE ||============================== //

const Packing = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.products);
    const [detailVisible, setDetailVisible] = React.useState(false);
    const [addGridVisible, setAddGridVisible] = React.useState(false);

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const columns = [
        { field: 'product_code', headerName: 'Product Code', minWidth: 150 },
        { field: 'model_code', headerName: 'Model Code', flex: 1 }
    ];

    const handleDelete = (e, row) => {
        e.stopPropagation();
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
                dispatch(deleteProduct(row.product_id));
                // setCurrentId(0);
            }
        });
    };

    const handleRowClick = (params) => {
        setDetailVisible(true);
        setAddGridVisible(false);
    };

    return (
        <MainCard title="Product Customer">
            <Grid container spacing={2}>
                <Grid item sm={12} md={3} lg={3}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        getRowId={(row) => row.product_id}
                        onRowClick={handleRowClick}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{ Toolbar: GridToolbar }}
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
                        sx={{ maxWidth: 450 }}
                    />
                </Grid>
                <Grid item flex={1}>
                    <Box>
                        <Stack sx={{ width: '100%' }}>
                            {detailVisible ? (
                                <GridProductCustomer addGridVisible={addGridVisible} setAddGridVisible={setAddGridVisible} />
                            ) : (
                                <Alert severity="info" icon={<CallReceivedIcon />}>
                                    Select product from list...
                                </Alert>
                            )}
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Packing;