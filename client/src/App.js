import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/elements/Navbar";
import ChannelPage from "./components/channels/ChannelPage";
import {getStoredToken} from './utils/verifyToken';
import SubscriptionPage from './components/channels/subscription';
import VideoPlayer from './components/videos/VideoPlayer';



function App() {

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    let token = getStoredToken();
    let url = "/users/info";
    axios.get(url, {
      params: {
        ...token
      }
    }).then((response) => {
      // console.log(response.data)
      setUserInfo(response.data);
    });
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar userInfo={userInfo} profilePic={userInfo.picture} />
        <div>Hello {userInfo.name}</div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/channel" component={ChannelPage} />
          <Route path="/subscription" component={SubscriptionPage} />
          <Route path="/video/:id" component={VideoPlayer} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
