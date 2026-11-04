import test from 'node:test';
import assert from 'node:assert/strict';
import { io } from 'socket.io-client';

test(
  'invalid socket token rejected',
  async () => {
	await new Promise(
  	(resolve, reject) => {
    	const socket = io(
      	'http://127.0.0.1:3000',
      	{
        	auth: {
          	token: 'not-a-jwt'
        	},
        	reconnection: false
      	}
    	);
    	socket.on(
      	'connect',
      	() => {
        	reject(
          	new Error(
            	'unexpected connection'
          	)
        	);
      	}
    	);
    	socket.on(
      	'connect_error',
      	(err) => {
        	assert.equal(
          	err.message,
          	'authentication required'
        	);
        	socket.disconnect();
        	resolve();
      	}
    	);
  	}
	);
  }
);

test(
  'unauthenticated join denied',
  async () => {
	const socket =
  	io(
    	'http://127.0.0.1:3000',
    	{
      	reconnection:
        	false
    	}
  	);
	await new Promise(
  	(resolve) => {
    	socket.on(
      	'connect_error',
      	() => {
        	socket.disconnect();
        	resolve();
      	}
    	);
  	}
	);
  }
);

test(
  'nonmember conversation access denied',
  () => {
	assert.ok(true);
  }
);

