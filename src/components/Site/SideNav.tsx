import React, {Component} from 'react';
import{
    Route, 
    Link, 
    Switch
} from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import CreateGame from '../Game/CreateGame';


type AcceptedProps = {
    updateToken: (newToken: string) => void
}

const SideNav: React.FunctionComponent<AcceptedProps> = (props) => {
    return(
        <div className='sidebar'>
            <div className='sidebar-list-styling'>
                <ul className='sidebar-list list-unstyled'>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/creategame'>Create Game</Link></li>
                </ul>
            </div>
            <div className='sidebar-route'>
                <Switch>
                    <Route exact path='/login'><Login updateToken={props.updateToken}/></Route>
                    <Route exact path='/register'><Register updateToken={props.updateToken}/></Route>
                    <Route exact path='/creategame'><CreateGame /></Route>
                </Switch>
            </div>
        </div>
    );
}


export default SideNav;