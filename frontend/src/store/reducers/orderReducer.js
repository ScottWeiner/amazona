import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_RESET,
    ORDER_HISTORY_REQUEST, ORDER_HISTORY_FAIL, ORDER_HISTORY_SUCCESS
} from '../constants/orderConstants';

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
                error: ''
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                error: '',
                ...action.payload

            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }


        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
                error: '',
                ...action.payload
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                error: '',
                success: true,
                ...action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }


        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }

}

export const orderHistoryReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_HISTORY_REQUEST:
            return {
                loading: true,
                error: ''
            }
        case ORDER_HISTORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_HISTORY_SUCCESS:
            return {
                loading: false,
                error: '',
                orders: action.payload
            }
        default:
            return state
    }
}