import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import models from './reducers/models';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    models
});

export default reducer;
