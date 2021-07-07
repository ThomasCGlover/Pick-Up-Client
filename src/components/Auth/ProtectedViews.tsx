import React, {Component} from 'react';
import SideNav from '../Site/SideNav';
import Auth from './Auth';
import {
    BrowserRouter as Router
  } from 'react-router-dom';

type AcceptedProps = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null, 
    clearToken: () => void,
}

const ProtectedViews: React.FunctionComponent<AcceptedProps> = (props) => {
    if(props.sessionToken === localStorage.getItem('token')) {
        console.log(props.sessionToken)
    return(
        <>
        <Router >
            <SideNav sessionToken={props.sessionToken} clearToken={props.clearToken} /> 
        </Router>
        </>
    )
    } else{
        return(
            <Auth updateToken={props.updateToken}/> 
        )
    }
}

export default ProtectedViews;

