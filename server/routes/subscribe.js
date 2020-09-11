const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//==================================================
// Subscribe
//==================================================

// 구독자수 정보
router.post('/subscribeNumber', (req, res) => {
  Subscriber.find({ writerId: req.body.writerId }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribe.length });
  });
});

// 구독 데이터 불러오기
router.post('/subscribed', (req, res) => {
  Subscriber.find({
    writerId: req.body.writerId,
    userId: req.body.userId,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, subscribed: result });
  });
});

// 구독 취소
router.post('/unSubscribe', (req, res) => {
  Subscriber.findOneAndDelete({
    writerId: req.body.writerId,
    userId: req.body.userId,
  }).exec((err, doc) => {
    if (err) return res.status(400).josn({ success: false, err });

    res.status(200).json({ success: true, doc });
  });
});

// 구독 하기
router.post('/subscribe', (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc)=> {
    if(err) return res.json({success: false, err});

    res.status(200).json({success: true, doc});
  })
});

module.exports = router;
