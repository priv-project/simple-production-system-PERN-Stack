import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ACTIONS
import { getCountrys, deleteCountry } from 'redux/maintenance/common/actions/country';

const Grid = ({ currentId, setCurrentId, setFormVisible }) => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    React.useEffect(() => {
        dispatch(getCountrys());
    }, [currentId, dispatch]);

    const columns = [
        { field: 'country_code', headerName: 'Code', minWidth: 200 },
        { field: 'country_desc', headerName: 'Description', minWidth: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
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
                dispatch(deleteCountry(row.country_id));
                setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.country_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={countries}
                columns={columns}
                getRowId={(row) => row.country_id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // components={{ Toolbar: CustomToolbar }}
            />
        </div>
    );
};

export default Grid;
