class Api::TweetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tweet, only: [ :destroy ]


  def index
    tweets = Tweet.includes(:user).order(created_at: :desc)
    render json: {
      tweets: tweets.as_json(include: { user: { only: [ :email, :id ] } }, only: [ :id, :text, :created_at ]),
      current_user_id: current_user.id
    }
  end

  def create
    tweet = current_user.tweets.new(tweet_params)
    if tweet.save
      render json: tweet.as_json(include: { user: { only: [ :email ] } }, only: [ :id, :text, :created_at ]), status: :created
    else
      render json: { errors: tweet.errors.full_messages }, status: 422
    end
  end

  def destroy
    if @tweet.destroy
      head :no_content, notice: "Tweet was successfully destroyed."
    else
      render json: { errors: @tweet.errors.full_messages }, status: 422
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:text)
  end

  def set_tweet
    @tweet = current_user.tweets.find_by(id: params[:id])
    unless @tweet
      render json: { error: "Tweet not found" }, status: 404
    end
  end
end
