import { Conversation }
  from '../models/Conversation.js';
import { Message }
  from '../models/Message.js';
const idPattern =
  /^[0-9a-f]{24}$/i;
export function conversationRoom(
  conversationId
) {
  return `conversation:${conversationId}`;
}
export async function appendMessage(
  conversationId,
  senderId,
  rawBody
) {
  if (
	typeof conversationId !==
  	'string' ||
	!idPattern.test(
  	conversationId
	)
  ) {
	return {
  	ok: false,
  	code: 'not_found'
	};
  }
  const conversation =
	await Conversation.findOne({
  	_id: conversationId,
  	members: senderId
	})
  	.select('_id')
  	.lean();
  if (conversation === null) {
	return {
  	ok: false,
  	code: 'not_found'
	};
  }
  if (
	typeof rawBody !==
  	'string'
  ) {
	return {
  	ok: false,
  	code: 'invalid_body'
	};
  }
  const body =
	rawBody.trim();
  if (
	body.length < 1 ||
	body.length > 1000
  ) {
	return {
  	ok: false,
  	code: 'invalid_body'
	};
  }
  const doc =
	await Message.create({
  	conversation:
    	conversation._id,
  	sender: senderId,
  	body
	});
  return {
	ok: true,
	message: {
  	id: doc._id.toString(),
  	conversationId:
    	conversation._id.toString(),
  	senderId:
    	senderId.toString(),
  	body: doc.body,
  	createdAt:
    	doc.createdAt
	}
  };
}
