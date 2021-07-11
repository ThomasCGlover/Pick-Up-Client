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
import AdminDelete from './components/Auth/AdminDelete';



type Props = {}
type AppState = {
  sessionToken: string | null,
  
}

class App extends Component <Props, AppState>{
    constructor(props: Props){
      super(props);
      this.state = {
        sessionToken: ''
      }
      this.updateToken = this.updateToken.bind(this);
      // this.viewConductor = this.viewConductor.bind(this);
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



  // viewConductor = () => {
  //   return this.state.sessionToken === localStorage.getItem('token') ? <Router >
  //   <SideNav sessionToken={this.state.sessionToken} updateToken={this.updateToken} /> </Router> : <Auth updateToken={this.updateToken}/>  
  // }
  

  render(){
  return (
    <div className="App">
      <h1 className="title">Pick-Up Finder</h1>
      <ProtectedViews updateToken = {this.updateToken} sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
    </div>
  );
}
}

export default App;

