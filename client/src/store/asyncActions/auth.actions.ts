import {createAsyncThunk} from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import {closeLogin, closeRegister} from '../slices/modals.slice';
import {ILoginFormInputs, IRegisterFormInputs} from '../../utils/interfaces';
import {toast} from 'react-toastify';


export const register = createAsyncThunk(
    'auth/register',
    async (user: IRegisterFormInputs, thunkAPI) => {
        try {
            const response = await AuthService.register(user);
            thunkAPI.dispatch(closeRegister());
            toast.success('Sign Up Success');
            return response;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: ILoginFormInputs, thunkAPI) => {
        try {
            const response = await AuthService.login(user);
            thunkAPI.dispatch(closeLogin());
            toast.success('Log in Success');
            return response;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
});

export const getProfile = createAsyncThunk(
    'auth/profile',
    async (_, thunkAPI) => {
        try {
            const response = await AuthService.getProfile();
            return response.data;
        } catch (error: any) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    },
);