require 'rails_helper'

RSpec.describe User, type: :model do
  # issue #5 - refactoring
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should allow_value("user@email.com").for(:email) }
  it { should_not allow_value("invalid_email").for(:email) }

  let(:user) { build(:user) }
  let(:existing_user) { create(:user, email: "existing@email.com") }

  it "is valid with valid attributes" do
    expect(user).to be_valid
  end

  it "is invalid if the email is already taken" do
    existing_user
    user.email = "existing@email.com"
    expect(user).to_not be_valid
  end

  # issue #6 -Enforce password rules
  it "is invalid if the password is shorter than 8 characters" do
    user = build(:user, password: "short")
    expect(user).to_not be_valid
  end

  it "is invalid if the password has more than two consecutive identical characters" do
    user = build(:user, password: "aaabbbb")
    expect(user).to_not be_valid
  end

  it "is invalid if the password does not contain at least one special character" do
    user = build(:user, password: "Pass12345")
    expect(user).to_not be_valid
  end

  it "is valid with a password that meets all requirements" do
    user = build(:user, password: "Pasw0rd!")
    expect(user).to be_valid
  end
end
