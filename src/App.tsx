import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Auth from './components/Auth/Auth';
// import SideNav from './components/Site/SideNav';

import {
  BrowserRouter as Router
} from 'react-router-dom';


type Props = {}
type AppState = {
  sessionToken: string | null,
  
}

class App extends Component <Props, AppState>{
    constructor(props: Props){
      super(props);
      this.state = {
        sessionToken: ('')
      }
      this.updateToken = this.updateToken.bind(this);
  }

  updateToken(newToken: string){
    localStorage.setItem('token', newToken)
    this.setState({
      sessionToken: newToken
    }, () => console.log(this.state.sessionToken))
  }

  render(){
  return (
    <div className="App">
      <Auth updateToken={this.updateToken}/>
      {/* <SideNav updateToken = {this.updateToken}/> */}
    </div>
  );
}
}

export default App;

