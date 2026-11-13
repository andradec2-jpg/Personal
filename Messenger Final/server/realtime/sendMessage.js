import { io }
  from 'socket.io-client';
const token =
  process.env.TOKEN;
const conversationId =
  process.env.CONVERSATION_ID;
const body =
  process.env.BODY ??
  'Messenger test';
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
  'connect_error',
  (err) => {
	console.error(
  	err.message
	);
	process.exitCode = 1;
  }
);

socket.on(
  'connect',
  async () => {
	try {
  	const result =
    	await socket
      	.timeout(5000)
      	.emitWithAck(
        	'message:send',
        	{
          	conversationId,
          	body
        	}
      	);
  	if (
    	result.ok === false
  	) {
    	console.error(
      	`Rejected: ${result.code}`
    	);
    	process.exitCode = 1;
  	}
  	else {
    	console.log(
      	`Saved message: ${result.message.id}`
    	);
  	}
	} catch (err) {
  	console.error(
    	err.message
  	);
  	process.exitCode = 1;
	}
	finally {
  	socket.disconnect();
	}
  }
);
