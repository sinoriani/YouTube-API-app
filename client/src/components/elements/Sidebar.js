import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';



function SidebarPage() {

    const [list, setList] = useState([]);

    useEffect(() => {
        let token = getStoredToken();
        getmySubscriptions(token);
    }, [])

    const getmySubscriptions = async (token) => {
        let url = "/channels/mySubscriptions";
        axios.get(url,{
            params: {
                ...token,
            }
        }).then((response) => {
            
            setList(response.data);
            console.log(response.data);
            
        });
    }

    return (
        <div  className="sidebar"> 
        <div className="mysub">My Subscriptions</div>
        <ul className="sidebarlist">
        {list.map((val)=>{
           return(
               <li className="row" >
                   <div> {val.snippet.title} </div>
               </li>
           )

        })} 
        </ul>
        </div>
        
    );
}

export default SidebarPage;
