import { useEffect,useState } from 'react';
import '../../App.css';
import {getStoredToken} from '../../utils/verifyToken';
import axios from 'axios';


function SubscriptionPage() {


    useEffect(() => {
        let token = getStoredToken();
        Subscription(token);
    }, [])

    const Subscription = async (token) => {
        let url = "/channels/subscription";
        console.log(url)
        axios.post(
            url,
            {
                method:"post",
                
            },
            {
                params: {
                    ...token,
                   
                }
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <div className="App">
            <h1>Subscription page</h1>
            <div>
                <h2>OK done!</h2>
            </div>
        </div>
    );
}

export default SubscriptionPage;
