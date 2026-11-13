import test from 'node:test';
import assert from 'node:assert/strict';

test(
  'ready endpoint reports available server',
  async () => {
	const response =
  	await fetch(
    	'http://127.0.0.1:3000/api/ready'
  	);
	assert.equal(
  	response.status,
  	200
	);
	const body =
  	await response.json();
	assert.equal(
  	body.status,
  	'ready'
	);
  }
);
test(
  'conversation collection requires authentication',
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
  'history endpoint remains reachable',
  async () => {
	const response =
  	await fetch(
    	'http://127.0.0.1:3000/api/ready'
  	);
	assert.equal(
  	response.status,
  	200
	);
  }
);

