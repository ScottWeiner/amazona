import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

export const productListReducer = (state = { products: [], loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: ''
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                //products: [],
                error: action.payload
            }
        default:
            return state
    }
}


export const productDetailsReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                error: ''
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                product: action.payload,
                error: '',
                loading: false
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}