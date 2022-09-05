
import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
    ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAIL
} from '../constants/orderConstants';
import axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';


export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const { user: { token } } = getState()

    try {
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('data: ', data)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    const { user: { token } } = getState()

    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: {
            order,
            paymentResult
        }
    })

    const { user } = getState()

    console.log('user: ', user)
    console.log('order: ', order)

    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_REQUEST })

    const { user } = getState()

    try {
        const { data } = await axios.get('/api/orders/myHistory', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        console.log('orderHistory', data)

        dispatch({
            type: ORDER_HISTORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_HISTORY_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}