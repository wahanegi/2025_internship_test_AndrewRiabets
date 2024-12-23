import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import createCsrfToken from '../utils/csrf';

const Tweet = ({ tweet, onDeleteTweet, currentUserId }) => {
  const { id, text, created_at, user, likes_count, liked_by_current_user } =
    tweet;
  const [likes, setLikes] = useState(likes_count || 0);
  const [liked, setLiked] = useState(liked_by_current_user || false);
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = formatDistanceToNow(parseISO(created_at), {
    addSuffix: true,
  });

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const previousLiked = liked;
    const previousLikes = likes;

    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    try {
      createCsrfToken();
      if (liked) {
        await axios.delete(`api/tweets/${id}/like`);
      } else {
        await axios.post(`api/tweets/${id}/like`);
      }
    } catch (error) {
      console.error('Error updating like:', error);

      setLiked(previousLiked);
      setLikes(previousLikes);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="card mb-3"
      style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}
    >
      <div className="card-body">
        {/* Кнопка удаления */}
        {user.id === currentUserId && (
          <button
            className="btn btn-outline-danger btn-sm"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => onDeleteTweet(id)}
          >
            Delete
          </button>
        )}
        <div>
          <h6 className="card-title mb-1">{user.email}</h6>
          <p className="card-text mb-1">{text}</p>
          <p className="text-muted">{formattedDate}</p>
        </div>
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ marginTop: '20px' }}
        >
          <button
            className={`btn btn-sm ${
              liked ? 'btn-primary' : 'btn-outline-secondary'
            }`}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
            }}
            onClick={handleLike}
            disabled={isLoading}
          >
            {liked ? 'Unlike' : 'Like'} ({likes})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
