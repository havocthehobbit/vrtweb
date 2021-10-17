import './App.css';

import MainApp from './components/common/mainApp'

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

