import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';
import {userProcess} from './user-process/user-process';
import {dataProcess} from './data-process/data-process';
import {appProcess} from './app-process/app-process';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [userProcess.name]: userProcess.reducer,
    [dataProcess.name]: dataProcess.reducer,
    [appProcess.name]: appProcess.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
