import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import auth from './reducers/auth';
import models from './reducers/models';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    auth,
    models
});

export default reducer;
