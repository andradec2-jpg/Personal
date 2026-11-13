import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizedBody
} from '../conversations/input.js';
test(
  'blank body rejected',
  () => {
	assert.equal(
  	normalizedBody('   '),
  	null
	);
  }
);
