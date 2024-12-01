import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.LogoutUser()
        .then(() => {
            dispatch(logout());
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <button onClick={handleLogout} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
    )
}

export default LogoutBtn
