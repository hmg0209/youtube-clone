import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LikeBtn(props) {
  const [likeLength, setLikeLength] = useState(0);
  const [liked, setLiked] = useState(false);

  const [disLikeLength, setDisLikeLength] = useState(0);
  const [disLiked, setDisLiked] = useState(false);
  const likeInfo = props.video
    ? { videoId: props.videoId, userId: props.userId }
    : { commentId: props.commentId, userId: props.userId };

  useEffect(() => {
    axios.post('/api/like/getLikes', likeInfo).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikeLength(res.data.likeList.length);

        // 내가 이미 좋아요 혹은 싫어요를 눌렀는지
        res.data.likeList.map((like) => {
          if (like.userId === props.userId) {
            setLiked(true);
          }
        });
      } else {
        alert('좋아요 정보 불러오기 실패');
      }
    });

    axios.post('/api/like/getDisLikes', likeInfo).then((res) => {
      if (res.data.success) {
        setDisLikeLength(res.data.disLikeList.length);

        res.data.disLikeList.map((disLike) => {
          if (disLike.userId === props.userId) {
            setDisLiked('disliked');
          }
        });
      } else {
        alert('싫어요 정보 불러오기 실패');
      }
    });
  }, []);

  const clickLike = (e) => { 
    if (!liked) {
      axios.post('/api/like/upLike', likeInfo).then((res) => {
        if (res.data.success) {
          setLikeLength(likeLength + 1);
          setLiked(true);

          if (disLiked) {
            setDisLiked(false);
            setDisLikeLength(disLikeLength - 1);
          }
        } else {
          alert('좋아요 실패');
        }
      });
    } else {
      axios.post('/api/like/unLike', likeInfo).then((res) => {
        if (res.data.success) {
          setLiked(false);
          setLikeLength(likeLength - 1);
        } else {
          alert('좋아요 취소 실패');
        }
      });
    }
  };

  const clickDisLike = (e) => {
    if(!disLiked) {
      axios.post('/api/like/upDisLike', likeInfo).then((res) => {

        if (res.data.success) {
          setDisLikeLength(disLikeLength + 1);
          setDisLiked(true);

          if (liked) {
            setLiked(false);
            setLikeLength(likeLength-1);
          }
        } else {
          alert('좋아요 실패');
        }
      });
    } else {
      axios.post('/api/like/unDisLike', likeInfo).then((res) => {
        if (res.data.success) {
          setDisLiked(false);
          setDisLikeLength(disLikeLength - 1);
        } else {
          alert('좋아요 취소 실패');
        }
      });
    }
  };

  return (
    <div>
      <button type="button" onClick={clickLike}>
        좋아요{likeLength}
      </button>
      <button type="button" onClick={clickDisLike}>싫어요{disLikeLength}</button>
    </div>
  );
}

export default LikeBtn;
