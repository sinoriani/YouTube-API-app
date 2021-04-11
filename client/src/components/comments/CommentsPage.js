import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Comment from "./Comment"
import CommentForm from "./CommentForm"

function CommentsPage() {

    const [comments, setComments] = useState([]);
    const [channelID, setChannelID] = useState("");

    useEffect(() => {
        let token = getStoredToken();
        getCommentsData(token);
    }, [])

    const getMyChannelId = async (token) => {
        let url = "/channels/get";
        axios.get(url,{
            params: {
                ...token,
                mine : true
            }
        }).then((response) => {
            setChannelID(response.data[0].id)
        });
    }

    const getCommentsData = async (token) => {
        let url = "/comments/get";
        axios.get(url,{
            params: {
                ...token,
                videoId : "Zo1Yh3BYPVA"
            }
        }).then((response) => {
            console.log(response.data)
            let list = []

            response.data.forEach(element => {
                list.push( <Comment key={element.id} 
                    image={element.snippet.topLevelComment.snippet.authorProfileImageUrl} 
                    name={element.snippet.topLevelComment.snippet.authorDisplayName} 
                    comment={element.snippet.topLevelComment.snippet.textOriginal}  />)
            });
            setComments(list);
        });
    }

    const onAdd = (content) => {
        let token = getStoredToken();
        getMyChannelId(token)

        let url = "/comments/add";
        console.log(channelID)
        axios.post(
            url,
            {
                method:"post",
                data:{
                    videoId : "Zo1Yh3BYPVA",
                    channelId: channelID,
                    content:content
                }
            },
            {
                params: {
                    ...token,
                   
                }
        }).then((response) => {
            console.log(response)
            // let list = []
            // response.data.forEach(element => {
            //     list.push( <Comment key={element.id} 
            //         image={element.snippet.topLevelComment.snippet.authorProfileImageUrl} 
            //         name={element.snippet.topLevelComment.snippet.authorDisplayName} 
            //         comment={element.snippet.topLevelComment.snippet.textOriginal}  />)
            // });
            // setComments(list);
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <div className="App">
            <h1>Comments</h1>
            <div>
                {/* <CommentForm onAdd={onAdd}  /> */}
            </div>
            <div>
                {comments}
            </div>
        </div>
    );
}

export default CommentsPage;
