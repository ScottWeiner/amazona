import {
    USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_RESET
} from '../constants/userConstants';


export const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }

        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                error: '',
                ...action.payload //spreading in the payload so the nesting doesnt get confusing
            }

        case USER_SIGNIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_SIGNOUT:
            return {}

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                error: ''
            }

        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }




        default:
            return state
    }
}

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true,
                error: ''
            }
        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                error: '',
                ...action.payload
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
                error: ''
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                success: true,
                loading: false,
                error: '',
                ...action.payload
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}