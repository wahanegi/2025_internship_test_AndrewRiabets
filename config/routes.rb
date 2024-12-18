Rails.application.routes.draw do
  get "homepage/index"
  # get "welcome/index"
  devise_for :users

  namespace :api do
    resources :tweets, only: [ :index, :create, :destroy ]
  end

  get "up" => "rails/health#show", as: :rails_health_check


  root "welcome#index"
  get "home", to: "homepage#index"
end
