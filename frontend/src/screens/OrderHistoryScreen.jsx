import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listOrders } from '../store/actions/orderActions';
import formatCurrency from '../utilities/utilities';

export default function OrderHistoryScreen(props) {

    const orderHistory = useSelector(state => state.orderHistory)
    const { loading, error, orders } = orderHistory

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    return (

        <div>
            <h1>Order History</h1>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    !orders ? (<h2>Ain't nothin' here...</h2>) :
                        (
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((ord) => {
                                            return (
                                                <tr key={ord._id}>
                                                    <td>{ord._id}</td>
                                                    <td>{ord.createdAt.substring(0, 10)}</td>
                                                    <td>{formatCurrency(ord.totalPrice)}</td>
                                                    <td>{ord.isPaid ? ord.paidAt.substring(0, 10) : 'Unpaid'}</td>
                                                    <td>{ord.isDelivered ? 'Delivered' : 'Not Yet Delivered'}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className='small'
                                                            onClick={() => { props.history.push(`/order/${ord._id}`) }}>
                                                            Details
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
        </div>
    )
}
