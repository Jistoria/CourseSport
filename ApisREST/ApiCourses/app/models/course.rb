class Course < ApplicationRecord
  self.primary_key = 'course_id'
  belongs_to :sport, foreign_key: 'sport_id', primary_key: 'sport_id'
  belongs_to :coach, class_name: 'User', foreign_key: 'cdl_coach', primary_key: 'cdl_user'

end
