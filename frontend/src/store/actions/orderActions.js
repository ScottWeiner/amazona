
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET } from '../constants/orderConstants';
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