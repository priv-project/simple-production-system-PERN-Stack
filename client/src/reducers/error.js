import * as actionTypes from 'constants/actionTypes';

export default (error = [], action) => {
    switch (action.type) {
        case actionTypes.ERROR:
            return action.payload;
        case actionTypes.UPDATE_ERROR:
            return { isError: false, data: [] };
        // case actionTypes.UPDATE_MODEL:
        //     console.log(models);
        //     return models.map((model) => (model.model_id === action.payload.result.model_id ? action.payload.result : model));
        // case actionTypes.DELETE_MODEL:
        //     return models.filter((model) => model.model_id !== action.payload);
        default:
            return error;
    }
};
