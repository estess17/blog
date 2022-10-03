import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import PostsService from '../../services/posts.service';


export const getAll = createAsyncThunk(
    'posts/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await PostsService.getPosts();
            return response.data;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

