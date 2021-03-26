import logo from './logo.svg';
 import Registration from './components/registration/registration';
 import Login from './components/login/login';
 import './App.css';
//  import './components/registration/registration';

function App() {
  return (
    <div className="App">
      {/* <h1>Hello and Welcome</h1> */}

      <Registration/>
      <Login/>
    </div>
  );
}

export default App;
