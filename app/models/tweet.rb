class Tweet < ApplicationRecord
  belongs_to :user
  
  has_many :likes, dependent: :destroy

  validates :text, presence: true, length: { maximum: 255 }
end
