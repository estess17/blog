import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPost} from '../../utils/interfaces';
import {getAll} from '../asyncActions/posts.actions';


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
    },
});


export default postsSlice.reducer;