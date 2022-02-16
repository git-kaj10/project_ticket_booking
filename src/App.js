import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Showtime from "./pages/Admin/Showtime/Showtime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import EditFilm from "./pages/Admin/Films/EditFilm/EditFilm";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/" Component={Home} />
        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />
        <AdminTemplate exact path="/admin" Component={Films} />
        <AdminTemplate exact path="/admin/users" Component={Dashboard} />
        <AdminTemplate exact path="/admin/films" Component={Films} />
        <AdminTemplate exact path="/admin/films/addnew" Component={AddNew} />
        <AdminTemplate
          exact
          path="/admin/films/edit/:id"
          Component={EditFilm}
        />
        <AdminTemplate
          exact
          path="/admin/films/showtime/:id"
          Component={Showtime}
        />
      </Switch>
    </Router>
  );
}

export default App;
