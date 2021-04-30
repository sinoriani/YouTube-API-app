import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {getStoredToken} from '../../utils/verifyToken';
import {Link} from "react-router-dom";

const Video = (props) => {
   
    return ( 
        <div className="m-1" style={{"maxWidth":"320px"}}>
                <div className="text-left w-100 p-1" >
                    <span style={{color:"#dfdfdf"}}>By</span> {props.channelData.title}
                </div>
                <Link to={"/video/" + props.videoData.id}>
                    <img id={props.videoData.id} src={props.videoData.thumbnail.url} alt="video thumbnail"/>
                </Link>
                <div className="text-left w-100 p-1" style={{color:"#dfdfdf"}} >
                    {props.videoData.title}
                </div>
        </div> 
    );
}
 
export default Video;
 