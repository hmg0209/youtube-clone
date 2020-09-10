import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.currentTarget.value);
  }

  const changePassword = (e) => {
    setPassword(e.currentTarget.value);
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    }

    dispatch(loginUser(body))
      .then(res => {
        if (res.payload.loginSuccess) {
          props.history.push('/');
          localStorage.setItem('userId', res.payload.userId);
        } else {
          alert('Error');
        }
      });
  }

  return (
    <div className="l-wrap l-wrap--narrow">
      <h1 className="page-title">Login</h1>
      <form onSubmit={loginSubmit}>
        <div className="form-g">
          <label className="label">email</label>
          <input type="email" className="input" value={email} onChange={changeEmail}/>
        </div>
        <div className="form-g">
          <label className="label">password</label>
          <input type="password" className="input" value={password} onChange={changePassword}/>
        </div>
        <div className="func">
          <button type="submit" className="btn btn--block">login</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login);
