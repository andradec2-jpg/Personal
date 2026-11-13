import test from 'node:test';
import assert from 'node:assert/strict';
import {
  signAccessToken,
  verifyAccessToken
} from './token.js';
const id =
  '0123456789abcdef01234567';
test(
  'issued token verifies',
  () => {
	assert.equal(
  	verifyAccessToken(
    	signAccessToken(id)
  	),
  	id
	);
  }
);
test(
  'tampered token fails',
  () => {
	const parts =
  	signAccessToken(id)
    	.split('.');
	parts[2] =
  	'X' +
  	parts[2].slice(1);
	assert.throws(
  	() =>
    	verifyAccessToken(
      	parts.join('.')
    	)
	);
  }
);
