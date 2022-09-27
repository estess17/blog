import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface darkState {
    isDark: boolean;
}

const initialState: darkState = {
    isDark: localStorage.theme === 'dark',
};

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<boolean>) => {
            state.isDark = action.payload;

            if (state.isDark) {
                localStorage.theme = 'dark';
                document.documentElement.classList.add('dark');
            } else {
                localStorage.theme = 'light';
                document.documentElement.classList.remove('dark');
            }
        },
    },
});

export const {toggle} = darkModeSlice.actions;
export default darkModeSlice.reducer;