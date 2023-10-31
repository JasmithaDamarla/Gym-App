import { configureStore } from '@reduxjs/toolkit'
import loginStatusReducer from './LoginStatus'
import userDataReducer from './UserData'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key : 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    loginStatus : loginStatusReducer,
    userData : userDataReducer
});
 
const persistedReducer = persistReducer(persistConfig,reducer);

export const store = configureStore({
    reducer: persistedReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch