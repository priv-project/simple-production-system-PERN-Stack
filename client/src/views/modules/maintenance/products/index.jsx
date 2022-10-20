import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// import ProductGrid from './Grid';
import ProductGrid from 'views/modules/maintenance/products/Grid';
import ProductForm from './Form';
import { Toolbar, PartGridToolbar } from './Toolbar';

// ACTIONS
import { getProducts } from 'actions/products';
import { getParts } from 'actions/parts';
// ==============================|| SAMPLE PAGE ||============================== //

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const parts = useSelector((state) => state.parts);
    const [formVisible, setFormVisible] = React.useState(false);
    const [currentId, setCurrentId] = React.useState(0);

    const [partFormVisible, setPartFormVisible] = React.useState(false);
    const [partCurrentId, setPartCurrentId] = React.useState(0);

    React.useEffect(() => {
        dispatch(getProducts());
        dispatch(getParts());
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
