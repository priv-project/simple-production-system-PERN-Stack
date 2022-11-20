import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/system';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { getProductParts } from 'actions/product_parts';

const PartGrid = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product_parts).filter((e) => {
        return e.product_id === currentId;
    });
    console.log(data);
    React.useEffect(() => {
        dispatch(getProductParts());
    }, [dispatch, currentId]);

    const columns = [
        { field: 'part_code', headerName: 'Part Code', minWidth: 130, flex: 1 },
        { field: 'part_description', headerName: 'Description', minWidth: 200, flex: 1 },
        { field: 'model_code', headerName: 'Model', minWidth: 135, flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
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
                // dispatch(deleteProduct(row.part_id));
                setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.part_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.part_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // components={{ Toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default PartGrid;
