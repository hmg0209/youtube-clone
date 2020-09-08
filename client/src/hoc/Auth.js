import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action';

export default function(Component, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth())
        .then(res => {

          // 로그인 하지 않은 상태
          if(!res.payload.isAuth) {
            if (option) {
              props.history.push('/login');
            }
          } else {
            // 로그인 한 상태
            if (adminRoute && !res.payload.isAdmin) {
              props.history.push('/');
            } else {
              if (option === false) {
                props.history.push('/');
              }
            }
          }
        });
    }, []);

    return (
      <Component/>
    );
  }

  return AuthenticationCheck;
}