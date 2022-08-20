
import ProductScreen from "../src/screens/ProductScreen";
import HomeScreen from "../src/screens/HomeScreen";
import {
  BrowserRouter,

  Route

} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <div className="grid-container" >
        <header className="row">
          <div>
            <a className="brand" href="index.html">amazona</a>
          </div>
          <div>
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
          </div>

        </header>
        <main>


          <Route path="/product/:id" component={ProductScreen} />



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
