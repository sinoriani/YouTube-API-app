import { useEffect, useState } from 'react';
import '../../App.css';
import { getStoredToken } from '../../utils/verifyToken';
import axios from 'axios';
import {Link} from "react-router-dom";
import medaille from './medaille.png';



function SidebarPage() {

    const [list, setList] = useState([]);
    const [usersList,setUsersList] = useState([]);

    useEffect(() => {
        let token = getStoredToken();
        getmySubscriptions(token);
        getUsers(token);
    }, [])

    const getmySubscriptions = async (token) => {
        let url = "/channels/mySubscriptions";
        axios.get(url, {
            params: {
                ...token,
            }
        }).then((response) => {

            setList(response.data);
            // console.log(response.data);

        });
    }
    
    const getUsers = async (token) => {
        
        let url = "/users/getUsers";
        axios.get(url, {
            params: {
                ...token
            }
        }).then((response) => {
            console.log(response);
            setUsersList(response.data);
        });
    }
     
    return (
        <div className="sidebar">
            <div className="text-muted mysub">My Subscriptions</div>
            <ul className="sidebarlist">
                {list.map((val) => {
                    return (
                        <div key={val.snippet.resourceId.channelId}>
                            <Link to={"/Channel/" + val.snippet.resourceId.channelId} style={{color:"#dfdfdf"}}>
                            <li key={val.etag} className="d-flex p-2" style={{ "borderBottom": "1px solid #1f1f1fcc" }} >
                                <img src={val.snippet.thumbnails.default.url} style={{ margin: '0 10px 0 5px', padding: '0', width: '30px', borderRadius: '25px' }} alt="" />
                                <div style={{
                                    whiteSpace: 'nowrap',
                                    overflow: "hidden"
                                }}> {val.snippet.title} </div>
                            </li>
                            </Link>
                        </div>
                    )
                })}
            </ul>
            <div className="text-muted mysub">Top Users</div>
            <ul className="sidebarlist" >
            {usersList.map((val) => {
                    return (
                        <div key={val.name}>
                            <li key={val.etag} className="d-flex flex-row p-2" >
                                <img src={val.picture}  style={{ margin: '0 10px 0 5px', padding: '0', width: '30px', borderRadius: '25px' }} alt="" />
                                <div  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: "hidden"
                                }}> {val.name} </div>
                                {usersList.indexOf(val) == 0 &&
                                <div>
                                <img src={medaille}  style={{ margin: '0 5px 0 5px', padding: '0', width: '30px', borderRadius: '25px' ,float:'right'}} alt="" /> 
                                </div>
                                }
                            </li>
                        </div>
                    )
                })}
            </ul>
        </div >

    );
}

export default SidebarPage;
