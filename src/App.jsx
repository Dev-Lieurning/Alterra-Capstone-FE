import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.isLogedIn);
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/products" /> : <Login />}
          <Home />
        </Route>
        <Route path="/products/:category">
          {user ? <Redirect to="/products:category" /> : <Login />}
          <ProductList />
        </Route>
        <Route path="/products">
          {user ? <Redirect to="/products" /> : <Login />}
          <ProductList />
        </Route>
        <Route path="/product/:id">
          {user ? <Redirect to="/product/:id" /> : <Login />}
          <Product />
        </Route>
        <Route path="/cart">
          {user ? <Redirect to="/cart" /> : <Login />}
          <Cart />
        </Route>
        <Route path="/success">
          {user ? <Redirect to="/success" /> : <Login />}
          <Success />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/login" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
