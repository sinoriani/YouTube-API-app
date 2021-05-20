import { useEffect, useState } from 'react';
import '../../App.css';
import { getStoredToken } from '../../utils/verifyToken';
import axios from 'axios';
import Video from "./Video";




const Trending = (props) => {
    const [videos, setVideos] = useState(["Loading.."])

    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
    }, [])
   

    const getVideoData = async (token) => {
        let url = "/videos/getTrending";
        axios.get(url, {
                params: {
                    ...token,
                }
            }).then((response) => {
                var vids = []
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
                setVideos(vids)


            }).catch((err) => {
                console.log(err);
            });



    }


    return (
        <div className="App">
            <h1>Trending</h1>
            <div className="d-flex justify-content-center flex-wrap m-3">
                {videos}
            </div>            
        </div>
    );
}

export default Trending;
