import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Increment, Decrement, IncreasebyValue } from './redux/CountSlice'

const Counter = () => {
    const {value} = useSelector((state)=>state.countslice)
    const dispatch = useDispatch()
    console.log(value);
    
  return (
    <div>
        <h1>Counter :{value} </h1>
        <button onClick={()=>dispatch(Increment())}>+</button>
        <button onClick={()=>dispatch(Decrement())}>-</button>
        <button onClick={()=>dispatch(IncreasebyValue(10))}>Add by 10</button>
    </div>
  )
}

export default Counter