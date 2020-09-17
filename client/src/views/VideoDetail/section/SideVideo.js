import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './side-video.scss';

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);

  const target = 'https://stormy-journey-41513.herokuapp.com';
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:5000'
  //   : 'https://stormy-journey-41513.herokuapp.com';

  useEffect(() => {
    axios.get('/api/video/getVideo').then((res) => {
      if (res.data.success) {
        setSideVideos(res.data.videos);
      } else {
        alert('비디오 가져오기 실패');
      }
    });
  }, []);

  const sideVideoItem = sideVideos.map((video, i) => {
    const minute = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - minute * 60);

    return (
      <li className="item" key={i}>
        <a href={`/video/${video._id}`} className="item__link">
          <span className="item__img-box">
            <img
              src={`${target}/${video.thumbnailPath}`}
              className="item__img"
              alt="썸네일"
            ></img>
          </span>
          <div className="item__cont">
            <span className="item__user">{video.writer.name}</span>
            <span className="item__views">{video.views}</span>
            <span className="item__time">
              {minute}:{sec}
            </span>
          </div>
        </a>
      </li>
    );
  });

  if (sideVideos) {
    return <ul className="side-video">{sideVideoItem}</ul>;
  } else {
    return <div>loaging...</div>;
  }
}

export default SideVideo;
