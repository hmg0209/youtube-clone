
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/user_action';
import { withRouter } from 'react-router-dom';

const Register = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.currentTarget.value);
  }

  const changePassword = (e) => {
    setPassword(e.currentTarget.value);
  }

  const changeName = (e) => {
    setName(e.currentTarget.value);
  }

  const changeConfrimPassword = (e) => {
    setComfirmPassword(e.currentTarget.value);
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
      name,
    }

    if ( password !== comfirmPassword ) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    dispatch(registerUser(body))
      .then(res => {
        if (res.payload.success) {
          props.history.push('/login');
        } else {
          alert('Error');
        }
      });
  }

  return (
    <div class="l-wrap l-wrap--narrow">
      <h1>Register</h1>
      <form onSubmit={registerSubmit}>
        <div class="form-g">
          <label class="label">Email</label>
          <input type="email" class="input" value={email} onChange={changeEmail}/>
        </div>
        <div class="form-g">
          <label class="label">Name</label>
          <input type="text" class="input" value={name} onChange={changeName}/>
        </div>
        <div class="form-g">
          <label class="label">Password</label>
          <input type="password" class="input" value={password} onChange={changePassword}/>
        </div>
        <div class="form-g">
          <label class="label">Comfirm Password</label>
          <input type="password" class="input" value={comfirmPassword} onChange={changeConfrimPassword}/>
        </div>
        <div class="func">
          <button type="submit" class="input" class="btn btn--block">sign up</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Register);
