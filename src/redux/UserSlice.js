import { createSlice } from "@reduxjs/toolkit";
const userslice = createSlice({
    name: "user",
    initialState:{
        isLoading: false,
        alluser: null,
        error: null
    },
    reducers:{
        FetchingUser: (state)=>{
            state.isLoading = true
            state.alluser = null
            state.error = null
        }, 

        FetchingSuccessful: (state, action)=>{
            state.isLoading = false
            state.alluser = action.payload
            state.error = false
        },

        FetchingError: (state, action)=>{
            state.isLoading = false
            state.alluser = false
            state.error = true
        }
    }
})

export default userslice.reducer
export const {FetchingSuccessful, FetchingUser, FetchingError} = userslice.actions
