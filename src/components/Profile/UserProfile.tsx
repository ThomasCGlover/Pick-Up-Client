import React, {Component} from 'react';
import { Select, InputLabel, MenuItem} from '@material-ui/core';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import APIURL from '../helpers/environment';

type ProfileState = {
    games: any[],
    comments: any[],
    id: number,
    playersNeeded: any //getting type unknown error for some reason in the input onChange, changed to 'any' just to get it functional,
    editCommentInput: string,
}
type AcceptedProps = {
    sessionToken: string | null,
}

export default class UserProfile extends Component<AcceptedProps, ProfileState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            games: [],
            comments: [],
            id: 0,
            playersNeeded: 0,
            editCommentInput: ''
        }
    }

    componentWillMount(){
        fetch(`${APIURL}/comment/mycomments`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            
            this.setState({
                comments: data.userComments
            })
        })


        fetch(`${APIURL}/game/mygames`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            
            this.setState({
                games: data
            })
        })
        
        
    }

    deleteGame = (id: number) => {
        fetch(`${APIURL}/game/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({
                games: data,
            })
            window.location.reload()
        })
    }

    deleteComment = (id: number) => {
        fetch(`${APIURL}/comment/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({
                comments: data,
            })
            window.location.reload()
        })
    }

    editComment = (id: number) => {
        fetch(`${APIURL}/comment/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify({content: this.state.editCommentInput}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            // this.setState({
            //     newComment: data,
            //     // comments: data.comments
            // })
            console.log(data)
            window.location.reload()
        })
    }

    updatePlayersNeeded = (id: number) => {
        fetch(`${APIURL}/game/playersneeded/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                playersNeeded: this.state.playersNeeded
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({
                playersNeeded: data,
            })
            window.location.reload()
            
        })
    }
    
    
    render(){
        const {games} = this.state;
        
        return(
            <div>
                <h2>Your Games</h2>
                {this.state.games.length > 0 && (
                    <div className="games-container">
                        
                        {this.state.games.map(game => (
                            <div className="game" key={game.id}>
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#E5E9EC', borderColor: '#333' }}>
                                    <CardTitle tag="h2">Game {game.id}</CardTitle>
                                    <CardTitle tag="h3">{game.city}</CardTitle>
                                        <CardText tag="h4">{game.date}</CardText>
                                        <CardText>{game.time}</CardText>
                                        <CardText>{game.address}</CardText>
                                        <CardText>Players Needed: {game.playersNeeded}</CardText>
                                        <CardText>Skill Preference: {game.skillPref}</CardText>
                                        {/* <input type="text" placeholder="Update Players Needed" onChange={(e)=>this.setState({playersNeeded: e.target.value})}/>   */}
                                        <InputLabel>Update Players Needed</InputLabel>
                                        <Select onChange={(e)=>this.setState({playersNeeded: e.target.value})}>
                                            <MenuItem value='0'>0</MenuItem>
                                            <MenuItem value='1'>1</MenuItem>
                                            <MenuItem value='2'>2</MenuItem>
                                            <MenuItem value='3'>3</MenuItem>
                                            <MenuItem value='4'>4</MenuItem>
                                            <MenuItem value='5'>5</MenuItem>
                                            <MenuItem value='6'>6</MenuItem>
                                            <MenuItem value='7'>7</MenuItem>
                                            <MenuItem value='8'>8</MenuItem>
                                            <MenuItem value='9'>9</MenuItem>
                                        </Select>
                                        <Button onClick={()=>this.updatePlayersNeeded(game.id)}>Update</Button> 
                                        <Button onClick={()=>this.deleteGame(game.id)}>Delete Game</Button>              
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <h2>Your Comments</h2>
                {this.state.comments.length > 0 && (
                    <div className="comments-container">
                        {this.state.comments.map(comment => (
                            <div className="comment" key={comment.id}>
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#E5E9EC', borderColor: '#333' }}>
                                        <CardTitle tag="h4">You Commented on Game {comment.GameId}...</CardTitle>
                                        <CardText>{comment.content}</CardText>
                                        <CardText>{comment.address}</CardText>
                                        <input placeholder="Change your comment" type="text" onChange={(e)=>this.setState({editCommentInput: e.target.value})}></input>      
                                        <Button onClick={()=>this.editComment(comment.id)}>Change</Button> 
                                        <Button onClick={()=>this.deleteComment(comment.id)}>Delete Comment</Button>             
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
            </div>
            
        )
    }
}
