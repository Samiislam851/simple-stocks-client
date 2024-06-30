import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    stocksData: null,
    loading: false,
    error: null
}

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        updateStocks : (state,action)=>{
            state.stocksData = action.payload
        }
    }
})

export const { updateStocks } = stocksSlice.actions
export default stocksSlice.reducer;