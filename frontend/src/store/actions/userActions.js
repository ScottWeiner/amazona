import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT } from '../constants/userConstants';
import axios from "axios";

export const signInUser = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        action: { email, password }
    })
    try {
        const { data } = await axios.post('/api/users/signin', { email, password })

        if (data) {
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: {
                    ...data
                }
            })
            localStorage.setItem('userData', JSON.stringify(data))
        } else {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: 'Something got fucked up, but not sure what!'
            })
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const signOutUser = () => (dispatch) => {
    localStorage.removeItem('userData')
    localStorage.removeItem('cartItems')
    dispatch({ type: USER_SIGNOUT })
}