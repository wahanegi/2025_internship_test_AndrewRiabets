import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Tweet = ({ tweet, onDeleteTweet }) => {
  const { id, text, created_at, user } = tweet;
  const formattedDate = formatDistanceToNow(parseISO(created_at), {
    addSuffix: true,
  });

  return (
    <div className="card mb-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6 className="card-title mb-1">{user.email}</h6>
          <p className="card-text mb-1">{text}</p>
          <p className="text-muted">{formattedDate}</p>
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
