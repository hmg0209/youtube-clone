import React from 'react';

import './profile.scss';

function Profile(props) {
  console.log(props.writer);
  const writer = props.writer;
  return (
    <div
      className="profile"
      data-bg-color={writer.profileColor}
      data-pattern={writer.profilePattern}
    >
      {writer.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export default Profile;
