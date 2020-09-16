import React, {useState} from 'react'
import {axiosWithAuth} from './axiosWithAuth'
import {useHistory} from 'react-router-dom'



export const Login = () => {

    let history = useHistory()

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        error: ''
    })

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

   const login = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post('/api/login', credentials)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.payload)
            history.push('/protected')
        })
        
        .catch((err) => {
            console.log('this is error ' + err)
            setCredentials({...credentials,
            error: err })
        })

    }
    return (
        <div>
            <form onSubmit={login}>
                <input 
                type='text' 
                name='username'
                value={credentials.username}
                onChange={handleChange}
                />
                <input 
                type='text' 
                name='password'
                value={credentials.password}
                onChange={handleChange}
                />
                <button>Login</button>
            </form>
            <p style={{color: 'red'}}>{credentials.error}</p>
        </div>
    )
}