import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';
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
    <div className="l-wrap l-wrap--narrow">
      <h1>Register</h1>
      <form onSubmit={registerSubmit}>
        <div className="form-g">
          <label className="label">Email</label>
          <input type="email" className="input" value={email} onChange={changeEmail}/>
        </div>
        <div className="form-g">
          <label className="label">Name</label>
          <input type="text" className="input" value={name} onChange={changeName}/>
        </div>
        <div className="form-g">
          <label className="label">Password</label>
          <input type="password" className="input" value={password} onChange={changePassword}/>
        </div>
        <div className="form-g">
          <label className="label">Comfirm Password</label>
          <input type="password" className="input" value={comfirmPassword} onChange={changeConfrimPassword}/>
        </div>
        <div className="func">
          <button type="submit" className="btn btn--block">sign up</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Register);
