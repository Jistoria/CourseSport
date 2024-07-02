class Role < ApplicationRecord
    self.primary_key = 'id_rol'

    validates :id_rol, presence: true, uniqueness: true
    validates :nombre, presence: true
end
