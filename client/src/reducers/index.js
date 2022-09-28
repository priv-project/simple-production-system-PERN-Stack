import { combineReducers } from 'redux';

// reducer import
import customizationReducer from 'store/customizationReducer';
import auth from 'reducers/auth';
import models from 'reducers/models';
import products from 'reducers/products';
import assembly from 'reducers/assembly';
import parts from 'reducers/parts';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    auth,
    models,
    products,
    assembly,
    parts
});

export default reducer;
