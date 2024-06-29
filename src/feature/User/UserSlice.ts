import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
     
        registerStart: (state) => {
            state.loading = true
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null;
            localStorage.setItem('jwt', '')
        },
        
    }

})
export const { loginStart, loginSuccess, loginFailure, logout,registerStart, registerSuccess,registerFailure } = userSlice.actions
export default userSlice.reducer;