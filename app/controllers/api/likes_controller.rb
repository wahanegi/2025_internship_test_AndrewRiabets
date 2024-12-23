class Api::LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tweet

  def create
    like = @tweet.likes.new(user: current_user)
    if like.save
      render json: { success: true, likes_count: @tweet.likes.count }, status: :created
    else
      render json: { success: false, errors: like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    like = @tweet.likes.find_by(user: current_user)

    if like&.destroy
      render json: { success: true, likes_count: @tweet.likes.count }, status: :ok
    else
      render json: { success: false }, status: :unprocessable_entity
    end
  end

  private

  def set_tweet
    @tweet = Tweet.find(params[:tweet_id])
    unless @tweet
      render json: { error: "Tweet not found" }, status: :not_found
    end
  end
end
