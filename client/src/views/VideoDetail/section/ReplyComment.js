import React from 'react';
import CommentItem from './CommentItem';

function ReplyComment(props) {
  console.log(props);
  return (
    <div>
      <div>0개의 댓글이 있습니다.</div>
      {props.commentList.map((comment, i) => (
        <React.Fragment>
          {comment.responseTo === props.parentCommentId && (
            <div key={i}>
              <CommentItem
                comment={comment}
                refreshCommentList={props.refreshCommentList}
                key={i}
              />
              {/* <ReplyComment
                CommentLists={props.CommentLists}
                parentCommentId={comment._id}
                refreshFunction={props.refreshFunction}
              /> */}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ReplyComment;