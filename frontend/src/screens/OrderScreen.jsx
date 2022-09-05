import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatCurrency from '../utilities/utilities.js';
import { getOrderDetails, payOrder } from '../store/actions/orderActions.js'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../store/constants/orderConstants.js';
import { PayPalButton } from 'react-paypal-button-v2';

export default function OrderScreen(props) {
    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const order = useSelector(state => state.orderDetails)
    const { orderItems, loading, error } = order

    const orderPayment = useSelector(state => state.orderPayment)
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPayment

    const dispatch = useDispatch()

    const paypalStyles = {
        layout: 'vertical',
        color: 'gold',
        shape: 'pill',
        label: 'buynow',

    }



    useEffect(() => {



        const addPayPalScript = async () => {
            const { data } = await axios.get(
                '/api/config/paypal'
            )

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () => {
                if (sdkReady === false)
                    setSdkReady(true)
            }

            document.body.appendChild(script)

        }


        console.log('order._id: ', order._id)
        console.log('orderId: ', orderId)
        // console.log('order._id !== orderId? ', order._id !== orderId)
        // console.log('successPay: ', successPay)
        //  console.log('sdkReady: ', sdkReady)



        if (!order._id || successPay || ((order._id !== orderId))) {
            dispatch({ type: ORDER_PAY_RESET })
            console.log('dispatching get order details')
            dispatch(getOrderDetails(orderId))
        } else {
            if (!order.isPaid) {
                console.log('The order is not paid, see: ', order.isPaid)
                if (!window.paypal) {
                    console.log('there is no window.paypal :(')
                    addPayPalScript()
                } else {
                    console.log('I am setting hte sdkReady to true now because it is:', sdkReady)
                    if (sdkReady === false) setSdkReady(true)


                }

            } else {

            }
        }




    }, [orderId, sdkReady, dispatch, order._id, order.isPaid, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))

    }


    return (
        loading ? (
            <LoadingBox></LoadingBox >
        ) : error ? (
            <MessageBox>{error}</MessageBox>
        ) : (<div>


            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.shippingAddress.fullName}</p> <br />
                                <p><strong>Address: </strong>{order.shippingAddress.address1}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode} <br />
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>) : (<MessageBox variant="danger">Order Not Delivered</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p><strong>Method: </strong>{order.paymentMethod}</p>
                                {order.isPaid ? (<MessageBox variant="success">Order is Paid</MessageBox>) : (<MessageBox variant="danger">Order Not Paid</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                    {orderItems.map((item) => (
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
                                    <div>{formatCurrency(order.itemsPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>{formatCurrency(order.shippingPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>{formatCurrency(order.taxPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>{formatCurrency(order.totalPrice)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady ? (
                                            <LoadingBox>Loading a way to pay</LoadingBox>
                                        ) : (
                                            <>
                                                {errorPay && (
                                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                                )}
                                                {loadingPay && (
                                                    <LoadingBox></LoadingBox>
                                                )}
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                    style={paypalStyles}
                                                />
                                            </>
                                        )}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>

            </div>


        </div>
        )
    )
}
