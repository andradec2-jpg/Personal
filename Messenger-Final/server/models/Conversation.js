import mongoose from 'mongoose';
const conversationSchema =
  new mongoose.Schema(
	{
  	type: {
    	type: String,
    	enum: ['direct', 'group'],
    	required: true
  	},
  	title: {
    	type: String,
    	trim: true,
    	maxlength: 80
  	},
  	createdBy: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'PrimerUser',
    	required: true
  	},
  	members: [
    	{
      	type: mongoose.Schema.Types.ObjectId,
      	ref: 'PrimerUser',
      	required: true
    	}
  	],
  	pairKey: {
    	type: String
  	}
	},
	{
  	timestamps: true
	}
  );
conversationSchema.index({
  members: 1,
  createdAt: -1
});
conversationSchema.index(
  {
	type: 1,
	pairKey: 1
  },
  {
	unique: true,
	partialFilterExpression: {
  	type: 'direct'
	}
  }
);
export const Conversation =
  mongoose.model(
	'Conversation',
	conversationSchema
  );
