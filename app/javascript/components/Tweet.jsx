import React from 'react';

const Tweet = ({ tweet, onDeleteTweet }) => {
  const { id, text, createdAt, user } = tweet;

  return (
    <div className="card mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6 className="card-title mb-1">{user}</h6>
          <p className="card-text mb-1">{text}</p>
          <p className="text-muted">{createdAt}</p>
        </div>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDeleteTweet(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Tweet;
