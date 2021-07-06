import React, {Component} from 'react';

type UserData = {
    username: string,
    password: string,
    role: string, 

}
// type AcceptedProps = {
//     updateToken: (newToken: string)
// }
export default class Register extends Component<{}, UserData>{
    constructor(props: UserData){
        super(props)
        this.state={
            username: '',
            password: '',
            role: 'user',
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch('http://localhost:3005/user/register', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password, role: this.state.role}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            // this.props.updateToken(data.sessionToken)
            console.log(data)
        })
    }

    handleUsernameInput(e: any) {
        this.setState({
            username: e.target.value
        })
        
    }

    handlePasswordInput(e: any) {
        this.setState({
            password: e.target.value
        })
        
    }

    render(){
        return(
            <>
                <form>
                    <h1>Register</h1>
                    <input placeholder="Username" type="text" onChange={this.handleUsernameInput.bind(this)} />
                    <input placeholder="Password" type="text" onChange={this.handlePasswordInput.bind(this)} />
                    <button onClick={this.handlesubmit.bind(this)}>Submit</button>
                </form>
            </>
        )
    }
}
