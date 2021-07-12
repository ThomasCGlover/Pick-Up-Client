import React, {Component} from 'react';
// import { Select, InputLabel, option} from '@material-ui/core';
import { render } from '@testing-library/react';
import styled from 'styled-components';
import APIURL from '../helpers/environment';

const CreateTitle = styled.h1`
    color: #DFE2CF;
    font-size: 8vh;

`
const Center = styled.div`
    display: flex;
    justify-content: center;
`
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 18vw;
    padding-right: 15vw;
    margin-bottom: 3vh;
`

const Input = styled.input`
    background-color: #DFE2CF;
    
`

const Label = styled.label`
    color: #FF934F;
    font-size: 5vh;

`
const Button = styled.button`
    border-radius: 8px;
    background-color: #FF934F;
    :hover{
        color: white;
    }
    width: 60vw;
    height: 5vh;
`
const Para = styled.p`
    color: #DFE2CF;
    font-size: 10vh;
`

const Select = styled.select`
    background-color: #DFE2CF;
    width: 10vw;
    height: 5vh;
    font-size: 3vh;
`



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
        fetch(`${APIURL}/game/create`, {
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


    //created these three functions because Typescript is not recognizing the dropdown values as string
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

    handleSkillInput(e: any) {
        this.setState({
            skillPref: e.target.value
        })
        
    }
 
    // onChange={(e) => setState(this.state.city: e.target.value)}
    render(){
        return(
            <>
                <form>
                    <CreateTitle>Create a game in your city!</CreateTitle>
                    <Center>
                    <InputDiv>
                    {/* <Column> */}
                    <Label>City</Label>
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
                        {/* </Column> */}
                    <Label>Address</Label>
                    <Input placeholder="Address of Game" type="text" onChange={(e)=>this.setState({address: e.target.value})} />
                    <Label>Players Needed</Label>
                        <Select onChange={this.handlePlayersInput.bind(this)}>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                        </Select>
                    <Label>Time</Label>
                    <Input placeholder="Time (e.g. 6pm)" type="text" onChange={(e)=>this.setState({time: e.target.value})} />
                    <Label>Date</Label>
                    <Input placeholder="Date (e.g. July 7th 2021)" type="text" onChange={(e)=>this.setState({date: e.target.value})} />
                    <Label>Skill</Label>
                        <Select onChange={this.handleSkillInput.bind(this)}>
                            <option value='Casual'>Casual</option>
                            <option value='Competitive'>Competitive</option>
                        </Select>
                        </InputDiv>
                        </Center>
                    <Button onClick={this.handlesubmit.bind(this)}>Create</Button>
                </form>
                {this.state.message === true && (
                    <div>
                        <Para>Successfully created game! It is now available in your user profile!</Para>
                    </div>
                )}
            
            </>
        )
    }
}

















