import * as actionTypes from 'constants/actionTypes';

export default (models = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_MODELS:
            return action.payload.result;
        case actionTypes.CREATE:
            return [...models, action.payload.result];
        case actionTypes.UPDATE:
            return models.map((model) => (model.model_id === action.payload.result.model_id ? action.payload.result : model));
        case actionTypes.DELETE:
            return models.filter((model) => model.model_id !== action.payload);
        default:
            return models;
    }
};
