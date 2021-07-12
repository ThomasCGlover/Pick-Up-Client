import React, {Component} from 'react';
import{
    Route, 
    Link, 
    Switch
} from 'react-router-dom';
import CreateGame from '../Game/CreateGame';
import SearchGame from '../Game/SearchGame';
import UserProfile from '../Profile/UserProfile';
import AdminDelete from '../Auth/AdminDelete';
import styled from 'styled-components';



const Button = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
    width: 12vw;
    height: 5vh;
`
const AdminLi = styled.li`
    margin-top: 50vh;
`

const Li = styled.li`
    margin-top: 4vh;
    
`

type AcceptedProps = {
    // updateToken: (newToken: string) => void,
    sessionToken: string | null,
    clearToken: () => void,
}

const SideNav: React.FunctionComponent<AcceptedProps> = (props) => {
    console.log(props.sessionToken)
    const displayedName = localStorage.getItem('username')
    return(
        
        <div className='sidebar'>
            <div className='sidebar-list-styling'>
                <ul className='sidebar-list'>
                    <Li>{displayedName}</Li>
                    <Li><Link to='/creategame'>Create Game</Link></Li>
                    <Li><Link to='/searchgames'>Search for Games</Link></Li>
                    <Li><Link to='/profile'>User Profile</Link></Li>
                    <Li><Button onClick={props.clearToken} >Logout</Button></Li>
                    <AdminLi><Link to='/admin'>*</Link></AdminLi>

                </ul>
            </div>
            <div className='sidebar-route'>
                <Switch>
                    <Route exact path='/creategame'><CreateGame sessionToken={props.sessionToken}/></Route>
                    <Route exact path='/searchgames'><SearchGame sessionToken={props.sessionToken} /></Route>
                    <Route exact path='/profile'><UserProfile sessionToken={props.sessionToken}/></Route> 
                    <Route exact path='/admin'><AdminDelete sessionToken={props.sessionToken}/></Route>
                </Switch>
            </div>
        </div>
    );
}


export default SideNav;