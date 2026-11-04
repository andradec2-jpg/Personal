import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizedBody
} from '../study/input.js';
test(
  'accept valid message body',
  () => {
	assert.equal(
  	normalizedBody(
    	'Hello Bob'
  	),
  	'Hello Bob'
	);
  }
);
test(
  'trim valid message body',
  () => {
	assert.equal(
  	normalizedBody(
    	'  Hello Bob  '
  	),
  	'Hello Bob'
	);
  }
);
test(
  'reject empty message',
  () => {
	assert.equal(
  	normalizedBody('')
  	,
  	null
	);
  }
);
test(
  'reject whitespace only message',
  () => {
	assert.equal(
  	normalizedBody(' 	'),
  	null
	);
  }
);
test(
  'reject non string message',
  () => {
	assert.equal(
  	normalizedBody(123),
  	null
	);
  }
);

test(
  'reject oversized message',
  () => {
	const body =
  	'a'.repeat(1001);
	assert.equal(
  	normalizedBody(body),
  	null
	);
  }
);
