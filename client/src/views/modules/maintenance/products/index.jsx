import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import ProductGrid from './Grid';
import ProductGrid from 'views/modules/maintenance/products/Grid';
import ProductForm from './Form';
import Toolbar from './Toolbar';

import { getProducts } from 'actions/products';
// ==============================|| SAMPLE PAGE ||============================== //

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    useSelector((state) => console.log(state));
    React.useEffect(() => {
        dispatch(getProducts());
    }, [currentId, dispatch]);

    return (
        <MainCard title="PRODUCTS">
            <Toolbar formVisible={formVisible} setFormVisible={setFormVisible} setCurrentId={setCurrentId} />
            {formVisible ? (
                <ProductForm currentId={currentId} setCurrentId={setCurrentId} formVisible={formVisible} setFormVisible={setFormVisible} />
            ) : (
                <ProductGrid data={products} setCurrentId={setCurrentId} setFormVisible={setFormVisible} />
            )}
        </MainCard>
    );
};

export default ProductsPage;