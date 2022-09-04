import React from 'react'
import { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import ShippingAddressInput from '../components/ShippingAddressInput';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/actions/cartActions';

export default function ShippingAddressScreen(props) {

    const user = useSelector(state => state.user)
    if (!user._id) {
        props.history.push('/signin')
    }

    const { shippingAddress } = useSelector(state => state.cart)

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address1, setAddress1] = useState(shippingAddress.address1)
    const [address2, setAddress2] = useState(shippingAddress.address2)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        //dispatch save shipping address action
        dispatch(saveShippingAddress({ fullName, address1, address2, city, state, postalCode, country }))

        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutSteps stepOne stepTwo />
            <form className='form' onSubmit={submitHandler}>

                <ShippingAddressInput name='fullName' value={fullName} placeholder='Full Name' onChange={setFullName} required />

                <ShippingAddressInput name='address1' value={address1} placeholder='Address 1' onChange={setAddress1} required />
                <ShippingAddressInput name='address2' value={address2} placeholder='Address 2' onChange={setAddress2} />
                <ShippingAddressInput name='city' value={city} placeholder='City' onChange={setCity} required />
                <ShippingAddressInput name='state' value={state} placeholder='State' onChange={setState} required />
                <ShippingAddressInput name='postalCode' value={postalCode} placeholder='Postal Code' onChange={setPostalCode} required />
                <ShippingAddressInput name='country' value={country} placeholder='Country' onChange={setCountry} required />
                <div>
                    <button className='primary' type="submit" >Continue</button>
                </div>
            </form>
        </div>
    )
}
