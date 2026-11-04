import test from 'node:test';
import assert from 'node:assert/strict';
import {
  pairKey
} from './pairKey.js';
test(
  'pair key is symmetric',
  () => {
	assert.equal(
  	pairKey('alice', 'bob'),
  	pairKey('bob', 'alice')
	);
  }
);
