import test from 'node:test';
import assert from 'node:assert/strict';
import { pairKey }
  from '../conversations/pairKey.js';
test(
  'pair key is symmetric',
  () => {
	assert.equal(
  	pairKey(
    	'alice',
    	'bob'
  	),
  	pairKey(
    	'bob',
    	'alice'
  	)
	);
  }
);
test(
  'pair key differs for different pairs',
  () => {
	assert.notEqual(
  	pairKey(
    	'alice',
    	'bob'
  	),
  	pairKey(
    	'alice',
    	'carol'
  	)
	);
  }
);


