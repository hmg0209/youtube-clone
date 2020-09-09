import React from 'react';
import './video-detail.scss';

function VideoDetial() {
  return (
    <div className="l-wrap detail">
      <section className="detail__section">
        <div className="detail__video">
          <video></video>
        </div>
        <div className="detail__desc">
          <div className="user-box">
            <span className="user__img"></span>
            <div className="user__cont">
              <span className="user__name">sdfsdf</span>
              <span className="user__desc">sdfsdfsdfsdfsdfsdf</span>
            </div>
          </div>
          <div className="detail__util">
            <button>좋아요</button>
            <button>싫어요</button>
            <button>0 구독</button>
          </div>
        </div>
        <div className="comment">

        </div>
      </section>

      <aside></aside>
    </div>
  );
}

export default VideoDetial;
