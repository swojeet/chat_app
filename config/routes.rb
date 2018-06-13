Rails.application.routes.draw do
  get 'home/index'
  devise_for :users

  root 'home#index'

  resources :conversations, only: [:create] do
    member do
      post :close
    end

    resources :messages, only: [:create]
  end
end
