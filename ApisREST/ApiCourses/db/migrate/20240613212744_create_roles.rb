class CreateRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :roles, id: false do |t|
      t.primary_key :id_rol
      t.string :nombre
      t.string :description

      t.timestamps
    end
  end
end
