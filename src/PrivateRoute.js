import React from 'react'
import {
    Navigate
} from 'react-router-dom'
import {
    useDispatch
} from 'react-redux';
import {
    RemoveUser
} from "./components/redux/UserContext/UserSlice";


import useToken from './useToken'

import {
    isLoggedin
} from './authService';
const PrivateRoute = ({
    children,
    ...rest
}) => {
    const dispatch = useDispatch();

    const {
        token
    } = useToken()


    if (!isLoggedin(token)) {
        dispatch(RemoveUser())
        return <Navigate to = "/signin" / >
    }
    return children
}

export default PrivateRoute