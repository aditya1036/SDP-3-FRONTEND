import React from 'react'
import { Navigate } from 'react-router-dom'
import useToken from './useToken'

import { isLoggedin } from './authService';
const PrivateRoute = ({children, ...rest}) => {

    const {token} = useToken()
    // return (
    // //    <Routes>
    // //     <Route {...rest} render={props => (
    // //         token ?
    // //             children
    // //         : <Navigate to="/signin" />
    // //     )} />
    // //     </Routes>

    // )

    
    

    return isLoggedin(token)?children:<Navigate to="/signin" />
}

export default PrivateRoute
