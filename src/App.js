import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser);
  // const admin = true;
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => {
            return admin ? <Redirect to={"/"} /> : <Login />;
          }}
        />

        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route
              exact
              path="/"
              render={() => {
                return admin ? <Home /> : <Redirect to={"/login"} />;
              }}
            />
            <Route
              exact
              path="/users"
              render={() => {
                return admin ? <UserList /> : <Redirect to={"/login"} />;
              }}
            />

            <Route
              exact
              path="/user/:userId"
              render={() => {
                return admin ? <User /> : <Redirect to={"/login"} />;
              }}
            />

            <Route
              exact
              path="/newUser"
              render={() => {
                return admin ? <NewUser /> : <Redirect to={"/login"} />;
              }}
            />

            <Route
              exact
              path="/products"
              render={() => {
                return admin ? <ProductList /> : <Redirect to={"/login"} />;
              }}
            />

            <Route
              exact
              path="/product/:productId"
              render={() => {
                return admin ? <Product /> : <Redirect to={"/login"} />;
              }}
            />

            <Route
              exact
              path="/newproduct"
              render={() => {
                return admin ? <NewProduct /> : <Redirect to={"/login"} />;
              }}
            />
          </div>
        </>
      </Switch>
    </Router>
  );
}

export default App;
