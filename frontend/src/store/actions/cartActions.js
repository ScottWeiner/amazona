import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (productId, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${productId}`)
    console.log('productId: ', productId)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty

        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: productId
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}