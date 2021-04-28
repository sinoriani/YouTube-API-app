import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Comment from "./Comment"
import CommentForm from "./CommentForm"

function CommentsPage(props) {

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
                videoId : props.videoId
            }
        }).then((response) => {
            console.log("aa",response.data)
            let list = []

            response.data.forEach(element => {
                let toxicity;
                if(element.filter){
                    toxicity = Object.values(element.filter.predictions).reduce((a, b) => a + b, 0) / Object.values(element.filter.predictions).length
                }else{
                    toxicity = 0;
                }
                console.log(toxicity)
                list.push( <Comment key={element.id} 
                    toxicity={toxicity}
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
                    videoId : props.videoId,
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
        <div className=" mr-auto ml-auto mt-3 " style={{maxWidth:"1000px"}}>
            {comments}
        </div>
    );
}

export default CommentsPage;
