class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: false do |t|
      t.primary_key :cdl_user
      t.string :nombre
      t.string :apellido
      t.string :genero
      t.string :email
      t.string :specialty
      t.string :password_digest
      t.string :token
      t.references :role, null: false, foreign_key:{ to_table: :roles, primary_key: :id_rol}

      t.timestamps
    end
  end
end
