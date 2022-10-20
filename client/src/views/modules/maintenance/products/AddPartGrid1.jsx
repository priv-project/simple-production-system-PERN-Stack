import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// MATERIAL UI
import { DataGrid, GridToolbarContainer, useGridApiRef } from '@mui/x-data-grid';
import { Button, TextField, Box } from '@mui/material';

// MATERIAL ICONS
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';

// PROJECT IMPORTS
import JTextField from 'components/JTextField';

// ACTIONS
import { deleteProduct } from 'actions/products';

const AddPartGrid = ({ data, setAddPartGridVisible }) => {
    const dispatch = useDispatch();
    const apiRef = useGridApiRef();
    let [selectionModel, setSelectionModel] = React.useState([]);
    let [dataGrid, setDataGrid] = React.useState([]);
    console.log(dataGrid);
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <Button size="small" startIcon={<SaveIcon />} sx={{ fontWeight: '600' }} onClick={handleSave}>
                    SAVE
                </Button>
            </GridToolbarContainer>
        );
    };

    const columns = [
        { field: 'part_code', headerName: 'Part Code', width: 200 },
        {
            field: 'part_usage',
            headerName: 'Usage',
            width: 150,
            valueGetter: function getFullName(params) {
                return 1;
            },
            editable: true
            // renderCell: (params) => {
            //     return (
            //         <TextField
            //             type="number"
            //             InputLabelProps={{
            //                 shrink: true
            //             }}
            //             defaultValue={1}
            //             variant="standard"
            //             onChange={(e) => {
            //                 setSelectionModel((selectionModel) => {
            //                     if (selectionModel.includes(params.id)) {
            //                         return selectionModel; // return if already selected
            //                     }

            //                     return [...selectionModel, params.id];
            //                 });

            //                 setDataGrid([...dataGrid, { part_id: params.id, part_usage: e.target.value }]);
            //                 console.log(dataGrid);
            //             }}
            //         />
            //     );
            // }
        }
    ];

    const handleSave = () => {
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
                console.log(apiRef.current.setPage(1));
                // dispatch(deleteProduct(row.product_id));
                // setCurrentId(0);
            }
        });
    };
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
                // dispatch(deleteProduct(row.product_id));
                // setCurrentId(0);
            }
        });
    };

    const handleView = (e, row) => {
        e.stopPropagation();
        setCurrentId(row.part_id);
        setFormVisible(true);
    };

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.part_id}
                checkboxSelection
                disableSelectionOnClick
                components={{ Toolbar: CustomToolbar }}
                selectionModel={selectionModel}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel); // Handle default Data Grid selection

                    const selectedRowsData = newSelectionModel.map((id) => rows.find((row) => row.id === id));
                    console.log(selectedRowsData);
                }}
                pageSize={5}
                rowHeight={38}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </div>
    );
};

export default AddPartGrid;
