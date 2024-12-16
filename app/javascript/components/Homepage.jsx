import React, { useState } from 'react';
import TweetInput from './TweetInput';
import TweetList from './TweetList';

const Homepage = () => {
  const [tweets, setTweets] = useState([]);

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text: text,
      createdAt: new Date().toLocaleString(),
    };
    setTweets([newTweet, ...tweets]);
  };

  const deleteTweet = (id) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Twitterless</h1>
      <TweetInput onTweetSubmit={addTweet} />
      <TweetList tweets={tweets} onDeleteTweet={deleteTweet} />
    </div>
  );
};

export default Homepage;
