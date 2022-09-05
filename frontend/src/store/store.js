import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userReducer } from './reducers/userReducer'
import { orderDetailsReducer, orderReducer, orderPayReducer, orderHistoryReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPayment: orderPayReducer,
    orderHistory: orderHistoryReducer
})

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'PayPal'
    },
    user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}


}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store