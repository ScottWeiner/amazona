
import ProductScreen from "../src/screens/ProductScreen";
import HomeScreen from "../src/screens/HomeScreen";
import CartScreen from './screens/CartScreen';
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';



function App() {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

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
            <Link to="signin.html">Sign In</Link>
          </div>

        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/cart/:id?/" component={CartScreen} />
        </main>
        <footer className="row center">
          Some rights reserved.
        </footer>
      </div>
    </BrowserRouter>

  );
}

export default App;
