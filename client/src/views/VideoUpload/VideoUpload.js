import React, { useState } from 'react';
import './videoUpload.scss';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const Catogory = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
];

function VideoUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(0);
  const [catagory, setCatagory] = useState('Film & Animation');

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
    setCatagory(e.currentTarget.value);
  };

  const onDrop = (file) => {
    let formData = new FormData;

    const config = {
      header: {'content-type': 'multipart/form-data'}
    }

    formData.append('file',file[0]);

    axios
      .post('/api/video/uploadfiles', formData, config)
      .then(res => {
        console.log(res);

        if (res.data.success) {

        } else {
          alert('비디오 업로드 실패');
        }
      })

  }

  return (
    <div className="l-wrap l-wrap--narrow">
      <h1 className="page-title">Upload video</h1>
      <form>
        <div className="form-g">
          <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000000}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          {/* {Thumbnail !== '' && (
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
            </div>
          )} */}
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

export default VideoUpload;
