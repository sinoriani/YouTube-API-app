import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Video from "./Video"

const Videos = (props) => {
    const [videos, setVideos] = useState([])

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
                id : 'g1eKFoCf0VE,ewRw996uevM,L72fhGm1tfE'
            }
        }).then((response) => {
            console.log(response.data)
            let vids = []
            response.data.forEach(element => {
                let channelData = {
                    "id" : element.snippet.channelId,
                    "title" : element.snippet.channelTitle,
                }
                let videoData = {
                    title : element.snippet.title,
                    thumbnail : element.snippet.thumbnails.medium,
                    date : element.snippet.publishedAt,
                    id : element.id
                }
                let stats = {   
                    views : element.statistics.viewCount
                }
                let key = element.id
                vids.push(
                    <Video className="videoElement" onClick={props.onClick} key={key} channelData={channelData} videoData={videoData} stats={stats} />
                )
            });
            setVideos(vids)
        });
    }

    

    return (
        <div className="App">
            <div className="d-flex flex-wrap m-3">
                {videos}
            </div>
        </div>
    );
}

export default Videos;
