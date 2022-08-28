
import ProductScreen from "../src/screens/ProductScreen";
import HomeScreen from "../src/screens/HomeScreen";
import CartScreen from './screens/CartScreen';
import SignInScreen from "./screens/SignInScreen";
import { signOutUser } from './store/actions/userActions.js'
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from "./screens/RegisterScreen";



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
                  <Link to='#signout' onClick={signOutHandler}>Sign Out</Link>

                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>

        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/cart/:id?/" component={CartScreen} />
          <Route path='/signin' component={SignInScreen} />
          <Route path='/register' component={RegisterScreen} />
        </main>
        <footer className="row center">
          Some rights reserved.
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
