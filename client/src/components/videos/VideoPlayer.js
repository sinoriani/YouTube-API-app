import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getStoredToken } from '../../utils/verifyToken';
import CommentsPage from '../comments/CommentsPage';
import {Link} from "react-router-dom";


const VideoPlayer = (props) => {
    const [channelData, setChannelData] = useState({})
    const [videoData, setVideoData] = useState({})
    const [stats, setStats] = useState({})
    const [subs, setSubs] = useState("");
    const [isRated, setisRated] = useState("");



    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
        getVideostats(token);
        addWatchHistory(token);
        getRating(token);
        addLikesHistory(token);

    }, [])

    

    const addWatchHistory = async (token) => {
        
        let url = "/users/addWatchHistory";
        axios.get(url, {
            params: {
                ...token,
                video_id: props.match.params.id
            }
        }).then((response) => {
            console.log(response);
        });
    }

    const getVideoData = async (token) => {
        
        let url = "/videos/get";
        axios.get(url, {
            params: {
                ...token,
                id: props.match.params.id
            }
        }).then((response) => {
            let element = response.data[0]
            if(element){
                let _channelData = {
                    "id": element.snippet.channelId,
                    "title": element.snippet.channelTitle
                }
    
                let _videoData = {
                    title: element.snippet.title,
                    thumbnail: element.snippet.thumbnails.medium,
                    date: element.snippet.publishedAt,
                    id: element.id
                }
                console.log(element)
                setChannelData(_channelData);
                setVideoData(_videoData);
                IsSubscribed(token, element.snippet.channelId);
            }
       
        });
    }

    const getVideostats = async (token) => {
        let url = "/channels/getvideostats";
        axios.get(url,{
            params: {
                ...token,
                id : props.match.params.id
            }
        }).then((response) => {

                let _stats = {   
                    views : response.data
                }
                setStats(_stats);
                console.log(stats.views);
            });

    }

    const getRating = async (token)=> {
        let url = "/videos/getVideoRating";

        axios.get(url,{
            params: {
                ...token,
                id: props.match.params.id
            }
        }).then((response) => {
                console.log(props.match.params.id);
                let rating = response.data;
                console.log(response.data.isRated);
                setisRated(response.data.isRated);

            });

    }

    const Liked=(props)=> {
        return <div
            onClick={() => { console.log("Liked video!"); }}>
             LIKED
        </div>;
    }
    const Like=(props)=> {
        let token = getStoredToken(); 
        return <div><button className=" btn btn-md p-2 rate"
        onClick={() => { likeVideo(token) }}>
            LIKE   <i class="fas fa-thumbs-up"></i>
        </button>
        <button className=" btn btn-md p-2 rate" 
        onClick={() => {dislikeVideo(token) }}>
            DISLIKE   <i class="fas fa-thumbs-down"></i>
        </button></div>;
    }
    const Disliked=(props)=> {
        return <div
            onClick={() => { console.log("Disliked video!"); }}>
        DISLIKED
        </div>;
    }

    function Rate() {
        if (isRated=="dislike") {
            return <Disliked />;
        } else if (isRated=="like") {
            return <Liked />;
        }
        else{
        return <Like />;}
        
        
    }
    
    //Like()
    const likeVideo = async (token) => {
        let url = "/videos/likevideo";
        axios.post(
            url,
            {
                method: "post",

            },
            {
                params: {
                    ...token,
                    id: props.match.params.id
                }
            }).then(() => {
               setisRated("like");
            }).catch((err) => {
                console.log(err)
            });
    }
    //Dislike()

    const dislikeVideo = async (token) => {
        let url = "/videos/dislikevideo";
        axios.post(
            url,
            {
                method: "post",

            },
            {
                params: {
                    ...token,
                    id: props.match.params.id
                }
            }).then(() => {
               setisRated("dislike");
            }).catch((err) => {
                console.log(err)
            });
    }
    const addLikesHistory = async (token) => {
        if (isRated=="like") {
        let url = "/users/addLikesHistory";
        axios.get(url, {
            params: {
                ...token,
                video_id: props.match.params.id
            }
        }).then((response) => {
            console.log(response);
        })}
    }

    function IsSubscribed(token, channelId) {
        let url = "/channels/IsSubscribed";
        console.log(channelId);
        axios.get(url, {
            params: {
                ...token,
                forChannelId: channelId,
            }
        }).then((response) => {
            console.log(response.data);
            setSubs(response.data.isSubbed);
            
        });
    }

    function NotSubscribed(props) {
        let token = getStoredToken();
        return <button
            onClick={() => { Subscription(token) }}
            type="button"
            className="btn btn-md btn-danger">
                SUBSCRIBE
        </button>;
    }

    function Subscribed(props) {
        return <div
            onClick={() => { console.log("You Clicked on Me!"); }}
            type="div"
            className="p-2 text-danger">
            SUBSCRIBED <i className="fas  fa-check-circle"></i>
        </div>;
    }

    function SubscriptionButton() {
        if (subs) {
            return <Subscribed />;
        } else {
            return <NotSubscribed />;
        }
    }

    const Subscription = async (token) => {
        let url = "/channels/subscription";
        console.log(channelData.id)
        axios.post(
            url,
            {
                method: "post",

            },
            {
                params: {
                    ...token,
                    channelId: channelData.id

                }
            }).then((response) => {
                console.log(response)
                if(response.data == "ok"){
                    setSubs(true);
                }
            }).catch((err) => {
                console.log(err)
            });
    }


    return (
        <div className="m-1 " >
            <div className="m-auto p-3" style={{ maxWidth: "1000px" }} >
                <iframe width="1000" height="600" src={"https://www.youtube.com/embed/" + props.match.params.id} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <div className="text-left">
                    <h2>{videoData.title}</h2>
                    <div className="text-dim">{stats.views} views</div>
                    <div className="border-top p-1 mt-1 d-flex justify-content-between">
                        <div className="pt-1 ">
                            <span className="text-dim ">By</span><Link to={"/Channel/" + channelData.id} style={{color:"#dfdfdf"}}><span> {channelData.title}</span></Link>
                        </div>
                        
                        <SubscriptionButton />
                        <Rate video_id={props.match.params.id} />
                    </div>
                    
                </div>
            </div>

            <div className="">
                <CommentsPage videoId={props.match.params.id} />
            </div>
        </div>
    );
}

export default VideoPlayer;
