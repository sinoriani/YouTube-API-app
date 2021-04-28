import { useEffect, useState } from 'react';
import '../../App.css';
import { getStoredToken } from '../../utils/verifyToken';
import axios from 'axios';



function SidebarPage() {

    const [list, setList] = useState([]);

    useEffect(() => {
        let token = getStoredToken();
        getmySubscriptions(token);
    }, [])

    const getmySubscriptions = async (token) => {
        let url = "/channels/mySubscriptions";
        axios.get(url, {
            params: {
                ...token,
            }
        }).then((response) => {

            setList(response.data);
            console.log(response.data);

        });
    }

    return (
        <div className="sidebar">
            <div className="text-muted mysub">My Subscriptions</div>
            <ul className="sidebarlist">
                {list.map((val) => {
                    return (
                        <li key={val.etag} className="d-flex p-2" style={{ "borderBottom": "1px solid #1f1f1fcc" }} >
                            <img src={val.snippet.thumbnails.default.url} style={{ margin: '0 10px 0 5px', padding: '0', width: '30px', borderRadius: '25px' }} alt="" />
                            <div style={{
                                whiteSpace: 'nowrap',
                                overflow: "hidden"
                            }}> {val.snippet.title} </div>
                        </li>
                    )

                })}
            </ul>
        </div >

    );
}

export default SidebarPage;
