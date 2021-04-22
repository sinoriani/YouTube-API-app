import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {getStoredToken} from '../../utils/verifyToken';
import CommentsPage from '../comments/CommentsPage'

const VideoPlayer = (props) => {
    const [channelData, setChannelData] = useState({})
    const [videoData, setVideoData] = useState({})
    const [stats, setStats] = useState({})


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
                id : props.match.params.id
            }
        }).then((response) => {
            let element = response.data[0]
            let _channelData = {
                "id" : element.snippet.channelId,
                "title" : element.snippet.channelTitle,
            }
            let _videoData = {
                title : element.snippet.title,
                thumbnail : element.snippet.thumbnails.medium,
                date : element.snippet.publishedAt,
                id : element.id
            }
            let _stats = {   
                views : element.statistics.viewCount
            }
            setChannelData(_channelData)
            setVideoData(_videoData)
            setStats(_stats)
        });
    }


    return ( 
        <div className="m-1 " >
            <div className="m-auto p-3" style={{maxWidth:"1000px"}} >
                <iframe width="1000" height="600" src={"https://www.youtube.com/embed/" + props.match.params.id} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="text-left">
                    <h2>{videoData.title}</h2>
                    <div className="text-dim">{stats.views} views</div>
                    <div className="border-top p-1 mt-1">
                        <span className="text-dim">By</span> {channelData.title}
                    </div>
                </div>
            </div>

            <div>
                <CommentsPage videoId={props.match.params.id} />
            </div>
        </div> 
    );
}
 
export default VideoPlayer;
 