import React from 'react'

const Comment = (props) => {
    return (
        <div className="comment" >
            <img src={props.image} className="commentProfileImg" alt="author profile image"/>
            <div>{props.comment}</div>
        </div>
    )
}

export default Comment;