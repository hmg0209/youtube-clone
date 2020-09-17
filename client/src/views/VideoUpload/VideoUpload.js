import React, { useState } from 'react';
import './videoUpload.scss';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Catogory = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
];

const target =
process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://stormy-journey-41513.herokuapp.com';

function VideoUpload(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState('Film & Animation');

  const [filePath, setFilePath] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnailPath, setThumbnailPath] = useState('');

  const changeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const changeDescription = (e) => {
    setDescription(e.currentTarget.value);
  };

  const changePrivacy = (e) => {
    setPrivacy(e.currentTarget.value);
  };

  const changeCatagory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (file) => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', file[0]);

    axios.post('/api/video/uploadfile', formData, config).then((res) => {
      if (res.data.success) {
        let videoInfo = {
          url: res.data.url,
          fileName: res.data.fileName,
        };
        setFilePath(res.data.url);

        axios.post('/api/video/thumbnail', videoInfo).then((res) => {
          if (res.data.success) {
            setDuration(res.data.duration);
            setThumbnailPath(res.data.thumbnailPath);
          } else {
            alert('썸네일 생성 실패');
          }
        });
      } else {
        alert('비디오 업로드 실패');
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const videoInfo = {
      writer: localStorage.getItem('userId'),
      title,
      description,
      privacy,
      filePath,
      category,
      duration,
      thumbnailPath,
    };
    

    axios.post('/api/video/uploadVideo', videoInfo)
    .then(res => {
      if(res.data.success) {
        alert('비디오 업로드 성공');
        props.history.push('/');
      } else {
        alert ('비디오 업로드 실패');
      }
    });
  };

  return (
    <div className="l-wrap l-wrap--narrow">
      <h1 className="page-title">Upload video</h1>
      <form onSubmit={onSubmit}>
        <div className="dropzone">
          <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000000}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone__input" {...getRootProps()}>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
            <div className="dropzone__thumbnail">
          {thumbnailPath && (
              <img
                src={`${target}/${thumbnailPath}`}
                alt="thumbnail"
              />
              )}
            </div>
        </div>
        <div className="form-g">
          <label className="label">Title</label>
          <input
            className="input"
            type="text"
            value={title}
            onChange={changeTitle}
          ></input>
        </div>
        <div className="form-g">
          <label className="label">description</label>
          <div className="ta-box">
            <textarea
              className="ta"
              type="text"
              value={description}
              onChange={changeDescription}
            ></textarea>
          </div>
        </div>
        <div className="form-g">
          <label className="label">Title</label>
          <select className="select" onChange={changePrivacy}>
            <option value="0">private</option>
            <option value="1">public</option>
          </select>
        </div>
        <div className="form-g">
          <label className="label">Title</label>
          <select className="select" onChange={changeCatagory}>
            {Catogory.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="func">
          <button type="submit" className="btn btn--block">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(VideoUpload);
