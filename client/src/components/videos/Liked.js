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
            console.log(response.data);

            let video_id = response.data[0]
            // console.log(video_id.video_id)
            axios.get("/videos/getRelatedVideos", {
                params: {
                    ...token,
                    // id : 'g1eKFoCf0VE,ewRw996uevM,L72fhGm1tfE,2DSjif0MNiA',
                    // videoCategoryId: "10",
                    relatedToVideoId: video_id.video_id
                }
            }).then((response) => {
                var vids = []
                response.data.forEach(element => {
                    // console.log(element)
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
                        // setVideos([...videos,<Video className="videoElement" onClick={props.onClick} key={key} channelData={channelData} videoData={videoData}  />])
                        // console.log(element)
                        vids.push(
                            <Video className="videoElement" onClick={props.onClick} key={key} channelData={channelData} videoData={videoData} />
                        )
                    }
                });
                console.log(vids);
                setVideos(vids)


            }).catch((err) => {
                console.log(err);
            });


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
