import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Video from "./Video"

function Videos() {
    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
    }, [])

    const getVideoData = async (token) => {
        let url = "/videos/get";
        console.log(url)
        axios.get(url,{
            params: {
                ...token,
                id : 'g1eKFoCf0VE'
            }
        }).then((response) => {
            console.log(response.data[0])
           
        });
    }

    return (
        <div className="App">
            <h1>Video</h1>
            <div>
                <Video/>
            </div>
        </div>
    );
}

export default Videos;
