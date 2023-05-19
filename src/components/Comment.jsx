import React from "react";

const Comment = ({author, body}) => {
    return (
        <div className="comment">
            <p className="comment-header">{author}</p>
            <p className="comment-body">{body}</p>
        </div>
    );
}

export default Comment;