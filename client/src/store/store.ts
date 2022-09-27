import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import postsSlice from './slices/posts.slice';
import darkModeSlice from './slices/dark-mode.slice';
import modalsSlice from './slices/modals.slice';


export const store = configureStore({
    reducer: {
        darkMode: darkModeSlice,
        modals: modalsSlice,
        posts: postsSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;