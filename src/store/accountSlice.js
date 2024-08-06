import { createSlice } from "@reduxjs/toolkit";
import Clipboard from '@react-native-clipboard/clipboard';

const initialState = {
    entry_id: '',
    auth_id: '',
    accountDetails: [],
    reloadlyAccessToken: '',
    copiedText: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        copyToClipboard: (state, action) => {
            state.copiedText = action.payload;
            Clipboard.setString(action.payload);
        },
        updateAuthID: (state, action) => {
            state.auth_id = action.payload
        },
        updateEntryID: (state, action) => {
            state.entry_id = action.payload
        },
        updateAccountDetails: (state, action) => {
            state.accountDetails = action.payload
        },
        updateReloadlyAccessToken: (state, action) => {
            state.reloadlyAccessToken = action.payload
        }
    },
})

export const {
    updateAccountDetails,
    updateAuthID,
    updateEntryID,
    updateReloadlyAccessToken,
    copyToClipboard
} = accountSlice.actions;

export default accountSlice.reducer;