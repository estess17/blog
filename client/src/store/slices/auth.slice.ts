import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../utils/interfaces';
import {logout, login, register, getProfile} from '../asyncActions/auth.actions';


interface AuthState {
    user: IUser | null,
    accessToken: string | null,
    isLoading: boolean
}

const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

const initialState: AuthState = {
    user: null,
    accessToken,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [register.fulfilled.type]: (state, action: PayloadAction<{ access_token: string, user: IUser }>) => {
            const {access_token, user} = action.payload;
            state.isLoading = false;
            state.accessToken = access_token;
            state.user = user;
        },
        [register.pending.type]: (state) => {
            state.isLoading = true;
        },
        [register.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [login.fulfilled.type]: (state, action: PayloadAction<{ access_token: string, user: IUser }>) => {
            const {access_token, user} = action.payload;
            state.isLoading = false;
            state.accessToken = access_token;
            state.user = user;
        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [getProfile.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        [getProfile.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getProfile.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [logout.fulfilled.type]: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isLoading = false;
        },
    },
});


export default authSlice.reducer;