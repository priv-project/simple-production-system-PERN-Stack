import * as actionTypes from 'constants/actionTypes';

export default (models = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_MODELS:
            return action.payload.result;
        case actionTypes.CREATE_MODEL:
            return [...models, action.payload.result];
        case actionTypes.UPDATE_MODEL:
            console.log(models);
            return models.map((model) => (model.model_id === action.payload.result.model_id ? action.payload.result : model));
        case actionTypes.DELETE_MODEL:
            return models.filter((model) => model.model_id !== action.payload);
        default:
            return models;
    }
};
