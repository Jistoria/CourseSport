class Role < ApplicationRecord
    # self.primary_key = 'id_rol'

  validates :nombre, presence: true
  validates :description, presence: true
end
