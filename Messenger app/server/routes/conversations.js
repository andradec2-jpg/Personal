import { Router } from 'express';

import { PrimerUser }
  from '../models/PrimerUser.js';

import { Conversation }
  from '../models/Conversation.js';

import { Message }
  from '../models/Message.js';

import { pairKey }
  from '../conversations/pairKey.js';

export const conversationsRouter =
  Router();

const objectIdPattern =
  /^[0-9a-f]{24}$/i;
function viewConversation(doc) {
  return {
	id: doc._id.toString(),
	type: doc.type,
	title: doc.title ?? null,
	members:
  	doc.members.map(
    	id => id.toString()
  	),
	createdAt:
  	doc.createdAt
  };
}
function viewMessage(doc) {
  return {
	id: doc._id.toString(),
	conversationId:
  	doc.conversation.toString(),
	senderId:
  	doc.sender.toString(),
	body: doc.body,
	createdAt:
  	doc.createdAt
  };
}
async function memberConversation(
  conversationId,
  userId
) {
  if (
	objectIdPattern.test(
  	conversationId
	) === false
  ) {
	return null;
  }
  return Conversation
	.findOne({
  	_id: conversationId,
  	members: userId
	})
	.lean();
}

conversationsRouter.get(
  '/',
  async (
	req,
	res,
	next
  ) => {
	try {
  	const docs =
    	await Conversation
      	.find({
        	members:
          	req.auth.userId
      	})
      	.sort({
        	createdAt: -1,
        	_id: -1
      	})
      	.lean();
  	return res
    	.status(200)
    	.json({
      	conversations:
        	docs.map(
          	viewConversation
        	)
    	});
	} catch (err) {
  	next(err);
	}
  }
);

conversationsRouter.post(
  '/direct',
  async (
	req,
	res,
	next
  ) => {
	const username =
  	req.body?.username
    	?.trim()
    	?.toLowerCase();
	if (
  	typeof username !==
  	'string'
	) {
  	return res
    	.status(400)
    	.json({
      	error:
        	'invalid user'
    	});
	}
	try {
  	const other =
    	await PrimerUser
      	.findOne({
        	username
      	})
      	.lean();
  	if (other === null) {
    	return res
      	.status(404)
      	.json({
        	error:
          	'user not found'
      	});
  	}
  	const key = pairKey(
    	req.auth.userId,
    	other._id
  	);
  	let conversation =
    	await Conversation
      	.findOne({
        	type: 'direct',
        	pairKey: key
      	});
  	if (
    	conversation === null
  	) {
    	conversation =
      	await Conversation
        	.create({
          	type:
            	'direct',
          	createdBy:
            	req.auth.userId,
          	pairKey: key,
          	members: [
            	req.auth.userId,
            	other._id
          	]
        	});
  	}
  	return res
    	.status(200)
    	.json({
      	conversation:
        	viewConversation(
          	conversation
        	)
    	});
	} catch (err) {
  	next(err);
	}
  }
);

conversationsRouter.post(
  '/group',
  async (
    req,
    res,
    next
  ) => {
    const title =
      req.body?.title
        ?.trim();

    const usernames =
      req.body?.members;

    if (
      typeof title !==
        'string' ||
      title.length < 1 ||
      title.length > 80
    ) {
      return res
        .status(400)
        .json({
          error:
            'invalid title'
        });
    }

    if (
      !Array.isArray(
        usernames
      ) ||
      usernames.length < 2
    ) {
      return res
        .status(400)
        .json({
          error:
            'invalid members'
        });
    }

    try {
      const users =
        await PrimerUser.find({
          username: {
            $in:
              usernames.map(
                name =>
                  name
                    .trim()
                    .toLowerCase()
              )
          }
        })
          .select('_id')
          .lean();

      if (
        users.length !==
        usernames.length
      ) {
        return res
          .status(400)
          .json({
            error:
              'member not found'
          });
      }

      const memberIds =
        [
          req.auth.userId,
          ...users.map(
            user =>
              user._id
          )
        ];

      const uniqueIds =
        [
          ...new Set(
            memberIds.map(
              id =>
                id.toString()
            )
          )
        ];

      const conversation =
        await Conversation.create(
          {
            type: 'group',
            title,
            createdBy:
              req.auth.userId,
            members:
              uniqueIds
          }
        );

      return res
        .status(201)
        .json({
          conversation:
            viewConversation(
              conversation
            )
        });
    } catch (err) {
      next(err);
    }
  }
);

conversationsRouter.get(
  '/:id/messages',
  async (
	req,
	res,
	next
  ) => {
	try {
  	const conversation =
    	await memberConversation(
      	req.params.id,
      	req.auth.userId
    	);
  	if (
    	conversation === null
  	) {
    	return res
      	.status(404)
      	.json({
        	error:
          	'conversation not found'
      	});
  	}
  	const messages =
    	await Message
      	.find({
        	conversation:
          	conversation._id
      	})
      	.sort({
        	createdAt: -1,
        	_id: -1
      	})
      	.limit(50)
      	.lean();
  	return res
    	.status(200)
    	.json({
      	messages:
        	messages.map(
          	viewMessage
        	)
    	});
	} catch (err) {
  	next(err);
	}
  }
);

conversationsRouter.post(
  '/:id/messages',
  async (
	req,
	res,
	next
  ) => {
	try {
  	const conversation =
    	await memberConversation(
      	req.params.id,
      	req.auth.userId
    	);
  	if (
    	conversation === null
  	) {
    	return res
      	.status(404)
      	.json({
        	error:
          	'conversation not found'
      	});
  	}
  	const raw =
    	req.body?.body;
  	if (
    	typeof raw !==
    	'string'
  	) {
    	return res
      	.status(400)
      	.json({
        	error:
          	'invalid message'
      	});
  	}
  	const body =
    	raw.trim();
  	if (
    	body.length < 1 ||
    	body.length > 1000
  	) {
    	return res
      	.status(400)
      	.json({
        	error:
          	'invalid message'
      	});
  	}
  	const message =
    	await Message
      	.create({
        	conversation:
          	conversation._id,
        	sender:
          	req.auth.userId,
        	body
      	});
  	return res
    	.status(201)
    	.json({
      	message:
        	viewMessage(
          	message
        	)
    	});
	} catch (err) {
  	next(err);
	}
  }
);

conversationsRouter.get(
  '/:id',
  async (
	req,
	res,
	next
  ) => {
	try {
  	const conversation =
    	await memberConversation(
      	req.params.id,
      	req.auth.userId
    	);
  	if (
    	conversation === null
  	) {
    	return res
      	.status(404)
      	.json({
        	error:
          	'conversation not found'
      	});
  	}
  	return res
    	.status(200)
    	.json({
      	conversation:
        	viewConversation(
          	conversation
        	)
    	});
	} catch (err) {
  	next(err);
	}
  }
);
