import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import PostsService from '../../services/posts.service';
import {JSONContent} from '@tiptap/react';


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

export const create = createAsyncThunk(
    'posts/create',
    async (post: { title: string, body: JSONContent }, thunkAPI) => {
        try {
            const response = await PostsService.createPost(post);
            toast.success('Post created!');
            return response.data;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const remove = createAsyncThunk(
    'posts/remove',
    async (id: string, thunkAPI) => {
        try {
            const response = await PostsService.removePost(id);
            toast.success('Post deleted!');
            return response.data;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const update = createAsyncThunk(
    'posts/update',
    async ({post, id}: { post: { title: string, body: JSONContent }, id: string }, thunkAPI) => {
        try {
            const response = await PostsService.updatePost(post, id);
            toast.success('Post updated!');
            return response.data;
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    },
);


