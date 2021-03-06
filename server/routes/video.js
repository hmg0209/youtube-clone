const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');

const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

//Storage Multer Config
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  fislename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

//==================================================
// Video
//==================================================

// 비디오 서버에 저장
router.post('/uploadfile', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// 비디오 정보 몽고디비에 저장.
router.post('/uploadVideo', (req, res) => {
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({ success: true });
  });
});

// 전체 비디오 몽고디비에서 가져오기
router.get('/getVideo', (req, res) => {
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);

      return res.status(200).json({ success: true, videos });
    });
});

//썸네일 저장
router.post('/thumbnail', (req, res) => {
  let thumbnailPath = '';
  let duration = '';

  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    duration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
      thumbnailPath = `uploads/thumbnails/${filenames[0]}`;
    })
    .on('end', () => {
      return res.json({ success: true, thumbnailPath, duration });
    })
    .screenshots({
      timemarks: ['00:00:07.000'],
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    });
});

// 상세페이지
// 비디오 가져오기
router.post('/getDetailVideo', (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate('writer')
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

// 구독 페이지
// 비디오 가져오기
router.post('/getSubscriptionVideos', (req, res) => {
  Subscriber.find({
    userId: req.body.userId,
  }).exec((err, subscribeInfo) => {
    if (err) return res.status(400).send(err);

    let subscribedUser = [];

    subscribeInfo.map((subscriber, i) => {
      subscribedUser.push(subscriber.writerId);
    });

    // 찾은 사람들의 모든 비디오를 가져오기
    // $in: mongodb의 메서드
    Video.find({ writer: { $in: subscribedUser } })
      .populate('writer')
      .exec((err, videos) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos });
      });
  });
});

module.exports = router;
