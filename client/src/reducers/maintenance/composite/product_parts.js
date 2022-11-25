import * as actionTypes from 'constants/actionTypes';

export default (product_parts = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_PARTS:
            return action.payload.result;
        case actionTypes.CREATE_PRODUCT_PART:
            return action.payload.result;
        // case actionTypes.UPDATE_PRODUCT:
        //     return products.map((product) => (product.product_id === action.payload.result.product_id ? action.payload.result : product));
        // case actionTypes.DELETE_PRODUCT:
        //     return products.filter((product) => product.product_id !== action.payload);
        // case actionTypes.FETCH_PRODUCT_PARTS:
        //     return products.filter((product) => product.product_id !== action.payload);
        default:
            return product_parts;
    }
};
