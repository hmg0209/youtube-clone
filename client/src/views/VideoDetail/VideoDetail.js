import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Profile from '../../components/Profile/Profile';
import SideVideo from './section/SideVideo';
import Subscribe from './section/Subscribe';
import Comment from './section/Comment';
import LikeButton from './section/LikeBtn';

import './video-detail.scss';

function VideoDetial(props) {
  const [videoDetail, setVideoDetail] = useState([]);

  const userId = localStorage.getItem('userId');
  const videoId = props.match.params.videoId;

  useEffect(() => {
    let videoInfo = { videoId };

    axios.post('/api/video/getDetailVideo', videoInfo).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert('비디오 정보 가져오기 실패');
      }
    });
  }, [videoId]);

  if (videoDetail.writer) {
    return (
      <div className="l-wrap detail">
        <section className="detail__section">
          <div className="detail__video">
            <video
              src={`http://localhost:5000/${videoDetail.filePath}`}
              poster={`http://localhost:5000/${videoDetail.thumbnailPath}`}
              controls
            ></video>
          </div>
          <div className="detail__desc">
            <div className="user-box">
              <Profile writer={videoDetail.writer}/>
              <div className="user__cont">
                <span className="user__name">{videoDetail.writer.name}</span>
                <span className="user__desc">{videoDetail.description}</span>
              </div>
            </div>
            <div className="detail__util">
              <LikeButton
                video
                userId={localStorage.getItem('userId')}
                videoId={videoId}
              />
              {videoDetail.writer._id !== userId && (
                <Subscribe writerId={videoDetail.writer._id} userId={userId} />
              )}
            </div>
          </div>
          <Comment videoId={videoId} />
        </section>

        <aside className="detail__aside">
          <SideVideo />
        </aside>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}

export default withRouter(VideoDetial);
