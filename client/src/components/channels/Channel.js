/*import React from 'react'
import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Video from "../videos/Video"

const Channel = (props) => {
    const [videos, setVideos] = useState([]);


    function nFormatter(num, digits) {
        var si = [
          { value: 1, symbol: "" },
          { value: 1E3, symbol: "k" },
          { value: 1E6, symbol: "M" },
          { value: 1E9, symbol: "G" },
          { value: 1E12, symbol: "T" },
          { value: 1E15, symbol: "P" },
          { value: 1E18, symbol: "E" }
        ];
        var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var i;
        for (i = si.length - 1; i > 0; i--) {
          if (num >= si[i].value) {
            break;
          }
        }
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
      }
 

    useEffect(() => {
        let token = getStoredToken();
        getVideoData(token);
    }, [])

    const getVideoData = async (token) => {
        let url = "/channels/getvideos";
        console.log(url)
        
        axios.get(url,{
            params: {
                ...token,
                channelId : props.Id
            }
        }).then((response) => {
            console.log(response.data)
            
            let vids = []
            response.data.forEach(element => {
                let channelData = {
                    "id" : element.snippet.channelId,
                    "title" : element.channelTitle,
                }
                let videoData = {
                    title : element.snippet.title,
                    thumbnail : element.snippet.thumbnails.medium,
                    date : element.snippet.publishedAt,
                    id : element.id.videoId
                }
                let key = element.id.videoId
                vids.push(
                    <Video className="videoElement" onClick={props.onClick} key={key} channelData={channelData} videoData={videoData} />
                )
            });
            setVideos(vids)
        });
    }
    return (
        <div>
        <div style={{backgroundColor:"#181818", padding:"0px", maxWidth:"100%",maxHeight:"500px"}}>
        <div className="d-flex p-2" >
            <img  src={props.thumb.url} style={{ margin: '30px 30px 10px 100px', padding: '10', width: '80px', borderRadius: '60px' }} alt="video thumbnail"/>
            <div>
            <h5 style={{ margin: '45px 50px 0px 0px', padding: '0', fontWeight: 'bold' }}>{props.snippet.title}</h5>
            <p style={{ fontSize: 'smaller' , color: '#919191', margin: '0px 87px 0px 0px', padding: '0' }}>{nFormatter(props.stats.subscriberCount,2)} subscribers</p>
            </div>
        </div>
        <ul style={{listStyle:'none', marginTop:'10px' }}>
           <li style={{ padding: '0',width:'70px', borderBottomStyle :'solid'}}> Videos</li>
        </ul>
        </div>

        <div className="d-flex flex-wrap m-3">
                {videos}
            </div>
        </div>
        
        
    )
}

export default Channel;*/