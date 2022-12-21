import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Grid from './Grid';
// import Form from './Form';
// import Toolbar from './Toolbar';

// ACTIONS

// ==============================|| SAMPLE PAGE ||============================== //

const Packing = () => {
    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = React.useState(null);
    return (
        <MainCard title="Product Customer">
            <Grid />
        </MainCard>
    );
};

export default Packing;
