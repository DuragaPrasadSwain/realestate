import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    updateUser:null,
    updateList:null
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
        },
        updateListData:(state,action) => {
            // console.log(state.updateList);
            state.updateList = action.payload
        },
    }
})

export const {signInSuccess , updateData, updateListData } = userSlice.actions

export default userSlice.reducer