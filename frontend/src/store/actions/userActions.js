import {
    USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';
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
    localStorage.removeItem('shippingAddress')
    dispatch({ type: USER_SIGNOUT })
}

export const registerUser = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })

    try {
        const { data } = await axios.post('/api/users/register', { name, email, password })
        if (data) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: {
                    ...data
                }
            })
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
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getUserProfile = (userId) => async (dispatch, getState) => {

    dispatch({ type: USER_PROFILE_REQUEST, payload: userId })

    const { user } = getState()


    try {
        dispatch({ type: USER_PROFILE_REQUEST })
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        })

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    //const { user } = getState()

    try {
        const { data } = await axios.put(`/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${user.token}` }
        })

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userData', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

