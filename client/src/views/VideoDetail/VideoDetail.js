import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

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

  const target = 'https://stormy-journey-41513.herokuapp.com';
    // process.env.NODE_ENV === 'development'
    //   ? 'http://localhost:5000'
    //   : 'https://stormy-journey-41513.herokuapp.com';

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
  console.log(videoDetail);

  if (videoDetail.writer) {
    return (
      <div className="l-wrap detail">
        <section className="detail__section">
          <div className="detail__video video-box">
            <video
              className="video"
              src={`${target}/${videoDetail.filePath}`}
              poster={`${target}/${videoDetail.thumbnailPath}`}
              controls
              autoPlay
            ></video>
          </div>

          <div className="detail__header">
            <div className="detail__title">
              <h1>{videoDetail.title}</h1>
              <span>조회수 {videoDetail.views} 회</span> /
              <span>{moment(videoDetail.createdAt).format('YYYY.MM.DD')}</span>
            </div>
            <div className="detail__util">
              <LikeButton
                video
                userId={localStorage.getItem('userId')}
                videoId={videoId}
              />
            </div>
          </div>

          <div className="detail__box">
            <div className="detail__cont">
              <div className="user-box">
                <Profile writer={videoDetail.writer} />
                <div className="user__cont">
                  <span className="user__name">{videoDetail.writer.name}</span>
                  <span className="user__subscriber">구독자수 0명</span>
                </div>
              </div>
              <div className="detail__subscribe">
                {videoDetail.writer._id !== userId && (
                  <Subscribe
                    writerId={videoDetail.writer._id}
                    userId={userId}
                  />
                )}
              </div>
            </div>
            <div className="detail__desc">{videoDetail.description}</div>
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
