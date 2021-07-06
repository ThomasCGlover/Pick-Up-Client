import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Auth/Register';

function App () {
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;

// type Props = {}
// type AppState = {
//   sessionToken: string | null,
//   newToken: 
// }

// class App extends Component <Props, AppState>{
//     constructor(props: Props){
//       super(props);
//       this.state = {
//         sessionToken: ('')
//       }
//       this.updateToken = this.updateToken.bind(this);
//   }

//   updateToken(newToken: string)(
//     localStorage.setItem('token', newToken);
//     this.setState({
//       sessionToken: newToken
//     }, () => console.log(this.state.sessionToken))
//     )

//   render(){
//   return (
//     <div className="App">
//       <Register />
//     </div>
//   );
// }
// }
