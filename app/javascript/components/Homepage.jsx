import React, { useState, useEffect } from 'react';
import axios from 'axios';
import createCsrfToken from '../utils/csrf';
import TweetInput from './TweetInput';
import TweetList from './TweetList';
import LogoutButton from './LogoutButton';

const Homepage = () => {
  const [tweets, setTweets] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
      const response = await axios.get('api/tweets');
      setTweets(response.data.tweets);
      setCurrentUserId(response.data.current_user_id);
      setEmailConfirmed(response.data.email_confirmed);
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
      <LogoutButton />
      <h1 className="text-center my-4">Twitterless</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          {emailConfirmed ? (
            <>
              <TweetInput onTweetSubmit={addTweet} />
              <TweetList
                tweets={tweets}
                onDeleteTweet={deleteTweet}
                currentUserId={currentUserId}
              />
            </>
          ) : (
            <>
              <p className="text-center text-danger">
                To create tweets, please confirm your email. A confirmation link
                has been sent to your registered email address.
              </p>
              <TweetList
                tweets={tweets}
                onDeleteTweet={deleteTweet}
                currentUserId={currentUserId}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
