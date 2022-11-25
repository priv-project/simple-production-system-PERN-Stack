import { combineReducers } from 'redux';

// reducer import
import customizationReducer from 'store/customizationReducer';
import auth from 'reducers/auth';
import error from 'reducers/error';
import models from 'reducers/maintenance/composite/models';
import products from 'reducers/maintenance/composite/products';
import assembly from 'reducers/maintenance/composite/assembly';
import parts from 'reducers/maintenance/composite/parts';
import product_parts from 'reducers/maintenance/composite/product_parts';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    error,
    auth,
    models,
    products,
    assembly,
    parts,
    product_parts
});

export default reducer;
