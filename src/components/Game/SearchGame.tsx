import React, {Component} from 'react';
import {Button, Select, InputLabel, MenuItem} from '@material-ui/core';

type GameState = {
    city: string,
    address: string,
    playersNeeded: number,
    time: string,
    date: string,
    skillPref: string,
    isSubmitted: boolean,
    

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
            isSubmitted: false,
            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch(`http://localhost:3005/game/search/${this.state.city}`, {
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
                isSubmitted: true
            })
    
            }
            
        )
    }

    handleCityInput(e: any) {
        this.setState({
            city: e.target.value
        })
        
    }

    
    // onChange={(e) => setState(this.state.city: e.target.value)}
    render(){
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
            </>
        )
    }
}