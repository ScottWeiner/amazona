import React from 'react'

export default function ShippingAddressInput(props) {
    return (
        <div>
            <label htmlFor={props.name}>{props.placeholder}</label>
            <input
                required={props.required}
                id={props.id}
                type="text"
                name={props.name}
                placeholder={`Enter ${props.placeholder}`}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
            ></input>

        </div>
    )
}
