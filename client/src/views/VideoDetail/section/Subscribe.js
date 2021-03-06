import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscribe(props) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const writerInfo = {
      writerId: props.writerId,
    };

    axios.post('/api/subscribe/subscribeNumber', writerInfo).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 받아오지 못함');
      }
    });

    const subscribedInfo = {
      writerId: props.writerId,
      userId: props.userId,
    };

    axios.post('/api/subscribe/subscribed', subscribedInfo).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert('구독 데이터 읽어오기 실패');
      }
    });
  }, [props.userId, props.writerId]);

  const onsSubscribe = () => {
    let subscribeInfo = {
      writerId: props.writerId,
      userId: props.userId,
    };

    if (subscribed) {
      axios.post('/api/subscribe/unSubscribe', subscribeInfo).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber-1);
          setSubscribed(!subscribed);
        } else {
          alert('구독 취소 실패');
        }
      });
    } else {
      axios.post('/api/subscribe/subscribe', subscribeInfo).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber+1);
          setSubscribed(!subscribed);
        } else {
          alert('구독 실패');
        }
      });
    }
  };

  return (
    <button
      className="btn"
      onClick={onsSubscribe}
    >
      <span>{subscribeNumber}</span>
      {subscribed ? '구독중' : '구독'}
    </button>
  );
}

export default Subscribe;
