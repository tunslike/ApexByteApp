import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountDetails: [],
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        updateAccountDetails: (state, action) => {
            state.accountDetails = action.payload
        },
    },
})

export const {} = accountSlice.actions;

export default accountSlice.reducer;