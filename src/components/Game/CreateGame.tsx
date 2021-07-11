import React, {Component} from 'react';
import {Button, Select, InputLabel, MenuItem} from '@material-ui/core';
import { render } from '@testing-library/react';

type GameState = {
    city: string,
    address: string,
    playersNeeded: number,
    time: string,
    date: string,
    skillPref: string,
    message: boolean,
 

}
type AcceptedProps = {
    sessionToken: string | null,
    
}

export default class CreateGame extends Component<AcceptedProps, GameState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state={
            city: '',
            address: '',
            playersNeeded: 0,
            time: '',
            date: '',
            skillPref: '',
            message: false,
        

            
        }
    }
    handlesubmit = (e:any) => {
        e.preventDefault();
        fetch('http://tcg-pickup-server.herokuapp.com/game/create', {
            method: 'POST',
            body: JSON.stringify({city: this.state.city, address: this.state.address, playersNeeded: this.state.playersNeeded, time: this.state.time, date: this.state.date, skillPref: this.state.skillPref}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                message: true
            })

            }

            
        )
    }

    handleCityInput(e: any) {
        this.setState({
            city: e.target.value
        })
        
    }

    handlePlayersInput(e: any) {
        this.setState({
            playersNeeded: e.target.value
        })
        
    }

    handleDateInput(e: any) {
        this.setState({
            date: e.target.value
        })
        
    }
    handleSkillInput(e: any) {
        this.setState({
            skillPref: e.target.value
        })
        
    }
    handleAddressInput(e: any) {
        this.setState({
            address: e.target.value
        })
        
    }
    // onChange={(e) => setState(this.state.city: e.target.value)}
    render(){
        return(
            <>
                <form>
                    <h1>Create a Game!</h1>
                    <InputLabel>City</InputLabel>
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
                    <input placeholder="Address of Game" type="text" onChange={this.handleAddressInput.bind(this)} />
                    <InputLabel>Players Needed</InputLabel>
                        <Select onChange={this.handlePlayersInput.bind(this)}>
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
                    <input placeholder="Time (e.g. 6pm)" type="text" onChange={(e)=>this.setState({time: e.target.value})} />
                    <input placeholder="Date (e.g. July 7th 2021)" type="text" onChange={this.handleDateInput.bind(this)} />
                    <InputLabel>Skill Preference</InputLabel>
                        <Select onChange={this.handleSkillInput.bind(this)}>
                            <MenuItem value='Casual'>Casual</MenuItem>
                            <MenuItem value='Competitive'>Competitive</MenuItem>
                        </Select>
                    <button onClick={this.handlesubmit.bind(this)}>Submit</button>
                </form>
                {this.state.message === true && (
                    <div>
                        <p>Successfully created game! It is now available in your user profile!</p>
                    </div>
                )}
            
            </>
        )
    }
}

















