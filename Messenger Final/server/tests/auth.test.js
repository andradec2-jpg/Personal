import test from 'node:test';
import assert from 'node:assert/strict';
test(
  'authentication routes exist',
  async () => {
	const response =
  	await fetch(
    	'http://127.0.0.1:3000/api/auth/login',
    	{
      	method: 'POST',
      	headers: {
        	'Content-Type':
          	'application/json'
      	},
      	body: JSON.stringify({
        	username:
          	'nobody',
        	password:
          	'wrong password'
      	})
    	}
  	);
	assert.equal(
  	response.status,
  	401
	);
  }
);

test(
  'protected endpoint rejects anonymous request',
  async () => {
	const response =
  	await fetch(
    	'http://127.0.0.1:3000/api/conversations'
  	);
	assert.equal(
  	response.status,
  	401
	);
  }
);
