import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    updateUser:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        signInSuccess: (state,action) => {
            state.currentUser = action.payload
        },

        updateData:(state,action) => {
            state.updateUser = action.payload
        }

    }
})

export const {signInSuccess , updateData} = userSlice.actions

export default userSlice.reducer