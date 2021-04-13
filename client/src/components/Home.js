import '../App.css';
import {useEffect, useState} from 'react'
import Videos from './videos/Videos'
import VideoPlayer from './videos/VideoPlayer'

function Home() {
  const showVideo = (e) => {
    // console.log(e.target.id)
    setSelectedContent(content.length)
    setContent([
      ...content, <VideoPlayer key="1" id={e.target.id} />
    ])
  }

  const [content, setContent] = useState([<Videos onClick={showVideo} key="1" />,null])
  const [selectedContent, setSelectedContent] = useState(0)
  

  return (
    <div className="App">
       <h1>Home</h1>
       {content[selectedContent]}
    </div>
  );
}

export default Home;
