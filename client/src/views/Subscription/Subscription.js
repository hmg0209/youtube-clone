import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../components/Card/Card';

function Subscription() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideo').then((res) => {
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert('비디오 가져오기 실패');
      }
    });
  }, []);

  return (
    <div className="l-wrap">
      <h1 className="page-title">구독</h1>
      <div className="card-list">
        {videos.map((video, i) => {
          return (
            <Card key={i} video={video}/>
          )
        })}
      </div>
    </div>
  );
}

export default Subscription;
