import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import SideVideo from './section/SideVideo';
import Subscribe from './section/Subscribe';

import './video-detail.scss';

function VideoDetial(props) {
  const [videoDetail, setVideoDetail] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const videoId = props.match.params.videoId;
    let videoInfo = { videoId };

    axios.post('/api/video/getDetailVideo', videoInfo).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert('비디오 정보 가져오기 실패');
      }
    });
  }, []);

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
              <span className="user__img"></span>
              <div className="user__cont">
                <span className="user__name">{videoDetail.writer.name}</span>
                <span className="user__desc">{videoDetail.description}</span>
              </div>
            </div>
            <div className="detail__util">
              <button>
                좋아요<span>0</span>
              </button>
              <button>
                싫어요<span>0</span>
              </button>
              {videoDetail.writer._id !== userId && (
                <Subscribe writerId={videoDetail.writer._id} userId={userId} />
              )}
            </div>
          </div>
          <div className="comment">
            <div className="comment__num">
              댓글 수 <span>0</span>
            </div>
            <div className="comment__input">
              <div className="comment__ta ta-box">
                <textarea
                  className="ta"
                  type="text"
                  // value={description}
                  // onChange={changeDescription}
                ></textarea>
              </div>
              <button className="comment__btn" type="submit">
                댓글달기
              </button>
            </div>
            <ul className="comment__list">
              <li className="comment__item"></li>
            </ul>
          </div>
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
