
import ProductScreen from "../src/screens/ProductScreen";
import HomeScreen from "../src/screens/HomeScreen";
import CartScreen from './screens/CartScreen';
import SignInScreen from "./screens/SignInScreen";
import { signOutUser } from './store/actions/userActions.js'
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from './screens/ProductListScreen'



function App() {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch(signOutUser())
  }

  return (

    <BrowserRouter>
      <div className="grid-container" >
        <header className="row">
          <div>
            <Link className="brand" to="/">amazona</Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            {user._id ? (
              <div className="dropdown">
                <Link to="#">{user.name}<i className="fa fa-caret-down"></i>{' '}</Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li>
                    <Link to='/orderhistory'>History</Link>
                  </li>
                  <li>
                    <Link to='#signout' onClick={signOutHandler}>Sign Out</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {user && user.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>

            )}
          </div>

        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?/" component={CartScreen} />
          <Route path='/signin' component={SignInScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/shipping' component={ShippingAddressScreen} />
          <Route path='/payment' component={PaymentMethodScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/orderhistory' component={OrderHistoryScreen} />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <AdminRoute path='/productlist' component={ProductListScreen} />
          <Route path="/" exact component={HomeScreen} />
        </main>
        <footer className="row center">
          Some rights reserved.
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
