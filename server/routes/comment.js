const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//==================================================
// Comment
//==================================================

// 댓글 저장
router.post('/saveComment', (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });

        res.json({ success: true, result });
      });
  });
});

// 댓글 불러오기
router.post('/getComments', (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });

      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
