require 'rails_helper'

RSpec.describe User, type: :model do
  it "is invalid without an email" do
    user = User.new(email: nil, password: "123password123")
    expect(user).to_not be_valid
  end

  it "is invalid if the email is not unique" do
    User.create(email: "test@test.com", password: "123password123")
    user = User.new(email: "test@test.com", password: "123password123")
    expect(user).to_not be_valid
  end

  it "is invalid if the email format is incorrect" do
    user = User.new(email: "invalid_email", password: "123password123")
    expect(user).to_not be_valid
  end

  it "is valid with a proper email format" do
    user = User.new(email: "test@test.com", password: "123password123")
    expect(user).to be_valid
  end

  it "is invalid without an password" do
    user = User.new(email: "test@test.com", password: nil)
    expect(user).to_not be_valid
  end
end
