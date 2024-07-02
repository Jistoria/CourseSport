class CreateSports < ActiveRecord::Migration[7.1]
  def change
    create_table :sports, id: false do |t|
      t.primary_key :sport_id
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
