import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';


function Channels() {

    const [ChannelsList, setChannelsList] = useState([]);
    useEffect(() => {
        let token = getStoredToken();
        getChannelsByCategory(token);
    }, [])

    const getChannelsByCategory = async (token) => {
        let url = "/channels/getAll";
    
        axios.get(url,{
            params: {
                ...token,
                category : "history"
            }
        }).then((response) => {
            
            let list = []
           response.data.items.forEach((element) => {
                list.push( { "title" : element.snippet.localized.title  , "description" :element.snippet.localized.description  })
            });
            console.log(response);
            
            setChannelsList(list);
            
        });
    }

    return (
        <div className="App">
            <h1>Channels by Category page</h1>
            {ChannelsList.forEach((element) =>{
            <div style={{backgroundColor:"#181818", padding:"10px", maxWidth:"400px"}}>
               <h3>Title: {element.title}</h3>
               <div>Description: {element.description}</div>
            </div>}
              )}
        </div>);
}

export default Channels;