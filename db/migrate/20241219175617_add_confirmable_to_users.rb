class AddConfirmableToUsers < ActiveRecord::Migration[8.0]
  def change
    unless column_exists?(:users, :confirmation_token)
      add_column :users, :confirmation_token, :string
    end

    unless column_exists?(:users, :confirmed_at)
      add_column :users, :confirmed_at, :datetime
    end

    unless column_exists?(:users, :confirmation_sent_at)
      add_column :users, :confirmation_sent_at, :datetime
    end

    unless index_exists?(:users, :confirmation_token)
      add_index :users, :confirmation_token, unique: true
    end
  end
end
