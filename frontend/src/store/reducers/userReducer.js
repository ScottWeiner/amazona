import { USER_SIGNIN_FAIL, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT } from '../constants/userConstants';


export const userReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }

        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                ...action.payload //spreading in the payload so the nesting doesnt get confusing
            }

        case USER_SIGNIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_SIGNOUT:
            return {}
        default:
            return state
    }
}