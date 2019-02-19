import React, {Component} from 'react';

class Home extends Component{
    state = {

    }

    componentDidMount(){
        console.log(window.location);
    }

    render(){
        return(
          <div>
              <a href="/Server">Server Test Page</a>
              <h1>Home</h1>  
          </div>  
        );
    }

}

export default Home;