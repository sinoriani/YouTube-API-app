import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Channel from "./Channel"
import { Link } from 'react-router-dom';

function ChannelPage() {

    const [title, setTitle] = useState("");
    const [description, setDesctiption] = useState("");

    useEffect(() => {
        let token = getStoredToken();
        getChannelData(token);
    }, [])

    const getChannelData = async (token) => {
        let url = "/channels/get";
        console.log(url)
        axios.get(url,{
            params: {
                ...token,
                id : "UC-XIAtixv2iPu1SUDictyLQ"
            }
        }).then((response) => {
            console.log(response.data)
            setTitle(response.data[0].snippet.localized.title);
            setDesctiption(response.data[0].snippet.localized.description);
        });
    }

    return (
        <div className="App">
            <h1>Channel page</h1>
            <div>
                <Channel title={title} description={description}  />
                
            </div>
        </div>
    );
}

export default ChannelPage;
