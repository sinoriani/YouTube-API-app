import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {getStoredToken} from '../../utils/verifyToken';


const Video = (props) => {
    const [video, setVideo] = useState("hello")
    

    //console.log(props.match.params.id);

    return ( 
        <div>
            {video}
        </div> 
    );
}
 
export default Video;
 