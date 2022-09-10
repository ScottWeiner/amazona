import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {

    const user = useSelector(state => state.user)


    return (

        <Route {...rest} render={(props) => user ? (<Component {...props}></Component>) : (<Redirect to="/signin" />)} />

    )
}
