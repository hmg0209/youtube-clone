const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//==================================================
// User
//==================================================

// 회원가입
router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/login', (req, res) => {
  // 이메일 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '이메일을 다시 확인해주세요.',
      });
    }

    // 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호를 다시 확인해주세요.',
        });
      }
    });

    // 이메일 + 비밀번호 맞다면, Token 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);

      // 토큰을 저장한다. (쿠키)
      res
        .cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

// Auth 기능
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token: '' }, 
    (err, user) => {
     if (err) return res.json({ success: false, err });

     return res.status(200).send({
       success: true
     });
  });
});

module.exports = router;
