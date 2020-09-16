const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');

//==================================================
// like
//==================================================

router.post('/getLikes', (req, res) => {
  let likeInfo = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };

  Like.find(likeInfo).exec((err, likeList) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, likeList });
  });
});

router.post('/getDisLikes', (req, res) => {
  let disLikeInfo = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };

  DisLike.find(disLikeInfo).exec((err, disLikeList) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, disLikeList });
  });
});

router.post('/upLike', (req, res) => {
  let likeInfo = req.body.videoId
    ? { videoId: req.body.videoId, userId: req.body.userId }
    : { commentId: req.body.commentId, userId: req.body.userId };

  //likeList에 클릭 정보 저장
  const like = new Like(likeInfo);

  like.save((err) => {
    if (err) return resjson({ success: false, err });

    //disLike가 이미 클릭되어 있다면, DisLike 정보 삭제
    DisLike.findOneAndDelete(likeInfo).exec((err) => {
      if (err) return res.status(400).json({ success: false, err });

      res.status(200).json({ success: true });
    });
  });
});

router.post('/unLike', (req, res) => {
  let likeInfo = req.body.videoId
    ? { videoId: req.body.videoId, userId: req.body.userId }
    : { commentId: req.body.commentId, userId: req.body.userId };

  Like.findOneAndDelete(likeInfo).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });

    res.status(200).json({ success: true });
  });
});

router.post('/unDisLike', (req, res) => {
  let likeInfo = req.body.videoId
    ? { videoId: req.body.videoId, userId: req.body.userId }
    : { commentId: req.body.commentId, userId: req.body.userId };

  DisLike.findOneAndDelete(likeInfo).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });

    res.status(200).json({ success: true });
  });
});

router.post('/upDisLike', (req, res) => {
  let disLikeInfo = req.body.videoId
    ? { videoId: req.body.videoId, userId: req.body.userId }
    : { commentId: req.body.commentId, userId: req.body.userId };

  //disLikeList에 클릭 정보 저장
  const disLike = new DisLike(disLikeInfo);

  disLike.save((err) => {
    if (err) return resjson({ success: false, err });

    //Like가 이미 클릭되어 있다면, DisLike 정보 삭제
    Like.findOneAndDelete(disLikeInfo).exec((err) => {
      if (err) return res.status(400).json({ success: false, err });

      res.status(200).json({ success: true });
    });
  });
});
module.exports = router;
