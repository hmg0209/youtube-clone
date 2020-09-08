import React from 'react';
import './gnb.scss';
import { Link } from 'react-router-dom';

const Gnb = () => {
  return (
    <header class="header">
      <ul class="gnb l-wrap">
        <li class="gnb__d1">
          <Link to="/">Home</Link>
        </li>
        <li class="gnb__d1">
          <Link to="/login">login</Link>
        </li>
        <li class="gnb__d1">
          <Link to="/register">register</Link>
        </li>
      </ul>
    </header>
  );
};

export default Gnb;
