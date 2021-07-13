import React, {Component} from 'react';
import {Button, CardText } from 'reactstrap';


type AcceptedProps = {
    comments: any[]
}


const CommentDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return(

        <div className="comments-container">
            <br/>
            <h3 style={{color: '#3D0814', fontSize: '4vh'}}>Comments</h3>
            {props.comments.map(comment => (
            <div className="comment">
                <CardText style={{color: '#3D0814', fontSize: '3vh'}} tag="h4">{comment.content}</CardText>     
            </div>
        ))}
    </div>
)
}
        


export default CommentDisplay;