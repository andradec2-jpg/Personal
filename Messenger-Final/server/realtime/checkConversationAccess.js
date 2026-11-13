import assert
  from 'node:assert/strict';
import { io }
  from 'socket.io-client';
const token =
  process.env.TOKEN;
const conversationId =
  process.env.CONVERSATION_ID;
if (
  !token ||
  !conversationId
) {
  throw new Error(
	'Set TOKEN and CONVERSATION_ID'
  );
}
const socket =
  io(
	'http://127.0.0.1:3000',
	{
  	auth: { token },
  	reconnection: false
	}
  );

socket.on(
  'connect',
  async () => {
	try {
  	const joined =
    	await socket
      	.timeout(5000)
      	.emitWithAck(
        	'conversation:join',
        	{
          	conversationId
        	}
      	);
  	const sent =
    	await socket
      	.timeout(5000)
      	.emitWithAck(
        	'message:send',
        	{
          	conversationId,
          	body:
            	'Carol should fail'
        	}
      	);
  	assert.deepEqual(
    	joined,
    	{
      	ok: false,
      	code:
        	'not_found'
    	}
  	);
  	assert.deepEqual(
    	sent,
    	{
      	ok: false,
      	code:
        	'not_found'
    	}
  	);
  	console.log(
    	'PASS: nonmember denied'
  	);
	} catch (err) {
  	console.error(
    	`FAIL: ${err.message}`
  	);
  	process.exitCode = 1;
	}
	finally {
  	socket.disconnect();
	}
  }
);
