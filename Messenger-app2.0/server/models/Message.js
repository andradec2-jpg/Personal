import mongoose from 'mongoose';

const messageSchema =
  new mongoose.Schema(
    {
      conversation: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
      },

      sender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'PrimerUser',
        required: true
      },

      body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
      }
    },
    {
      timestamps: true
    }
  );

messageSchema.index({
  conversation: 1,
  createdAt: -1,
  _id: -1
});

export const Message =
  mongoose.model(
    'Message',
    messageSchema
  );

