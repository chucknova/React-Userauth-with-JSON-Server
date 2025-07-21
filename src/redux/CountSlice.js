import { createSlice } from "@reduxjs/toolkit";
const countslice = createSlice({
    name: "count",
    initialState: {
        value: 0,
        isLoading: false
    },
    reducers:{
        Increment: (state)=>{
            state.value += 1
        },
        Decrement: (state)=>{
            if (state.value != 0) {
                state.value -= 1
            }
            return
        },
        IncreasebyValue: (state, actions)=>{
            state.value += actions.payload
        }
    }
})

export default countslice.reducer
export const {Increment, Decrement, IncreasebyValue} = countslice.actions