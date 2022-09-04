import React from 'react'
import { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/actions/cartActions.js'

export default function PaymentMethodScreen(props) {

    const { shippingAddress } = useSelector(state => state.cart)

    if (Object.keys(shippingAddress).length < 7) {
        props.history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps stepOne stepTwo stepThree />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id='paypal'
                            value='PayPal'
                            name='paymentMethod'
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id='stripe'
                            value='Stripe'
                            name='paymentMethod'
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}
