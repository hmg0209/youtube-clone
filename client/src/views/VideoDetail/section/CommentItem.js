import React, { useState } from 'react';
import axios from 'axios';

import LikeBtn from '../section/LikeBtn';

function CommentItem(props) {
  const [openReply, setOpenReply] = useState(false);
  const [comment, setComment] = useState('');
  const commentInfo = props.comment;

  const clickReplay = (e) => {
    setOpenReply(!openReply);
  };

  const changeComment = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const subCommentInfo = {
      writer: localStorage.getItem('userId'),
      videoId: commentInfo.videoId,
      content: comment,
      responseTo: commentInfo._id,
    };

    axios.post('/api/comment/saveComment', subCommentInfo).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(props);
        props.refreshCommentList(res.data.result);
        setComment('');
      } else {
        alert('코멘트 저장 실패');
      }
    });
  };

  return (
    <div className="comment__item">
      <div className="user-box">
        <span className="user__img"></span>
        <div className="user__cont">
          <span className="user__name">{commentInfo.writer.name}</span>
          <span className="user__desc">{commentInfo.content}</span>
          <button onClick={clickReplay}>댓글</button>
          <LikeBtn
            commentId={commentInfo._id}
            userId={localStorage.getItem('userId')}
          />
        </div>
      </div>

      {openReply && (
        <form className="comment__form" onSubmit={onSubmit}>
          <div className="comment__ta ta-box">
            <textarea
              className="ta"
              type="text"
              value={comment}
              onChange={changeComment}
            ></textarea>
          </div>
          <button className="comment__btn" type="submit">
            댓글달기
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentItem;
