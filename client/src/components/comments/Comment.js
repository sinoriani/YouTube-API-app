import React from 'react'

const Comment = (props) => {
    return (
        <div style={{backgroundColor:"#181818", padding:"10px", margin:"5px"}}>
            <h3>User: {props.name}</h3>
            <div>Comment: {props.comment}</div>
        </div>
    )
}

export default Comment;