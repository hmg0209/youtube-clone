import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Landing = (props) => {
  const logout = () => {
    axios
      .get('/api/users/logout')
      .then(res => {
        if(res.data.success) {
            props.history.push('/login');
          } else {
            alert('로그아웃 실패')
          }
      });
  };

  return (
    <div class="l-wrap">
      <h1 class="page-title">시작 페이지</h1>
      <button type="button" onClick={logout}>logout</button>
    </div>
  )
}

export default withRouter(Landing);
