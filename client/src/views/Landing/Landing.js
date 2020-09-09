import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Landing = () => {
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

  const renderVideo = videos.map((video, i) => {
    let minute = Math.floor(video.duration / 60);
    let sec = Math.floor(video.duration - minute * 60);
    return (
      <div className="video" key={i}>
        <a className="video__link" href={`/video/post/${video._id}`}>
          <span className="video__img-box">
            <img
              className="video__img"
              src={`http://localhost:5000/${video.thumbnailPath}`}
            />
            <span className="video__duration">
              {minute}:{sec}
            </span>
          </span>

          <div className="video__cont">
            <span className="video__user-img"></span>
            <div className="video__detail">
              <h2 className="video__title h6">{video.title}</h2>
              <small className="video__user">{video.writer.name}</small>
              <small className="video__views">조회수 {video.views}회</small>
              <small className="video__date">
                {moment(video.createdAt).format('MMM Do YY')}
              </small>
            </div>
          </div>
        </a>
      </div>
    );
  });

  return (
    <div className="l-wrap">
      <h1 className="page-title">추천</h1>
      <div className="video-list">{renderVideo}</div>
    </div>
  );
};

export default Landing;
