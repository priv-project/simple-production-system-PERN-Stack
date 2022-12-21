import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { Grid, Box, Alert, Stack, Tabs, Tab } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { deleteProduct, getProducts } from 'redux/maintenance/composite/actions/products';

const AppGrid = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.products);

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const columns = [
        { field: 'product_code', headerName: 'Product Code', minWidth: 250 },
        { field: 'model_code', headerName: 'Model Code', flex: 1 }
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     renderCell: (params) => {
        //         return (
        //             <Box>
        //                 <VisibilityIcon
        //                     onClick={(e) => handleView(e, params.row)}
        //                     fontSize="small"
        //                     sx={{
        //                         color: 'grey[50]',
        //                         '&:hover': {
        //                             cursor: 'pointer'
        //                         }
        //                     }}
        //                 />
        //                 <DeleteOutlineIcon
        //                     onClick={(e) => handleDelete(e, params.row)}
        //                     fontSize="small"
        //                     sx={{
        //                         color: 'error.main',
        //                         '&:hover': {
        //                             cursor: 'pointer'
        //                         }
        //                     }}
        //                 />
        //             </Box>
        //         );
        //     }
        // }
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
        console.log(params);
    };

    return (
        <Box>
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
            />
        </Box>
    );
};

export default AppGrid;
