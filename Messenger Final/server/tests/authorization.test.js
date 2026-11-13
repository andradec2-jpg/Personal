import test from 'node:test';
import assert from 'node:assert/strict';
test(
  'protected conversations require authentication',
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

test(
  'protected conversation lookup requires authentication',
  async () => {
	const response =
  	await fetch(
    	'http://127.0.0.1:3000/api/conversations/123456789012345678901234'
  	);
	assert.equal(
  	response.status,
  	401
	);
  }
);

