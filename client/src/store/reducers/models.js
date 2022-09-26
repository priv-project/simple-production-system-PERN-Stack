import * as actionTypes from '../customActionTypes';

export default (models = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return action.payload.result;
        case actionTypes.CREATE:
            return [...models, action.payload.result];
        case actionTypes.UPDATE:
            return models.map((model) => (model._id === action.payload._id ? action.payload : post));
        case actionTypes.DELETE:
            return models.filter((model) => model._id !== action.payload);
        default:
            return models;
    }
};
