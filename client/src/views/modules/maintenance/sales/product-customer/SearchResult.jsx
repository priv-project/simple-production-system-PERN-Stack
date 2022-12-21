import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid, Item, Container } from '@mui/material';

// ACTIONS
import { getProducts } from 'redux/maintenance/composite/actions/products';

const SearchResult = ({ searchVal, setData }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products).filter(
        (el) =>
            el.product_code.toLowerCase().includes(searchVal?.toLowerCase()) ||
            el.product_description.toLowerCase().includes(searchVal?.toLowerCase())
    );

    React.useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, searchVal]);

    return (
        <Grid container spacing={1}>
            {products.map((product) => (
                <Grid item key={product.product_id} xs={12} sm={6} md={6} lg={6} sx={{}}>
                    <Box
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: '#fff',
                                background: '#673ab7'
                            },
                            border: '1px solid #0000000f',
                            padding: '10px 30px',
                            fontSize: 11,
                            textAlign: 'left',
                            borderRadius: '10px'
                            // borderLeft: '10px solid #e3f2fd'
                        }}
                        onClick={() => setData(product)}
                    >
                        {product.product_code}
                    </Box>
                </Grid>
            ))}
            {products.length === 0 ? 'No records found...' : ''}
        </Grid>
    );
};

export default SearchResult;
