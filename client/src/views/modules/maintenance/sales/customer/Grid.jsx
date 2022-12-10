import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

// ACTIONS
import { getCustomers, deleteCustomer } from 'redux/maintenance/sales/actions/customer';

const Grid = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers);

    React.useEffect(() => {
        dispatch(getCustomers());
    }, [currentId, dispatch]);

    const columns = [
        { field: 'customer_code', headerName: 'Code', minWidth: 130 },
        { field: 'customer_desc', headerName: 'Description', minWidth: 250 },
        { field: 'customer_email', headerName: 'Email', minWidth: 150 },
        { field: 'customer_contact', headerName: 'Contact', minWidth: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Box>
                        <VisibilityIcon
                            onClick={(e) => handleView(e, params.row)}
                            fontSize="small"
                            sx={{
                                color: 'grey[50]',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        />
                        <DeleteOutlineIcon
                            onClick={(e) => handleDelete(e, params.row)}
                            fontSize="small"
                            sx={{
                                color: 'error.main',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        />
                    </Box>
                );
            }
        }
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
                dispatch(deleteCustomer(row.customer_id));
                setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        console.log(row.customer_id);
        setCurrentId(row.customer_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={customers}
                columns={columns}
                getRowId={(row) => row.customer_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
            />
        </div>
    );
};

export default Grid;
