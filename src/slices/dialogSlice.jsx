import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    open: false,
    title: '',
    content: <></>,
    actions: null,
    className: '',
    style: {},
    sx: {},
    isNoContentPadding: false
}
const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { title, content, actions, className, style, sx, isNoContentPadding } = action.payload;
            state.open = true;
            state.title = title;
            state.content = content;
            state.actions = actions;
            state.className = className || '';
            state.style = style || {};
            state.sx = sx || {};
            state.isNoContentPadding = isNoContentPadding || false
        },
        closeDialog: (state) => {
            state.open = false;
            state.title = '';
            state.content = <></>;
            state.actions = null;
            state.className = '';
            state.style = {};
            state.sx = {};
            state.isNoContentPadding = false;
        },
        setDialogTitle: (state, action) => {
            state.title = action.payload
        }
    },
});

export const { openDialog, closeDialog,setDialogTitle } = dialogSlice.actions;
export default dialogSlice.reducer;
