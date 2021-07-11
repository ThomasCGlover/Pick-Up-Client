import React from 'react';
import Register from './Register';
import Login from './Login';
import styled from 'styled-components';


const Info = styled.p`
    color: #DFE2CF;
    text-align: center;
    font-size: 3vh;
    margin-top: 1vh;
    font-weight: bold;
    
`
const Span = styled.span`
    color: #FF934F;
    font-style: italic;
`

type AcceptedProps = {
    updateToken: (newToken: string) => void
}



const Auth: React.FunctionComponent<AcceptedProps> = (props) => {

        return(
            <>
            <div>
                <Login updateToken={props.updateToken} />
                <Info>In 40 <Span>Indiana</Span> cities, Pick-Up Finder <br/>allows you to create and search for local pick-up basketball games in your area <br/>and get on a court quickly! </Info>
                <Register updateToken={props.updateToken} />
            </div>
            </>
        )
    }

export default Auth;
