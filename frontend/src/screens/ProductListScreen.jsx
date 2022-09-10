import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { listProducts } from '../store/actions/productActions'

export default function ProductListScreen(props) {

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const handleDeleteProduct = (product) => {
        //TODO: disptach delete action
    }


    return (
        <div>
            <h1>Products</h1>
            {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>

                                <th>CATEGORY</th>
                                <th>QUANTITY</th>
                                <th>PRICE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prod) => (
                                <tr key={prod._id}>
                                    <td>{prod._id}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.description}</td>

                                    <td>{prod.category}</td>
                                    <td>{prod.countInStock}</td>
                                    <td>{prod.price}</td>
                                    <td>
                                        <button className='small' type="button" onClick={() => props.history.push(`product/${prod._id}/edit`)}>Edit</button>
                                        <button className='small' type="button" onClick={() => handleDeleteProduct(prod)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    )
}
