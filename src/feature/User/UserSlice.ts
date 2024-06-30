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
            state.loading = true;
            state.error = null; // Clear any previous errors
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null; // Clear any previous errors
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null; // Clear any previous errors
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null; // Clear any previous errors
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.setItem('jwt', '');
        },
    }
});
export const { loginStart, loginSuccess, loginFailure, logout,registerStart, registerSuccess,registerFailure } = userSlice.actions
export default userSlice.reducer;