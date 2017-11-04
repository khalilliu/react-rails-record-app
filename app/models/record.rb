class Record < ApplicationRecord
   validates :date , presence: true
   validates :title , presence: true
   validates :amount , presence: true
end
