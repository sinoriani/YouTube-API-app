import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getStoredToken } from '../../utils/verifyToken';
import CommentsPage from '../comments/CommentsPage';
import { Button } from "../elements/SubscriptionButton";


const VideoPlayer = (props) => {
    const [channelData, setChannelData] = useState({})
    const [videoData, setVideoData] = useState({})
    const [stats, setStats] = useState({})
    const [subs, setSubs] = useState("");
    const [isSubbed, setIsSubbed] = useState(false);



    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);

    }, [])

    const getVideoData = async (token) => {
        let url = "/videos/get";
        axios.get(url, {
            params: {
                ...token,
                id: props.match.params.id
            }
        }).then((response) => {
            let element = response.data[0]
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
            let _stats = {
                views: element.statistics.viewCount
            }
            setChannelData(_channelData);
            setVideoData(_videoData);
            setStats(_stats);
            IsSubscribed(token, element.snippet.channelId);
        });
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
            SUBSCRIBED <i class="fas  fa-check-circle"></i>
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
                            <span className="text-dim ">By</span> {channelData.title}
                        </div>
                        <SubscriptionButton />
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
