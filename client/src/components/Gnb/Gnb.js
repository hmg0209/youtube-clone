import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './gnb.scss';

const Gnb = (props) => {
  const user = useSelector(state => state.user);

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
    <header className="header">
      <div className="gnb l-wrap">
        <span className="gnb__logo">
          <Link to="/">Home</Link>
        </span>
        {user.userData && user.userData.isAuth ? (
          <ul className="gnb__list">
            <li className="gnb__d1">
              <Link to="/video/upload">video</Link>
            </li>
            <li className="gnb__d1">
              <button type="button" onClick={logout}>logout</button>
            </li>
          </ul>
        ) : (
          <ul className="gnb__list">
            <li className="gnb__d1">
              <Link to="/login">login</Link>
            </li>
            <li className="gnb__d1">
              <Link to="/register">register</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default withRouter(Gnb);
