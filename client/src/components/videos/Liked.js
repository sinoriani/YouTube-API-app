import { useEffect, useState } from 'react';
import '../../App.css';
import { getStoredToken } from '../../utils/verifyToken';
import axios from 'axios';
import Video from "./Video";




const Liked = (props) => {
    const [videos, setVideos] = useState(["Loading.."])

    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
    }, [])
   

    const getVideoData = async (token) => {
        let url = "/videos/getLiked";
        axios.get(url, {
                params: {
                    ...token,
                }
            }).then((response) => {
                var vids = []
                console.log(response.data);

                response.data.forEach(element => {
                   
                    if (element.snippet) {
                        let channelData = {
                            "id": element.snippet.channelId,
                            "title": element.snippet.channelTitle,
                        }
                        let videoData = {
                            title: element.snippet.title,
                            thumbnail: element.snippet.thumbnails.medium,
                            date: element.snippet.publishedAt,
                            id: typeof element.id == "object" ? element.id.videoId : element.id
                        }
                        

                        let key = typeof element.id == "object" ? element.id.videoId : element.id
                        vids.push(
                            <Video className="videoElement" onClick={props.onClick} key={key} channelData={channelData} videoData={videoData} />
                        )
                    }
                });
                console.log(vids)
                setVideos(vids)


            }).catch((err) => {
                console.log(err);
            });



    }


    return (
        <div className="App">
            <h1>Liked</h1>
            <div className="d-flex justify-content-center flex-wrap m-3">
                {videos}
            </div>            
        </div>
    );
}

export default Liked;
