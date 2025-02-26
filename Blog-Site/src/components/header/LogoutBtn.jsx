import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice'
import authService from '../../appwrite/auth'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';

function LogoutBtn({className = ""}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        authService.LogoutUser()
        .then(() => {
            dispatch(logout());
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <button onClick={handleLogout} className={`inline-block px-6 py-2 duration-200 hover:bg-teal-600 hover:text-white rounded-full ${className}`}><ExitToAppOutlinedIcon style={{marginBottom: "4px"}} /> Logout</button>
    )
}

export default LogoutBtn
