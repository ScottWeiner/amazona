import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import { USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_UPDATE_PROFILE_FAIL } from '../store/constants/userConstants';
import { getUserProfile, updateUserProfile } from '../store/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants.js'


export default function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserProfile(user._id))
        } else {

            setName(userUpdateProfile.name || user.name)
            setEmail(userUpdateProfile.email || user.email)

        }


    }, [user._id, dispatch, user, userUpdateProfile])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.")
        } else {
            console.log(name, email)
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password
            }))
        }
    }

    return (

        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    user.loading ? (<LoadingBox></LoadingBox>)
                        :
                        user.error ? (<MessageBox variant="danger">{user.error}</MessageBox>)
                            : (
                                <>
                                    {loadingUpdate && <LoadingBox></LoadingBox>}
                                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                                    {successUpdate && <MessageBox>Profile updated successfully!</MessageBox>}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e => setName(e.target.value))}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            placeholder='Email'
                                            value={email}
                                            onChange={(e => setEmail(e.target.value))}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder='Password'
                                            value={password}
                                            onChange={(e => setPassword(e.target.value))}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e => setConfirmPassword(e.target.value))}
                                        ></input>
                                    </div>
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">Update</button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    )
}
