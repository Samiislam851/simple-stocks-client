import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "../../feature/User/UserSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import StocksSlice from "../../feature/Stocks/StocksSlice";

const persistConfig = {
    key: 'root',
    storage,
}
const reducer = combineReducers({
    user: UserSlice,
    stocks: StocksSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore(
    {
        reducer: persistedReducer
    }
)
export default store;
export const persistor = persistStore(store);