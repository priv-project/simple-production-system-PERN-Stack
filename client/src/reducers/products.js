import * as actionTypes from 'constants/actionTypes';

export default (products = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS:
            return action.payload.result;
        case actionTypes.CREATE_PRODUCT:
            return [...products, action.payload.result];
        case actionTypes.UPDATE_PRODUCT:
            return products.map((product) => (product.product_id === action.payload.result.product_id ? action.payload.result : product));
        case actionTypes.DELETE_PRODUCT:
            return products.filter((product) => product.product_id !== action.payload);
        default:
            return products;
    }
};
