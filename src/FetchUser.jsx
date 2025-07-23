import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { FetchingSuccessful, FetchingUser, FetchingError } from './redux/UserSlice'

const FetchUser = () => {
    const dispatch = useDispatch()
    const {isLoading, alluser, error} = useSelector((state)=>state.userslice)
    console.log(isLoading, alluser, error);
    const [users, setusers] = useState()
    
    useEffect(() => {
        dispatch(FetchingUser())
        axios.get('http://localhost:5000/users')
            .then(response => {
                console.log(response.data);
                setusers(response.data)
                dispatch(FetchingSuccessful(response.data))
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                dispatch(FetchingError())
            });
    }, [dispatch]);

    console.log("Users Fetched:", users);
    

    return (
        <>
        {isLoading && <h1>Loading...</h1>}
        {alluser && alluser.map((users)=>(
            <>
            <h1>{users.firstName}</h1>
            <p>{users.email}</p>
            </>
        ))}
        {error && <h1>Error fetching user!!!!!</h1>}
        <div>FetchUser</div>
        </>
    )
}

export default FetchUser