import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Channel from "./Channel"

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
                id : "UC29ju8bIPH5as8OGnQzwJyA"
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
