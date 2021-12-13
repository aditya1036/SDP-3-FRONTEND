import React from 'react'
import { Navigate } from 'react-router-dom'
import useToken from './useToken'

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

    return token?children:<Navigate to="/signin" />
}

export default PrivateRoute
