import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../store/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SignInScreen(props) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        dispatch(signInUser(email, password))
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                    <label />
                    <button disabled={email === '' || password.length < 4} className='primary' type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '}
                        <Link to="/register">Create your account now!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
