import * as actionTypes from 'constants/actionTypes';

export default (products = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT:
            return action.payload.result;
        case actionTypes.CREATE:
            return [...products, action.payload.result];
        case actionTypes.UPDATE:
            return products.map((product) => (product.product_id === action.payload.result.product_id ? action.payload.result : product));
        case actionTypes.DELETE:
            return products.filter((product) => product.product_id !== action.payload);
        default:
            return products;
    }
};
