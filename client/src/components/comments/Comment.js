import React from 'react'

const Comment = (props) => {
    return (
        <div className="comment" >
            {props.toxicity < 0.3 ? '' : <div className="toxic">Toxic</div> }
            <img src={props.image} className="commentProfileImg" alt="author profile image"/>
            <div>{props.comment}</div>
        </div>
    )
}

export default Comment;