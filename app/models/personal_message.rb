class PersonalMessage < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
  
  validates :body, presence: true

  after_commit :broadcast_me

  def broadcast_me
    ActionCable.server.broadcast "ConversationsChannel:#{conversation.id}", {
      personal_message: PersonalMessagesController.render(partial: "personal_messages/personal_message", locals: { personal_message: self })
    }
  end
end
