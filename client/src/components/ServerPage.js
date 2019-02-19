import React, {Component} from 'react';
import './ServerPage.css';

class ServerPage extends Component{
    state = {
        result: null,
    }

    componentDidMount(){
        this.fetchResponse = this.fetchResponse.bind(this);
        this.submitNumbers = this.submitNumbers.bind(this);
    }


    //Returns the two numbers multiplied
    async fetchResponse(){
        const response = await fetch('/api/getResponse');
        const body = await response.json();    
        if(response.status == 503){
            console.log('Server error.');
            return;
        }
        else if(response.status == 404){
            console.log('Api method not found.');
            return;
        } 
        if(!body){
            console.log('Body error.');
            return;
        }
        
        console.log(body);
        this.setState({multipled: body.result});
    }

    
    //Sends two numbers, num1 and num2, to be added together by the backend, which also stores numbers
    async submitNumbers(e){
        e.preventDefault();
            const response = await fetch('/api/subtractNums', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({num1: this.state.num1, num2: this.state.num2}),
            });
            if(response.status == 503){
                console.log('Server error.');
                return;
            }
            else if(response.status == 404){
                console.log('Api method not found.');
                return;
            }
            const body = await response.json();
            if(!body){
                console.log('Body error.');
                return;
            }
            console.log(body);
            this.fetchResponse();
            this.setState({result: body.result});
        
    }

    render(){


        return(
          <div className='Test-page'>
              <form className='Input-form' onSubmit={this.submitNumbers}>
                  <input className='Input-field' type='text' placeholder='First number'  onChange= {e => this.setState({num1: e.target.value})}/>
                  <input className='Input-field' type='text' placeholder='Second number' onChange= {e=> this.setState({num2: e.target.value})}/>
                  <input className='Input-submit' type='submit' value='Subtract'/>
              </form>
              <p className='Input-result'>Result: {this.state.result}</p>
              <p className='Input-multiply'>Multiplied: {this.state.multipled}</p>
          </div>  
        );
    }

}

export default ServerPage;