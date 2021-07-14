import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import SideNav from './components/Site/SideNav';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import ProtectedViews from './components/Auth/ProtectedViews';
import hoop from './assets/hoop.png'
import { render } from '@testing-library/react';
import Net from './assets/net.png';



type Props = {}
type AppState = {
  sessionToken: string | null,
  username: string | null | undefined
  
}

class App extends Component <Props, AppState>{
    constructor(props: Props){
      super(props);
      this.state = {
        sessionToken: '',
        username: ''
      }
      this.updateToken = this.updateToken.bind(this);

  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
  }

  clearToken(){
    localStorage.clear();
    window.location.reload();
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
      <div className="title-div">
      <h1 className="title">Pick-Up Finder</h1>
      <img src={Net} alt="net" />
      </div>
      <ProtectedViews updateToken = {this.updateToken} sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
    </div>
  );
}
}

export default App;

