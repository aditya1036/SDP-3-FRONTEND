import {useState} from 'react'


const useToken = () => {


    const getToken = () =>
                    {
                    const tokenString = localStorage.getItem('token')
                    const userToken = JSON.parse(tokenString)
                    return userToken?.token
                    }



    const [token , setToken] = useState(getToken())
    const [email  ,setEmail] = useState('')
    const [message , setMessage] = useState('')

    const saveToken = (userToken) => {
        localStorage.setItem('token',JSON.stringify(userToken))
        setToken(userToken.token)
        setEmail(userToken.email)
        setMessage(userToken.message)
    }

    return {
        setToken: saveToken,
        token,
        email,
        message
    }
}

export default useToken
