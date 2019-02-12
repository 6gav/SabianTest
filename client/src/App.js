import React, { Component } from 'react';
import './App.css';
import { connectToSocket, disconnectFromServer } from './api';

class App extends Component {

  constructor(props){
    super(props)
    connectToSocket((err, testVals) => console.log(testVals));
  }

  componentWillUnmount(){
    disconnectFromServer();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p></p>
        </header>
      </div>
    );
  }
}

export default App;
