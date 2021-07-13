import React, {Component} from 'react';
// import { Select, InputLabel} from '@material-ui/core';
import { Card, CardTitle, CardText } from 'reactstrap';
import CommentDisplay from './CommentDisplay';
import APIURL from '../helpers/environment';
import styled from 'styled-components';
import{
    Route, 
    Link, 
    Switch
} from 'react-router-dom';

const Heading = styled.h1`
    color: #DFE2CF;
    font-size: 7vh;
`
const Select = styled.select`
    background-color: #DFE2CF;
    width: 10vw;
    height: 5vh;
    font-size: 3vh;
    margin-left: 14.5vw;
`

const Button = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
    width: 15vw;
    height: 8vh;
    margin-left: 12vw;
    margin-top: 2px;
    
    `

const CommentButton = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
    width: 8vw;
    height: 6vh;
    margin-left: 1vw;
    margin-top: 0px;
`
const Label = styled.label`
    color: #FF934F;
    margin-left: 10.5vw;
    margin-bottom: 1vh;
    font-size: 5vh;

`
const Input = styled.input`
    border: 1px solid #5A2328;
    background-color: #f0efeb;
    height: 5vh;
    width: 40vw;
    margin-bottom: 4vh;
    
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90vw;
`


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

    fetchGames = () => {
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
        
        fetch(`${APIURL}/comment/add/${GameId}`, {
            method: 'POST',
            body: JSON.stringify({content: this.state.commentInput}), //username: displayedName
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
            this.fetchGames();
            
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
                    <Heading>Search for Pick-Up Game by City!</Heading>
                    
                    <Column>
                    
                    <Label>Choose your city</Label>
                        <Select onChange={this.handleCityInput.bind(this)}>
                            <option value='Anderson'>Anderson</option>
                            <option value='Bloomington'>Bloomington</option>
                            <option value='Carmel'>Carmel</option>
                            <option value='Columbus'>Columbus</option>
                            <option value='Crown Point'>Crown Point</option>
                            <option value='East Chicago'>East Chicago</option>
                            <option value='Elkhart'>Elkhart</option>
                            <option value='Evansville'>Evansville</option>
                            <option value='Fishers'>Fishers</option>
                            <option value='Fort Wayne'>Fort Wayne</option>
                            <option value='Franklin'>Franklin</option>
                            <option value='Gary'>Gary</option>
                            <option value='Goshen'>Goshen</option>
                            <option value='Greenfield'>Greenfield</option>
                            <option value='Greenwood'>Greenwood</option>
                            <option value='Hammond'>Hammond</option>
                            <option value='Hobart'>Hobart</option>
                            <option value='Indianapolis'>Indianapolis</option>
                            <option value='Jeffersonville'>Jeffersonville</option>
                            <option value='Kokomo'>Kokomo</option>
                            <option value='Lafayette'>Lafayette</option>
                            <option value='La Porte'>La Porte</option>
                            <option value='Lawrence'>Lawrence</option>
                            <option value='Logansport'>Logansport</option>
                            <option value='Marion'>Marion</option>
                            <option value='Michigan City'>Michigan City</option>
                            <option value='Mishawaka'>Mishawaka</option>
                            <option value='Muncie'>Muncie</option>
                            <option value='New Albany'>New Albany</option>
                            <option value='Noblesville'>Noblesville</option>
                            <option value='Portage'>Portage</option>
                            <option value='Richmond'>Richmond</option>
                            <option value='Seymour'>Seymour</option>
                            <option value='Shelbyville'>Shelbyville</option>
                            <option value='South Bend'>South Bend</option>
                            <option value='Terre Haute'>Terre Haute</option>
                            <option value='Valparaiso'>Valparaiso</option>
                            <option value='Vincennes'>Vincennes</option>
                            <option value='Westfield'>Westfield</option>
                            <option value='West Lafayette'>West Lafayette</option>
                        </Select>
                        
                        </Column>
                    <Button onClick={this.handlesubmit.bind(this)}>SEARCH</Button>
                </form>

                {games.length > 0 && (
                    <div className="games-container">
                        {games.map(game => (
                            <div className="game" key={game.id}>
                                <div>
                                <Card body inverse style={{ backgroundColor: '#DFE2CF', maxWidth: '60vw', borderRadius: '5px', border: 'solid 4px #FF934F', marginBottom: '2vh'}}>
                                        <CardTitle tag="h2" style={{color: '#3D0814', fontSize: '6vh'}}>Game {game.id}</CardTitle>
                                        <CardText tag="h4" style={{color: '#3D0814', fontSize: '3vh'}} >{game.date}</CardText>
                                        <CardText>{game.time}</CardText>
                                        <CardText>{game.address}</CardText>
                                        <CardText>Players Needed: {game.playersNeeded}</CardText>
                                        <CardText>Skill Preference: {game.skillPref}</CardText> 
                                        <CommentDisplay comments={game.comments}/>
                                        <Input onChange={this.commentInput.bind(this)} type="text" placeholder="Add Comment" value={this.state.commentInput} />
                                        <CommentButton onClick={()=>this.addComment(game.id)}>Submit</CommentButton>
                                    
                                    </Card>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                )} 
            </>
        )
    }
}
