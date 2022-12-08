import { configureStore } from '@reduxjs/toolkit';

import customizationReducer from 'store/customizationReducer';
import errorReducer from 'redux/error';
import partReducer from 'redux/maintenance/composite/part';
import modelReducer from 'redux/maintenance/composite/model';
import assemblyReducer from 'redux/maintenance/composite/assembly';
import productReducer from 'redux/maintenance/composite/product';
import productPartsReducer from 'redux/maintenance/composite/product_part';
import authReducer from 'redux/auth';

import supplierReducer from 'redux/maintenance/purchasing/supplier';

/* Maintenance/Common Reducer */
import currencyReducer from 'redux/maintenance/common/currency';
import countryReducer from 'redux/maintenance/common/country';

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    reducer: {
        customization: customizationReducer,
        error: errorReducer,
        auth: authReducer,
        /* COMPOSITE */
        models: modelReducer,
        parts: partReducer,
        assembly: assemblyReducer,
        products: productReducer,
        product_parts: productPartsReducer,
        /* PURCHASING */
        suppliers: supplierReducer,
        /* COMMON */
        countries: countryReducer,
        currencies: currencyReducer
    }
});
