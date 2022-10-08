import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from '../../utils/interfaces';
import {create, getAll, remove, update} from '../asyncActions/posts.actions';


interface postsState {
    posts: IPost[],
    isLoading: boolean
}

const initialState: postsState = {
    posts: [],
    isLoading: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [getAll.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAll.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        [getAll.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [create.pending.type]: (state) => {
            state.isLoading = true;
        },
        [create.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.posts.unshift(action.payload);
        },
        [create.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [remove.pending.type]: (state) => {
            state.isLoading = true;
        },
        [remove.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        },
        [remove.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [update.pending.type]: (state) => {
            state.isLoading = true;
        },
        [update.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
            state.isLoading = false;
            state.posts = state.posts.map(post => post.id == action.payload.id ? action.payload : post);
        },
        [update.rejected.type]: (state) => {
            state.isLoading = false;
        },
    },
});


export default postsSlice.reducer;
