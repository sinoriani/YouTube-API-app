import React from 'react'

const Channel = (props) => {
    return (
        <div style={{backgroundColor:"#181818", padding:"10px", maxWidth:"400px"}}>
            <h3>Title: {props.title}</h3>
            <div>Description: {props.description}</div>
        </div>

        
    )
}

export default Channel;