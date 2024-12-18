import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets, onDeleteTweet, currentUserId }) => {
  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            onDeleteTweet={onDeleteTweet}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <p className="text-center text-muted mt-4">
          No tweets yet. Start tweeting!
        </p>
      )}
    </div>
  );
};

export default TweetList;
