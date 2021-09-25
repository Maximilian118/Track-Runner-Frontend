import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Calendar from "./pages/Calendar"
import Profile from "./pages/Profile"
import Splash from "./pages/Splash"
import Login from "./pages/Login"
import Forgot from "./pages/Forgot"
import ForgotSuccess from "./pages/ForgotSuccess"
import Notfound from "./pages/NotFound"
import DeleteAccount from "./pages/DeleteAccount"
import Post from "./pages/Post"

const Router = ({ user }) => user.token ? (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/calendar" component={Calendar}/>
    <Route exact path="/post" component={Post}/>
    <Route exact path="/delete-account" component={DeleteAccount}/>
    <Route path="/profile" component={Profile}/>
    <Route component={Notfound}/>
  </Switch>
) : (
  <Switch>
    <Route exact path="/" component={Splash}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/forgot" component={Forgot}/>
    <Route exact path="/forgot-success" component={ForgotSuccess}/>
    <Route component={Notfound}/>
  </Switch>
)

export default Router