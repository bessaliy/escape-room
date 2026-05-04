import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api.ts';
import 'leaflet/dist/leaflet.css';

import {rootReducer} from './root-reducer.ts';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

