class WelcomeController < ApplicationController
  def index
    if user_signed_in?
      render "hello_user"
    else
      render "index"
    end
  end
end
