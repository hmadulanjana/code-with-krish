import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          COSMOS
        </Link>
        <ul className="navbar-nav d-flex flex-row">
          <Navigation url="/" nav="Order" />
          <Navigation url="/product" nav="Product" />
          <Navigation url="/customer" nav="Customer" />
        </ul>
      </div>
    </nav>
  );
}

export function Navigation({ url, nav }) {
  return (
    <li className="nav-item mx-3">
      <Link className="nav-link text-white" to={url}>
        {nav}
      </Link>
    </li>
  );
}

export default Navbar;
