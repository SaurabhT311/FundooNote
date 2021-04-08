import logo from './logo.svg';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Note from './components/createNotes/createNotes';
import './App.css';
import MiniDrawer from './components/DashBoard/dashboard';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import ForgotPassword from './components/forgotPassword/forgot_pass';
import ResetPassword from './components/resetPassword/reset_pass';
import createNotes from './components/createNotes/createNotes';


function App() {
  return (
    <div className="App">
      {/* <h1>Hello and Welcome</h1> */}
      {/* <Registration/> */}
      {/* <Login/> */}
      {/* <ForgotPassword/> */}
      {/* <ResetPassword/> */}

    {/* <Note/> */}

      <BrowserRouter>
      <Switch>
        <Redirect path="/" exact to ="/login" />
          <Route path="/registration" exact component={Registration}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/forgotpassword" exact component={ForgotPassword}/>
          <Route path="/resetpassword/:token" exact component={ResetPassword}/>
          <Route path='/dashboard' exact component={MiniDrawer}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
