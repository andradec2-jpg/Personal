import jwt from 'jsonwebtoken';

import { verifyAccessToken }
  from '../auth/token.js';

import { Message }
  from '../models/Message.js';

import {
  appendMessage,
  conversationRoom
} from '../conversations/appendMessage.js';

const idPattern =
  /^[0-9a-f]{24}$/i;

export function attachStudySockets(io) {
  io.use((socket, next) => {
	try {
  	const token =
    	socket.handshake.auth?.token;
  	if (typeof token !== 'string') {
    	throw new Error('missing token');
  	}
  	const userId =
    	verifyAccessToken(token);
  	const claims =
    	jwt.decode(token);
  	if (
    	typeof claims?.exp !== 'number'
  	) {
    	throw new Error(
      	'missing expiry'
    	);
  	}
  	socket.data.userId = userId;
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
  });
  io.on('connection', (socket) => {
    const remaining =
      Math.max(
        0,
        socket.data.expiresAt -
          Date.now()
      );

    const expiryTimer =
      setTimeout(() => {
        socket.disconnect(true);
      }, remaining);

    socket.on(
      'disconnect',
      () => {
        clearTimeout(expiryTimer);
      }
    );
    socket.on(
      'conversation:join',
      async (payload, ack) => {
        if (typeof ack !== 'function') {
          return;
        }

        const conversationId =
          payload?.conversationId;

        if (
          typeof conversationId !== 'string' ||
          !idPattern.test(conversationId)
        ) {
          ack({
            ok: false,
            code: 'not_found'
          });

          return;
        }

        try {

console.log(
  'JOIN PAYLOAD',
  payload
);
console.log(
  'SOCKET USER',
  socket.data.userId
);


          const conversation =
            await Conversation.findOne({
              _id: conversationId,
              members:
                socket.data.userId
            })
              .select('_id')
              .lean();

console.log(
  'CONVERSATION RESULT',
  conversation
);



          if (conversation === null) {
            ack({
              ok: false,
              code: 'not_found'
            });

            return;
          }
      	await socket.join(
        	conversationRoom(conversationId)
      	);
      	ack({
        	ok: true,
        	conversationId
      	});
    	} catch {
      	ack({
        	ok: false,
        	code: 'server_error'
      	});
    	}
  	}
	);

	socket.on(
  	'message:send',
  	async (payload, ack) => {
    	if (typeof ack !== 'function') {
      	return;
    	}
    	try {
      	const result =
        	await appendMessage(
          	payload?.conversationId,
          	socket.data.userId,
          	payload?.body
        	);
      	if (result.ok === false) {
        	ack(result);
        	return;
      	}
      	ack({
        	ok: true,
        	message: result.message
      	});
      	io.to(
        	conversationRoom(
          	result.message.conversationId
        	)
      	).emit(
        	'message:new',
        	result.message
      	);
    	} catch (err) {

console.error(
  'JOIN ERROR',
  err
  );

      	ack({
        	ok: false,
        	code: 'server_error'
      	});
    	}
  	}
	);
	socket.on(
  	'conversation:leave',
  	(payload, ack) => {
    	const conversationId =
      	payload?.conversationId;
    	if (
      	typeof conversationId !== 'string' ||
      	!idPattern.test(conversationId)
    	) {
      	if (
        	typeof ack === 'function'
      	) {
        	ack({
          	ok: false,
          	code: 'not_found'
        	});
      	}
      	return;
    	}
    	socket.leave(
      	conversationRoom(conversationId)
    	);
    	if (
      	typeof ack === 'function'
    	) {
      	ack({ ok: true });
    	}
  	}
	);
  });
}

