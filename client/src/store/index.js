import { configureStore } from '@reduxjs/toolkit';
import reducer from 'reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({ reducer });

const persister = 'Free';

export { store, persister };
