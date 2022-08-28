import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function RegisterScreen(props) {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')

    const user = useSelector(state => state.user)
    const { loading, error } = user


    const redirect = props.location.search ? props.location.search.split('?')[1] : '/'

    useEffect(() => {
        if (user._id) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, user])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerUser(name, email, password))
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        required
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Re-enter Password</label>
                    <input
                        type="password"
                        id="reEnterPassword"
                        placeholder="Enter Password"
                        required
                        onChange={e => setReEnterPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button disabled={email === '' || password.length < 4 || name === '' || password !== reEnterPassword} className='primary' type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already a customer? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign into you account now!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
