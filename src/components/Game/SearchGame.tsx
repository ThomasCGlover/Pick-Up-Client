import React, {Component} from 'react';
import { Select, InputLabel, MenuItem} from '@material-ui/core';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import CommentDisplay from './CommentDisplay';
import APIURL from '../helpers/environment';

type GameState = {
    city: string,
    address: string,
    playersNeeded: number,
    time: string,
    date: string,
    skillPref: string,
    games: any[],
    comments: any[],
    commentInput: string,
    GameId: number,
    // newComment: string,
    
}
type AcceptedProps = {
    sessionToken: string | null,
}

export default class SearchGame extends Component<AcceptedProps, GameState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            city: '',
            address: '',
            playersNeeded: 0,
            time: '',
            date: '',
            skillPref: '',
            games: [],
            comments: [],
            commentInput: '',
            GameId: 0,
            // newComment: ''
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch(`${APIURL}/game/search/${this.state.city}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                games: data,
                // comments: data.comments
            })
        })
    }


    addComment = (GameId: number) => {
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
            console.log(data)
        })
    }


    commentInput(e:any){
        this.setState({
            commentInput: e.target.value
        })
    }

    handleCityInput(e: any) {
        this.setState({
            city: e.target.value
        })
    }
    
    // onChange={(e) => setState(this.state.city: e.target.value)}
    render(){
        console.log(this.state.games)
        const { games } = this.state;
        // const { comments } = this.state;
        
        return(
            <>
                <form>
                    <h1>Search for a game near you!</h1>
                    <InputLabel>Choose your city</InputLabel>
                        <Select onChange={this.handleCityInput.bind(this)}>
                            <MenuItem value='Anderson'>Anderson</MenuItem>
                            <MenuItem value='Bloomington'>Bloomington</MenuItem>
                            <MenuItem value='Carmel'>Carmel</MenuItem>
                            <MenuItem value='Columbus'>Columbus</MenuItem>
                            <MenuItem value='Crown Point'>Crown Point</MenuItem>
                            <MenuItem value='East Chicago'>East Chicago</MenuItem>
                            <MenuItem value='Elkhart'>Elkhart</MenuItem>
                            <MenuItem value='Evansville'>Evansville</MenuItem>
                            <MenuItem value='Fishers'>Fishers</MenuItem>
                            <MenuItem value='Fort Wayne'>Fort Wayne</MenuItem>
                            <MenuItem value='Franklin'>Franklin</MenuItem>
                            <MenuItem value='Gary'>Gary</MenuItem>
                            <MenuItem value='Goshen'>Goshen</MenuItem>
                            <MenuItem value='Greenfield'>Greenfield</MenuItem>
                            <MenuItem value='Greenwood'>Greenwood</MenuItem>
                            <MenuItem value='Hammond'>Hammond</MenuItem>
                            <MenuItem value='Hobart'>Hobart</MenuItem>
                            <MenuItem value='Indianapolis'>Indianapolis</MenuItem>
                            <MenuItem value='Jeffersonville'>Jeffersonville</MenuItem>
                            <MenuItem value='Kokomo'>Kokomo</MenuItem>
                            <MenuItem value='Lafayette'>Lafayette</MenuItem>
                            <MenuItem value='La Porte'>La Porte</MenuItem>
                            <MenuItem value='Lawrence'>Lawrence</MenuItem>
                            <MenuItem value='Logansport'>Logansport</MenuItem>
                            <MenuItem value='Marion'>Marion</MenuItem>
                            <MenuItem value='Michigan City'>Michigan City</MenuItem>
                            <MenuItem value='Mishawaka'>Mishawaka</MenuItem>
                            <MenuItem value='Muncie'>Muncie</MenuItem>
                            <MenuItem value='New Albany'>New Albany</MenuItem>
                            <MenuItem value='Noblesville'>Noblesville</MenuItem>
                            <MenuItem value='Portage'>Portage</MenuItem>
                            <MenuItem value='Richmond'>Richmond</MenuItem>
                            <MenuItem value='Seymour'>Seymour</MenuItem>
                            <MenuItem value='Shelbyville'>Shelbyville</MenuItem>
                            <MenuItem value='South Bend'>South Bend</MenuItem>
                            <MenuItem value='Terre Haute'>Terre Haute</MenuItem>
                            <MenuItem value='Valparaiso'>Valparaiso</MenuItem>
                            <MenuItem value='Vincennes'>Vincennes</MenuItem>
                            <MenuItem value='Westfield'>Westfield</MenuItem>
                            <MenuItem value='West Lafayette'>West Lafayette</MenuItem>
                        </Select>
                    <button onClick={this.handlesubmit.bind(this)}>Submit</button>
                </form>

                {games.length > 0 && (
                    <div className="games-container">
                        
                        {games.map(game => (
                            <div className="game" key={game.id}>
                                <div>
                                    <Card body inverse style={{ backgroundColor: '#E5E9EC', borderColor: '#333' }}>
                                        <CardTitle tag="h2">Game {game.id}</CardTitle>
                                        <CardText tag="h4">{game.date}</CardText>
                                        <CardText>{game.time}</CardText>
                                        <CardText>{game.address}</CardText>
                                        <CardText>Players Needed: {game.playersNeeded}</CardText>
                                        <CardText>Skill Preference: {game.skillPref}</CardText> 
                                        {/* <CardText>{game.comments}</CardText> */}
                                        <CommentDisplay comments={game.comments}/>
                                        <input onChange={this.commentInput.bind(this)} type="text" placeholder="Add Comment" value={this.state.commentInput} />
                                        <Button onClick={()=>this.addComment(game.id)}>Submit</Button>
                                    </Card>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                )} 
                {/* {games.length === 0 && (
                    <div>
                        <p>Sorry, there have been no games created yet in your city! Go to Create Game and be the first!</p>
                    </div>
                )} */}
            </>
        )
    }
}
