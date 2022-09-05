import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatCurrency from '../utilities/utilities.js';
import { createOrder } from '../store/actions/orderActions';
import { ORDER_CREATE_RESET } from '../store/constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, cartItems } = cart

    const order = useSelector(state => state.order)
    const { loading, error, success } = order

    if (!paymentMethod) {
        props.history.push('/payment')
    }


    cart.itemsPrice = cartItems.reduce((a, c) => (a + (c.qty * c.price)), 0)
    cart.shippingPrice = cart.itemsPrice > 99.99 ? 0 : 10
    cart.taxPrice = 0.0795 * cart.itemsPrice
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cartItems }))
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/orders/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, order, dispatch, props.history])

    return (
        <div>
            <CheckoutSteps stepOne stepTwo stepThree stepFour />
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{shippingAddress.fullName}</p> <br />
                                <p><strong>Address: </strong>{shippingAddress.address1}<br />
                                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode} <br />
                                    {shippingAddress.country}
                                </p>

                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p><strong>Method: </strong>{paymentMethod}</p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                    {cartItems.map((item) => (
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div>
                                                    <img src={item.image} alt={item.name} className="small" />
                                                </div>
                                                <div className='min-30'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>

                                                <div>
                                                    {formatCurrency(item.qty * item.price)}
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>{formatCurrency(cart.itemsPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>{formatCurrency(cart.shippingPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>{formatCurrency(cart.taxPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>{formatCurrency(cart.totalPrice)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" className="primary block" onClick={placeOrderHandler} disabled={cartItems.length === 0}>Place Order</button>
                            </li>
                            {
                                loading && <LoadingBox />
                            }
                            {
                                error && <MessageBox>{error}</MessageBox>
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
