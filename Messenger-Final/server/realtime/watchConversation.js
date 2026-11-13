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

const seen =
  new Set();

function display(
  message,
  source
) {
  if (
    seen.has(message.id)
  ) {
    return;
  }

  seen.add(message.id);

  console.log(
    `${source}: message.body({message.id})`
  );
}

const socket = io(
  'http://127.0.0.1:3000',
  {
    auth: { token }
  }
);

socket.on(
  'message:new',
  (message) => {
	if (
  	message
    	?.conversationId ===
  	conversationId
	) {
  	display(
    	message,
    	'live'
  	);
	}
  }
);
socket.on(
  'connect_error',
  (err) => {
	console.error(
  	`Connection failed: ${err.message}`
	);
  }
);
socket.on(
  'disconnect',
  (reason) => {
	console.log(
  	`Disconnected: ${reason}`
	);
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
  	if (
    	joined.ok === false
  	) {
    	console.error(
      	`Join denied: ${joined.code}`
    	);
    	socket.disconnect();
    	return;
  	}
  	console.log(
    	'Joined conversation'
  	);
	} catch (err) {
  	console.error(
    	err.message
  	);
	}
  }
);

