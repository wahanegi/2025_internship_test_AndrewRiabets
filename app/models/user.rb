class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email,
      presence: true,
      uniqueness: { case_sensitive: true },
      format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email format" }

  validates :password,
      presence: true,
      length: { minimum: 8, message: "must be at least 8 characters long" },
      format: { with: /\A(?=.*[!@#$%^&*])(?!.*(.)\1{2,}).*\z/, message: "must contain at least one special character and must not have more than two consecutive identical characters" }
end
