import React, {Component} from 'react';
import {Form,} from 'reactstrap';
import APIURL from '../helpers/environment';
import styled from 'styled-components';

const Paragraph = styled.p`
    color: #DFE2CF;
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

const Label = styled.label`
    color: #DFE2CF;
`
const Input = styled.input`
    background-color: #DFE2CF;
`
    


type AdminData = {
    userId: number,
    
}
type AcceptedProps = {
    sessionToken: string | null,
}
export default class AdminDelete extends Component<AcceptedProps, AdminData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            userId: 0,
            
        }
    }
    handleDelete = (userId: number) => {
        fetch(`${APIURL}/user/delete/admin/${userId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            this.setState({
                userId: data,
            })
        })
        
    }
    render() {
        if(localStorage.getItem('role') == 'admin'){
        return(
            <div className='main'>
                <div className='mainDiv'>
                    <Form>
                        <Label>User's ID</Label>
                        <Input onChange={(e) => this.setState({userId: parseInt(e.target.value)})} />
                        <br/>
                        <Button onClick={(e) => this.handleDelete(this.state.userId)}>Delete User and All Data</Button> {/*will this delete*/}
                    </Form>
                </div>
            </div>
        )
        }
        else{
            return(
                <div>
                    <Paragraph>You are not authorized to view this!</Paragraph>
                </div>
            )
        }
    }
}
