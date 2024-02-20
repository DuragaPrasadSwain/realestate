import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    updateUser:null,
    updateList:null,
    loginStatus:false
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
        statusChange:(state,action) => {
            state.loginStatus = action.payload
        }
    }
})

export const {signInSuccess , updateData, updateListData, statusChange } = userSlice.actions

export default userSlice.reducer