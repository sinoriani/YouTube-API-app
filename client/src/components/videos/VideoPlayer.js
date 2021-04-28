import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {getStoredToken} from '../../utils/verifyToken';
import CommentsPage from '../comments/CommentsPage';
import { Button } from "../elements/SubscriptionButton";


const VideoPlayer = (props) => {
    const [channelData, setChannelData] = useState({})
    const [videoData, setVideoData] = useState({})
    const [stats, setStats] = useState({})
    const [subs, setSubs] = useState("");
   
 


    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
        
    }, [])

    const getVideoData = async (token) => {
        let url = "/videos/get";
        axios.get(url,{
            params: {
                ...token,
                id : props.match.params.id
            }
        }).then((response) => {
            let element = response.data[0]
            let _channelData = {
                "id" : element.snippet.channelId,
                "title" : element.snippet.channelTitle
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
            setChannelData(_channelData);
            setVideoData(_videoData);
            setStats(_stats);
            IsSubscribed(token,element.snippet.channelId);
        });
    }
    function IsSubscribed (token,channelId)  {
        let url = "/channels/IsSubscribed";
         console.log(channelId);
        axios.get(url,{
            params: {
                ...token,
                forChannelId: channelId,
            }
        }).then((response) => {
            console.log(response.data);
            setSubs(response.data);
        });
    }
    function NotSubscribed(props) {
        let token = getStoredToken();
        return <Button
        onClick={() => {Subscription(token)}}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium">SUBSCRIBE
        </Button>;
    }
    
    function Subscribed(props) {
        return <Button
        onClick={() => {console.log("You Clicked on Me!"); }}
        type="button"
        buttonStyle="btn--danger--outline"
        buttonSize="btn--medium">SUBSCRIBED
        </Button>;
    }
    function SubscriptionButton() {
        if (subs=="subscribed") 
        {
            return <Subscribed />;
        } else{
          return <NotSubscribed />;}
    }
      
    const Subscription = async (token) => {
        let url = "/channels/subscription";

        axios.post(
            url,
            {
                method:"post",
                
            },
            {
                params: {
                    ...token,
                    channelId: channelData.id
                   
                }
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
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
            <SubscriptionButton />
            <div>
                <CommentsPage videoId={props.match.params.id} />
            </div>
        </div> 
    );
}
 
export default VideoPlayer;
 