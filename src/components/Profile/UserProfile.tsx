import React, {Component} from 'react';
import { Select, InputLabel, MenuItem} from '@material-ui/core';
import { Card, CardTitle, CardText } from 'reactstrap';
import APIURL from '../helpers/environment';
import styled from 'styled-components';
import CommentDisplay from '../Game/CommentDisplay';


const Heading = styled.h1`
    color: #FF934F;
`

const Input = styled.input`
    border: 1px solid #5A2328;
    background-color: #f0efeb;
    height: 5vh;
    width: 40vw;
    margin-bottom: 4vh;
    
`
const Button = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
    width: 6vw;
    height: 6vh;
    margin-left: 2vw;
`

const DeleteButton = styled.button`
border-radius: 8px;
background-color: #FF934F;
:hover{
    color: white;
}
width: 20vw;
height: 6vh;
margin-left: 3vw;
`
const Center = styled.div`

`




type ProfileState = {
    games: any[],
    comments: any[],
    id: number,
    playersNeeded: any //getting type unknown error for some reason in the input onChange, changed to 'any' just to get it functional
    editCommentInput: string,
    commentInput: string,
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
            editCommentInput: '',
            commentInput: ''
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

    getGames = () => {
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

    getComments = () => {
        fetch(`${APIURL}/comment/mycomments`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                comments: data.userComments
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
            this.getGames();
        })
    }

    addComment = (GameId: number) => {
        const commUsername = localStorage.getItem('username');
        fetch(`http://tcg-pickup-server.herokuapp.com/comment/add/${GameId}`, {
            method: 'POST',
            body: JSON.stringify({content: this.state.commentInput}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                commentInput: ''
            })
            this.getGames()
            this.getComments()
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
                editCommentInput: ''
            })
            
            this.getComments();
            this.getGames();
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
            console.log(data)
            this.getComments()
            this.getGames()

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
            this.getGames()
            
        })
    }
    
    // Styling the material UI components was very tricky, I decided to use in-line styling despite the time it might have wasted
    render(){
        const {games} = this.state;
        return(
            <div>
                <Heading>Your Games:</Heading>
                {this.state.games.length > 0 && (
                    <div className="games-container">
                        
                        {this.state.games.map(game => (
                            <div className="game" key={game.id}>
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#DFE2CF', maxWidth: '60vw', borderRadius: '5px', border: 'solid 4px #FF934F', marginBottom: '2vh'}}>
                                    <Center>
                                    <CardTitle tag="h2" style={{color: '#3D0814', fontSize: '6vh'}}>Game {game.id}</CardTitle>
                                    <CardTitle style={{color: '#3D0814', fontSize: '4vh'}}tag="h3">{game.city}</CardTitle>
                                        <CardText style={{color: '#3D0814', fontSize: '3vh'}} tag="h4">{game.date}</CardText>
                                        <CardText style={{color: '#3D0814', fontSize: '3vh'}}>{game.time}</CardText>
                                        <CardText style={{color: '#3D0814', fontSize: '3vh'}}>{game.address}</CardText>
                                        <CardText style={{color: '#3D0814', fontSize: '3vh'}}>Players Needed: {game.playersNeeded}</CardText>
                                        <CardText style={{color: '#3D0814', fontSize: '3vh'}}>Skill Preference: {game.skillPref}</CardText>
                                        <CommentDisplay comments={game.comments}/>
                                        <Input onChange={(e)=>this.setState({commentInput: e.target.value})} type="text" placeholder="Add Comment" value={this.state.commentInput} />
                                        <Button onClick={()=>this.addComment(game.id)}>Submit</Button>
                                        <InputLabel style={{color: '#3D0814', fontSize: '2vh'}}>Update Players Needed</InputLabel>
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
                                        <DeleteButton onClick={()=>this.deleteGame(game.id)}>Delete Game</DeleteButton> 
                                        </Center>             
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Heading>Your Comments:</Heading>
                {this.state.comments.length > 0 && (
                    <div className="comments-container">
                        {this.state.comments.map(comment => (
                            <div className="comment" key={comment.id}>
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#DFE2CF', maxWidth: '60vw', borderRadius: '5px', border: 'solid 4px #FF934F', marginBottom: '2vh' }}>
                                        <CardTitle tag="h4">You Commented on Game {comment.GameId}...</CardTitle>
                                        {/* <CardText></CardText> */}
                                        <CardText>{comment.username}: {comment.content}</CardText>
                                        <CardText>{comment.address}</CardText>
                                        <Input placeholder="Change your comment" type="text" onChange={(e)=>this.setState({editCommentInput: e.target.value})}></Input>      
                                        <Button onClick={()=>this.editComment(comment.id)}>Change</Button> 
                                        <DeleteButton onClick={()=>this.deleteComment(comment.id)}>Delete Comment</DeleteButton>             
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
