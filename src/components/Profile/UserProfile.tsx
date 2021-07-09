import React, {Component} from 'react';
import { Select, InputLabel, MenuItem} from '@material-ui/core';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

type ProfileState = {
    games: any[],
    comments: any[],
    id: number,
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
            id: 0
        }
    }

    componentWillMount(){
        fetch(`http://localhost:3005/comment/mycomments`, {
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


        fetch(`http://localhost:3005/game/mygames`, {
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
        fetch(`http://localhost:3005/game/delete/${id}`, {
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
                                        <Button>Edit Game</Button> 
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
                            <div className="comment">
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#E5E9EC', borderColor: '#333' }}>
                                        <CardTitle tag="h4">Commented on Game {comment.GameId}</CardTitle>
                                        <CardText>{comment.content}</CardText>
                                        <CardText>{comment.address}</CardText>      
                                        <Button>Edit Comment</Button> 
                                        <Button>Delete Comment</Button>             
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
