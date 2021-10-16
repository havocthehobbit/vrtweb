import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Link, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';


import Main from './components/common/main'
import MainApp from './components/common/mainApp'
import Input2 from './components/common/input2'

import Login  from './components/common/login'
import Firstpage from './components/common/firstpage'
import Secondpage from './components/common/secondpage'


import { Provider } from 'react-redux'
import  store  from './components/redux1/redux1'

// node port during development // create a global variable
if (process.env.NODE_ENV !== 'production') { 
    window["node_port"]=process.env["REACT_APP_DEV_NODE_PORT"]; // #BE # REACT_APP_DEV_NODE_PORT=3018 npm start    
}

function App({ loggedin, login }) {
  
  return (
    <Provider store={store}>
      <div className="App">
        <MainApp/>
      </div>
    </Provider>
  );
}

export default App;

