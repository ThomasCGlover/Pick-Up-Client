import React, {Component} from 'react';

type LoginState = {
    username: string,
    password: string,
    

}
type AcceptedProps = {
    updateToken: (newToken: string) => void
}

export default class Login extends Component<AcceptedProps, LoginState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            username: '',
            password: '',
            
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch('http://localhost:3005/user/login', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.updateToken(data.sessionToken)
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
                    <h1>Login</h1>
                    <input placeholder="Username" type="text" onChange={this.handleUsernameInput.bind(this)} />
                    <input placeholder="Password" type="text" onChange={this.handlePasswordInput.bind(this)} />
                    <button onClick={this.handlesubmit.bind(this)}>Submit</button>
                </form>
            </>
        )
    }
}