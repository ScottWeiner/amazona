import { data } from "./data"
import formatCurrency from "./utilities/utilities";


function App() {
  return (
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
        <div className="row center">

          {data.products.map(prod => (
            <div key={prod._id} className="card">
              <a href="product.html">
                <img className="medium" src={prod.image} alt={prod.name} />
              </a>
              <div className="card-body">
                <a href="product.html">
                  <h2>{prod.name} butt</h2>
                </a>
                <div className="rating">
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                  <span><i className="fa fa-star"></i></span>
                </div>
                <div className="price">{formatCurrency(prod.price)}</div>
              </div>
            </div>
          ))}


        </div>
      </main>
      <footer className="row center">
        Some rights reserved.
      </footer>
    </div>
  );
}

export default App;
