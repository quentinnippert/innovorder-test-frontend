import Authentication from './screens/Authentication';
import Home from './screens/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import token from './reducers/token';

import './App.css';

const store = createStore(combineReducers({token}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
