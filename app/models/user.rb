class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email,
      presence: true,
      uniqueness: { case_sensitive: true },
      format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email format" }
end
