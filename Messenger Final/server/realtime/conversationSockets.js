import jwt from 'jsonwebtoken';

import {
  verifyAccessToken
} from '../auth/token.js';

import {
  Conversation
} from '../models/Conversation.js';

import {
  appendMessage,
  conversationRoom
} from '../conversations/appendMessage.js';

const idPattern =
  /^[0-9a-f]{24}$/i;

function userRoom(
  userId
) {
  return `user:${userId}`;
}

export function attachConversationSockets(
  io
) {
  io.use(
    (socket, next) => {
      try {
        const token =
          socket.handshake
            .auth?.token;

        if (
          typeof token !==
          'string'
        ) {
          throw new Error(
            'missing token'
          );
        }

        const userId =
          verifyAccessToken(
            token
          );

        const claims =
          jwt.decode(token);

        if (
          typeof claims?.exp !==
          'number'
        ) {
          throw new Error(
            'missing expiry'
          );
        }

        socket.data.userId =
          userId;

        socket.data.expiresAt =
          claims.exp * 1000;

        next();
      } catch {
        next(
          new Error(
            'authentication required'
          )
        );
      }
    }
  );
  io.on(
	'connection',
	(socket) => {

  socket.join(
    userRoom(
  	  socket.data.userId
    )
  );

  	const remaining =
    	Math.max(
      	0,
        socket.data.expiresAt -
        Date.now()
    	);
  	const expiryTimer =
    	setTimeout(
      	() => {
        	socket.disconnect(
          	true
        	);
      	},
      	remaining
    	);
  	socket.on(
    	'disconnect',
    	() => {
      	clearTimeout(
        	expiryTimer
      	);
    	}
  	);
  	socket.on(
    	'conversation:join',
    	async (
      	payload,
      	ack
    	) => {
      	if (
        	typeof ack !==
        	'function'
      	) {
        	return;
      	}
      	const
        	conversationId =
          	payload
            	?.conversationId;
      	if (
        	typeof
          	conversationId !==
          	'string' ||
        	!idPattern.test(
          	conversationId
        	)
      	) {
        	ack({
          	ok: false,
          	code:
            	'not_found'
        	});
        	return;
      	}
      	try {
        	const conversation =
          	await Conversation
            	.findOne({
              	_id:
                	conversationId,
              	members:
                	socket.data
                  	.userId
            	})
            	.select('_id')
            	.lean();
        	if (
          	conversation ===
          	null
        	) {
          	ack({
            	ok: false,
            	code:
              	'not_found'
          	});
          	return;
        	}
        	await socket.join(
          	conversationRoom(
            	conversationId
          	)
        	);
        	ack({
          	ok: true,
          	conversationId
        	});
      	} catch {
        	ack({
          	ok: false,
          	code:
            	'server_error'
        	});
      	}
    	}
  	);
  	socket.on(
    	'message:send',
    	async (
      	payload,
      	ack
    	) => {
      	if (
        	typeof ack !==
        	'function'
      	) {
        	return;
      	}
      	try {
        	const result =
          	await appendMessage(
            	payload
              	?.conversationId,
            	socket.data
              	.userId,
            	payload
              	?.body
          	);
        	if (
          	result.ok ===
          	false
        	) {
          	ack(result);
          	return;
        	}
        	ack({
          	ok: true,
          	message:
            	result.message
        	});
        	io.to(
          	conversationRoom(
            	result.message
              	.conversationId
          	)
        	).emit(
          	'message:new',
          	result.message
        	);
      	} catch {
        	ack({
          	ok: false,
          	code:
            	'server_error'
        	});
      	}
    	}
  	);
      socket.on(
        'conversation:leave',
        (
          payload,
          ack
        ) => {

          const
            conversationId =
              payload
                ?.conversationId;

          if (
            typeof
              conversationId !==
              'string' ||
            !idPattern.test(
              conversationId
            )
          ) {

            if (
              typeof ack ===
              'function'
            ) {
              ack({
                ok: false,
                code:
                  'not_found'
              });
            }

            return;
          }

          socket.leave(
            conversationRoom(
              conversationId
            )
          );

          if (
            typeof ack ===
            'function'
          ) {
            ack({
              ok: true
            });
          }
        }
      );
    }
  );
}
