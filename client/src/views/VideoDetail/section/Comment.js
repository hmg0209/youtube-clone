import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentItem from './CommentItem';

function Comment(props) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const videoId = props.videoId;
  const videoInfo = { videoId };

  useEffect(() => {
    axios.post('/api/comment/getComments', videoInfo).then((res) => {
      if (res.data.success) {
        setCommentList(res.data.comments);
      } else {
        alert('댓글 가져오기 실패');
      }
    });
  }, []);

  const changeComment = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const commentInfo = {
      writer: localStorage.getItem('userId'),
      videoId: videoId,
      content: comment,
    };

    axios.post('/api/comment/saveComment', commentInfo).then((res) => {
      if (res.data.success) {
        //
      } else {
        alert('코멘트 저장 실패');
      }
    });
  };

  return (
    <div className="comment">
      <div className="comment__num">
        댓글 수 <span>0</span>
      </div>
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

      <ul className="comment__list">
        {commentList &&
          commentList.map(
            (comment, i) => !comment.responseTo && <CommentItem comment={comment} key={i} />
          )}
      </ul>
    </div>
  );
}

export default Comment;
