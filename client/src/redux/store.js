import { configureStore } from '@reduxjs/toolkit';

import customizationReducer from 'store/customizationReducer';
import partReducer from 'redux/part';
import modelReducer from 'redux/model';

export const store = configureStore({
    reducer: {
        customization: customizationReducer,
        parts: partReducer,
        models: modelReducer
    }
});
