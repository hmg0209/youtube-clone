import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;

    for (var comment of props.commentList) {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    }

    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div class="comment__reply">
      {ChildCommentNumber > 0 && (
        <button type="button" onClick={handleChange}>
          View {ChildCommentNumber} more comment(s)
        </button>
      )}

      {OpenReplyComments &&
        props.commentList.map((comment, i) => (
          <React.Fragment>
            {comment.responseTo === props.parentCommentId && (
              <div key={i}>
                <CommentItem
                  comment={comment}
                  refreshCommentList={props.refreshCommentList}
                  key={i}
                />
                <ReplyComment
                  commentList={props.commentList}
                  parentCommentId={comment._id}
                  refreshCommentList={props.refreshCommentList}
                />
              </div>
            )}
          </React.Fragment>
        ))}
    </div>
  );
}

export default ReplyComment;
