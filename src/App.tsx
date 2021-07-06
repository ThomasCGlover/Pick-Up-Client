import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import SideNav from './components/Site/SideNav';
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

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
  }

  clearToken(){
    localStorage.clear();
    this.setState({
      sessionToken: ''
    })
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
      {/* <Auth updateToken={this.updateToken}/> */}
      <Router >
      <SideNav updateToken = {this.updateToken}/>
      </Router>
    </div>
  );
}
}

export default App;

