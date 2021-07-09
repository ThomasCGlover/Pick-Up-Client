import React, {Component} from 'react';
import {Button, CardText } from 'reactstrap';

type AcceptedProps = {
    comments: any[]
}


const CommentDisplay: React.FunctionComponent<AcceptedProps> = (props) => {

    return(

        <div className="comments-container">
            {props.comments.map(comment => (
            <div className="comment">
                <CardText tag="h4">{comment.content}</CardText>     
            </div>
        ))}
    </div>
)
}
        


export default CommentDisplay;