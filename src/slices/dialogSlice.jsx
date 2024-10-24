import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    open: false,
    title: '',
    content: <></>,
    actions: null,
    className: '',
    style: {},
    sx: {},
}
const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { title, content, actions, className, style, sx } = action.payload;
            state.open = true;
            state.title = title;
            state.content = content;
            state.actions = actions;
            state.className = className || '';
            state.style = style || {};
            state.sx = sx || {};
        },
        closeDialog: (state) => {
            state.open = false;
            state.title = '';
            state.content = <></>;
            state.actions = null;
            state.className = '';
            state.style = {};
            state.sx = {};
        },
    },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
