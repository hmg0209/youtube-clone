import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_action';
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
        } else {
          alert('Error');
        }
      });
  }

  return (
    <div class="l-wrap l-wrap--narrow">
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <div class="form-g">
          <label class="label">email</label>
          <input type="email" class="input" value={email} onChange={changeEmail}/>
        </div>
        <div class="form-g">
          <label class="label">password</label>
          <input type="password" class="input" value={password} onChange={changePassword}/>
        </div>
        <div class="func">
          <button type="submit" class="btn btn--block">login</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login);
