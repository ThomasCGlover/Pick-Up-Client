import React, {Component} from 'react';
import Register from './Register';
import Login from './Login';
import { render } from '@testing-library/react';
import { withStyles } from '@material-ui/core/styles';




type AcceptedProps = {
    updateToken: (newToken: string) => void
}

const Auth: React.FunctionComponent<AcceptedProps> = (props) => {
        return(
            <>
                <Login updateToken={props.updateToken} />
                <Register updateToken={props.updateToken} />
            </>
        )
    }

export default Auth;
