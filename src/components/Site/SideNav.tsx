import React, {Component} from 'react';
import{
    Route, 
    Link, 
    Switch
} from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import CreateGame from '../Game/CreateGame';
import SearchGame from '../Game/SearchGame';
import UserProfile from '../Profile/UserProfile';


type AcceptedProps = {
    // updateToken: (newToken: string) => void,
    sessionToken: string | null,
    clearToken: () => void,
}

const SideNav: React.FunctionComponent<AcceptedProps> = (props) => {
    console.log(props.sessionToken)
    return(
        <div className='sidebar'>
            <div className='sidebar-list-styling'>
                <ul className='sidebar-list list-unstyled'>
                    <li><Link to='/creategame'>Create Game</Link></li>
                    <li><Link to='/searchgames'>Search for Games</Link></li>
                    <li><Link to='/profile'>Your Profile</Link></li>
                    {/* <li><Link to='/logout'><button onClick={props.clearToken} >Logout</button></Link></li> */}
                    <button onClick={props.clearToken} >Logout</button>

                </ul>
            </div>
            <div className='sidebar-route'>
                <Switch>
                    <Route exact path='/creategame'><CreateGame sessionToken={props.sessionToken}/></Route>
                    <Route exact path='/searchgames'><SearchGame sessionToken={props.sessionToken} /></Route>
                    <Route exact path='/profile'><UserProfile sessionToken={props.sessionToken}/></Route>  
                </Switch>
            </div>
        </div>
    );
}


export default SideNav;