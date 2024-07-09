import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entry_id: '',
    auth_id: '',
    accountDetails: [],
    reloadlyAccessToken: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
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
    updateReloadlyAccessToken
} = accountSlice.actions;

export default accountSlice.reducer;