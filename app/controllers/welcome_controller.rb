class WelcomeController < ApplicationController
  def index
    if user_signed_in?
      redirect_to home_path
    else
      render "index"
    end
  end
end
