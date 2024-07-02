class CreateCourses < ActiveRecord::Migration[7.1]
  def change
    create_table :courses, id: false do |t|
      t.primary_key :course_id
      t.string :title_course
      t.string :description
      t.references :sport, null: false, foreign_key: { to_table: :sports, primary_key: :sport_id }, type: :integer
      t.references :cdl_coach, null: false, foreign_key: { to_table: :users, primary_key: :cdl_user }, type: :integer
      t.integer :limit_students

      t.timestamps
    end
  end
end

