import { configureStore } from '@reduxjs/toolkit';

import customizationReducer from 'store/customizationReducer';
import partReducer from 'redux/part';
import modelReducer from 'redux/model';
import assemblyReducer from 'redux/assembly';
import productReducer from 'redux/product';
import productPartsReducer from 'redux/product_part';
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
