import React, { useState, useEffect } from 'react';
import axios from 'axios';
import createCsrfToken from '../utils/csrf';
import TweetInput from './TweetInput';
import TweetList from './TweetList';

const Homepage = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
      const response = await axios.get('api/tweets');
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const addTweet = async (text) => {
    try {
      createCsrfToken();
      const response = await axios.post('api/tweets', {
        tweet: { text },
      });
      setTweets([response.data, ...tweets]);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const deleteTweet = async (id) => {
    try {
      createCsrfToken();
      await axios.delete(`api/tweets/${id}`);
      setTweets(tweets.filter((tweet) => tweet.id !== id));
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Twitterless</h1>
      <TweetInput onTweetSubmit={addTweet} />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <TweetList tweets={tweets} onDeleteTweet={deleteTweet} />
      )}
    </div>
  );
};

export default Homepage;
