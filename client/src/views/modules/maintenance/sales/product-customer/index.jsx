import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import Grid from './Grid';
// import Form from './Form';
// import Toolbar from './Toolbar';

// ACTIONS

// ==============================|| SAMPLE PAGE ||============================== //

const Packing = () => {
    const dispatch = useDispatch();

    return (
        <MainCard title="Product Customer">
            <TextField
                placeholder="Search product..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>
                    )
                }}
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    mb: 3
                }}
            />
            <Grid container>
                <Grid item>Product Test 1</Grid>
                <Grid item>Product Test 2</Grid>
                <Grid item>Product Test 3</Grid>
                <Grid item>Product Test 4</Grid>
                <Grid item>Product Test 5</Grid>
                <Grid item>Product Test 6</Grid>
                <Grid item>Product Test 7</Grid>
                <Grid item>Product Test 8</Grid>
                <Grid item>Product Test 9</Grid>
                <Grid item>Product Test 10</Grid>
            </Grid>
        </MainCard>
    );
};

export default Packing;
