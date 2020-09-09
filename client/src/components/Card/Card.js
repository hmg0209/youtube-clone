import React from 'react';
import './card.scss';
import moment from 'moment';

function Card(props) {
  const video = props.video;
  const minute = Math.floor(video.duration / 60);
  const sec = Math.floor(video.duration - minute * 60);

  return (
    <div className="card" key={video.i}>
      <a className="card__link" href={`/video/${video._id}`}>
        <span className="card__img-box">
          <img
            className="card__img"
            src={`http://localhost:5000/${video.thumbnailPath}`}
          />
          <span className="card__duration">
            {minute}:{sec}
          </span>
        </span>

        <div className="card__cont">
          <span className="card__user-img"></span>
          <div className="card__detail">
            <h2 className="card__title h6">{video.title}</h2>
            <small className="card__user">{video.writer.name}</small>
            <small className="card__views">조회수 {video.views}회</small>
            <small className="card__date">
              {moment(video.createdAt).format('MMM Do YY')}
            </small>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;