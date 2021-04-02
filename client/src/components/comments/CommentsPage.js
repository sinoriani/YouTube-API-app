import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';
import Comment from "./Comment"

function CommentsPage() {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        let token = getStoredToken();
        getCommentsData(token);
    }, [])

    const getCommentsData = async (token) => {
        let url = "/comments/get";
        console.log(url)
        axios.get(url,{
            params: {
                ...token,
                videoId : "L72fhGm1tfE"
            }
        }).then((response) => {
            // console.log(response.data)
            let list = []
            response.data.forEach(element => {
                list.push( <Comment key={element.id} name={element.snippet.topLevelComment.snippet.authorDisplayName} comment={element.snippet.topLevelComment.snippet.textOriginal}  />)
            });
            setComments(list);
        });
    }

    return (
        <div className="App">
            <h1>Comments</h1>
            <div>
                {comments}
            </div>
        </div>
    );
}

export default CommentsPage;
