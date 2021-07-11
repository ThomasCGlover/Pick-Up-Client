import React, {Component} from 'react';
import {Form, Input, Label, Button} from 'reactstrap';
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
        fetch(`http://tcg-pickup-server.herokuapp.com/user/delete/admin/${userId}`, {
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
}
