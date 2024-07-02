class User < ApplicationRecord
  self.primary_key = 'cdl_user'
  belongs_to :role
  has_secure_password

  validates :email, presence: true, uniqueness: true
end
