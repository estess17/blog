import {createSlice} from '@reduxjs/toolkit';


interface modalsState {
    isLogin: boolean,
    isRegister: boolean,
}

const initialState: modalsState = {
    isLogin: false,
    isRegister: false
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openLogin: (state) => {
            state.isRegister = false;
            state.isLogin = true;
        },
        closeLogin: (state) => {
            state.isRegister = false;
            state.isLogin = false;
        },
        openRegister: (state) => {
            state.isRegister = true;
            state.isLogin = false;
        },
        closeRegister: (state) => {
            state.isRegister = false;
            state.isLogin = false;
        },
    },
});

export const {openLogin, closeLogin, openRegister, closeRegister} = modalsSlice.actions;
export default modalsSlice.reducer;