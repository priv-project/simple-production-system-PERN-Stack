import { configureStore } from '@reduxjs/toolkit';

import customizationReducer from 'store/customizationReducer';
import partReducer from 'redux/maintenance/composite/part';
import modelReducer from 'redux/maintenance/composite/model';
import assemblyReducer from 'redux/maintenance/composite/assembly';
import productReducer from 'redux/maintenance/composite/product';
import productPartsReducer from 'redux/maintenance/composite/product_part';
import authReducer from 'redux/auth';

export const store = configureStore({
    reducer: {
        customization: customizationReducer,
        auth: authReducer,
        models: modelReducer,
        parts: partReducer,
        assembly: assemblyReducer,
        products: productReducer,
        product_parts: productPartsReducer
    }
});
