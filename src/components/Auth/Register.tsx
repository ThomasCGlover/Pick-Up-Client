import React, {Component} from 'react';
import styled from 'styled-components';
import APIURL from '../helpers/environment';

const Wrapper = styled.div`
    height: 25vh;
    background-color: #3D0814;
    max-width: 95vw;
    color: #FF934F;
    margin-top: 5vh;

`
const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 1vh;
`

const Button = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
`
const Input = styled.input`
    ::placeholder{
        color: #3D0814;
    }
    background-color: #DFE2CF;
    

`

type RegisterState = {
    username: string,
    password: string,
    role: string, 

}
type AcceptedProps = {
    updateToken: (newToken: string) => void
}

export default class Register extends Component<AcceptedProps, RegisterState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            username: '',
            password: '',
            role: 'user',
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password, role: this.state.role}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.updateToken(data.sessionToken)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('role', data.user.role)
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
            <Wrapper>
                <MainDiv>
                <form>
                    <h1>First Time? Register Here</h1>
                    <Input required min='5' max="12" placeholder="Username" type="text" onChange={(this.handleUsernameInput.bind(this))} />
                    <Input required placeholder="Password" type="text" onChange={this.handlePasswordInput.bind(this)} />
                    <Button onClick={this.handlesubmit.bind(this)}>Submit</Button>
                </form>
                </MainDiv>
            </Wrapper>
            </>
        )
    }
}
