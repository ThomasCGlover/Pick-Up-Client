import React, {Component} from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    background-color: #3D0814;
    height: 25vh;
    max-width: 95vw;
    color: #FF934F;
    
    

`

const MainDiv = styled.div`
    padding-top: 0vh;
    background=color: white;
    display: flex;
    justify-content: center;

`
const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1vh;
`

const LoginText = styled.h1`
    font-size: 7vh;
    margin-bottom: 1vh;
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


type LoginState = {
    username: string,
    password: string,
    role: string,
    

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
            role: '',
            
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch('http://tcg-pickup-server.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.updateToken(data.sessionToken)
            // this.setState({
            //     // role: data.user.role
            // })
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
            <TextWrapper>
            <LoginText>Login</LoginText>
            </TextWrapper>
                <MainDiv>
                    <form>
                        <Input placeholder="Username" type="text" onChange={this.handleUsernameInput.bind(this)} />
                        <Input placeholder="Password" type="password" onChange={this.handlePasswordInput.bind(this)} />
                        <Button onClick={this.handlesubmit.bind(this)}>Submit</Button>
                    </form>
                </MainDiv>
            </Wrapper>
            </>
        )
    }
}