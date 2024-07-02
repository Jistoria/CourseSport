# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_14_022109) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "courses", primary_key: "course_id", force: :cascade do |t|
    t.string "title_course"
    t.string "description"
    t.integer "sport_id", null: false
    t.integer "cdl_coach_id", null: false
    t.integer "limit_students"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cdl_coach_id"], name: "index_courses_on_cdl_coach_id"
    t.index ["sport_id"], name: "index_courses_on_sport_id"
  end

  create_table "roles", primary_key: "id_rol", force: :cascade do |t|
    t.string "nombre"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sports", primary_key: "sport_id", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", primary_key: "cdl_user", force: :cascade do |t|
    t.string "nombre"
    t.string "apellido"
    t.string "genero"
    t.string "email"
    t.string "specialty"
    t.string "password_digest"
    t.string "token"
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "courses", "sports", primary_key: "sport_id"
  add_foreign_key "courses", "users", column: "cdl_coach_id", primary_key: "cdl_user"
  add_foreign_key "users", "roles", primary_key: "id_rol"
end
