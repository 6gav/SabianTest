import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import ServerPage from './components/ServerPage';
import Home from './components/Home';

class App extends Component {

  

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Server' component={ServerPage}/>
        </Switch>
      </div>
    );

    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
