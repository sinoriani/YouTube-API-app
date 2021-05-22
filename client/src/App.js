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
import { getStoredToken } from './utils/verifyToken';
import SubscriptionPage from './components/channels/subscription';
import VideoPlayer from './components/videos/VideoPlayer';
import SidebarPage from './components/elements/Sidebar';
import Trending from './components/videos/Trending';
import Liked from './components/videos/Liked';




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
        <div className="row m-0 p-0">
          <div className="side col-lg-2 p-0">
            <SidebarPage key="sidebar" />
          </div>
          <div className="content pt-2 col-lg-10 p-0" >
            <div>Hello {userInfo.name}</div>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/channel/:id" component={ChannelPage} />
              <Route path="/subscription" component={SubscriptionPage} />
              <Route path="/video/:id" component={VideoPlayer} />
              <Route path="/Trending" component={Trending} />
              <Route path="/Liked" component={Liked} />
            </Switch>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
